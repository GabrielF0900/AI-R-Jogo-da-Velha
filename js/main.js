import { createGameState, playMove } from './domain/gameRules.js';
import { renderGame } from './presentation/gameView.js';

const $ = (selector) => document.querySelector(selector);
const gameElements = { board: $('#board'), status: $('#game-status') };
let gameState = createGameState();
let scores = { X: 0, O: 0, draw: 0 };

function refreshGame() {
  renderGame(gameState, gameElements, (position) => {
    const next = playMove(gameState, position);
    if (next === gameState) return;
    const wasPlaying = gameState.status === 'playing';
    gameState = next;
    if (wasPlaying && gameState.status === 'finished') {
      if (gameState.winner) scores[gameState.winner] += 1;
      else if (gameState.isDraw) scores.draw += 1;
      updateScores();
    }
    refreshGame();
  });
  const symbol = $('#turn-symbol');
  symbol.textContent = gameState.winner || gameState.currentPlayer;
  symbol.dataset.player = gameState.winner || gameState.currentPlayer;
  $('#turn-label').textContent = gameState.winner ? 'VITÓRIA!' : gameState.isDraw ? 'PARTIDA ENCERRADA' : 'SUA VEZ';
}
function updateScores() {
  $('#score-x').textContent = scores.X;
  $('#score-o').textContent = scores.O;
  $('#score-draw').textContent = scores.draw;
}
$('#new-game').addEventListener('click', () => { gameState = createGameState(); refreshGame(); });
$('#reset-game').addEventListener('click', () => { gameState = createGameState(); scores = { X: 0, O: 0, draw: 0 }; updateScores(); refreshGame(); });
refreshGame();

const flow = {
  miss: [
    { title: '1. Usuário solicita o jogo', description: 'O navegador faz uma requisição HTTPS para o domínio da distribuição CloudFront.', node: 'user' },
    { title: '2. CloudFront verifica o cache', description: 'O CloudFront verifica se os arquivos HTML, CSS e JavaScript estão disponíveis em seu cache.', node: 'cdn' },
    { title: '3. Cache miss: consulta à origem', description: 'Como o objeto não está em cache, CloudFront solicita o arquivo ao S3 privado por meio do Origin Access Control (OAC).', node: 's3' },
    { title: '4. CloudFront entrega os arquivos', description: 'O recurso recebido do S3 pode ser armazenado em cache e é retornado ao navegador por HTTPS.', node: 'cdn' },
    { title: '5. JavaScript executa localmente', description: 'O navegador renderiza a interface e processa turnos, jogadas, vitória e empate sem chamadas ao backend AWS.', node: 'user' }
  ],
  hit: [
    { title: '1. Usuário solicita o jogo', description: 'O navegador solicita a página pela conexão HTTPS com CloudFront.', node: 'user' },
    { title: '2. CloudFront encontra o arquivo no cache', description: 'O recurso solicitado está válido no cache do CloudFront. O S3 não precisa ser consultado nesta requisição.', node: 'cdn' },
    { title: '3. Resposta entregue diretamente', description: 'CloudFront devolve os arquivos ao navegador a partir do cache.', node: 'cdn' },
    { title: '4. Jogo executado no navegador', description: 'O JavaScript gerencia a partida localmente. Cada jogada não depende de uma requisição AWS.', node: 'user' }
  ]
};
const simulation = { index: -1, timer: null, playing: false };
const diagram = $('#diagram');
const modeSelect = $('#cache-mode');
const title = $('#flow-title');
const description = $('#flow-description');
const dots = $('#step-dots');
const start = $('#flow-start');

function steps() { return flow[modeSelect.value]; }
function clearTimer() {
  if (simulation.timer !== null) clearTimeout(simulation.timer);
  simulation.timer = null;
}
function paint() {
  const activeSteps = steps();
  const current = activeSteps[simulation.index];
  title.textContent = current?.title ?? 'Conheça o fluxo de dados';
  description.textContent = current?.description ?? 'Selecione “Iniciar simulação” para acompanhar a entrega do HTML, CSS e JavaScript e a execução local do jogo.';
  document.querySelectorAll('.node').forEach(node => {
    node.classList.toggle('active', Boolean(current && node.dataset.node === current.node));
    node.setAttribute('aria-pressed', String(Boolean(current && node.dataset.node === current.node)));
  });
  dots.replaceChildren(...activeSteps.map((_, i) => {
    const dot = document.createElement('span');
    if (i <= simulation.index) dot.classList.add('active');
    return dot;
  }));
  diagram.classList.toggle('is-running', simulation.playing && simulation.index >= 0);
  start.textContent = simulation.playing ? 'Ⅱ Pausar simulação' : (simulation.index >= activeSteps.length - 1 ? '↻ Reproduzir novamente' : simulation.index >= 0 ? '▶ Continuar simulação' : '▶ Iniciar simulação');
}
function nextStep() {
  if (simulation.index >= steps().length - 1) {
    pause();
    return;
  }
  simulation.index += 1;
  paint();
  if (simulation.playing) simulation.timer = setTimeout(nextStep, 2300);
}
function pause() { simulation.playing = false; clearTimer(); paint(); }
function reset() { pause(); simulation.index = -1; paint(); }
start.addEventListener('click', () => {
  if (simulation.playing) { pause(); return; }
  if (simulation.index >= steps().length - 1) simulation.index = -1;
  simulation.playing = true;
  nextStep();
});
$('#flow-next').addEventListener('click', () => { pause(); if (simulation.index >= steps().length - 1) simulation.index = -1; simulation.index += 1; paint(); });
$('#flow-reset').addEventListener('click', reset);
modeSelect.addEventListener('change', reset);
document.querySelectorAll('[data-node]').forEach(node => node.addEventListener('click', () => {
  pause();
  const matchingIndex = steps().findIndex(step => step.node === node.dataset.node);
  if (matchingIndex !== -1) simulation.index = matchingIndex;
  paint();
}));
paint();
