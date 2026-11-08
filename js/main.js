import { createGameState, playMove } from './domain/gameRules.js';
import { renderGame } from './presentation/gameView.js';

const elements = { board: document.querySelector('#board'), status: document.querySelector('#game-status') };
let state = createGameState();
function update() { renderGame(state, elements, (position) => { state = playMove(state, position); update(); }); }
function reset() { state = createGameState(); update(); }
document.querySelector('#new-game').addEventListener('click', reset);
document.querySelector('#reset-game').addEventListener('click', reset);
update();
