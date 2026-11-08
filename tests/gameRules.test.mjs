import test from 'node:test';
import assert from 'node:assert/strict';
import { createGameState, playMove } from '../js/domain/gameRules.js';

test('inicia com nove casas vazias e jogador X', () => {
  const state = createGameState();
  assert.equal(state.board.length, 9);
  assert.ok(state.board.every(cell => cell === null));
  assert.equal(state.currentPlayer, 'X');
});

test('alternância de jogadores após jogadas válidas', () => {
  const one = playMove(createGameState(), 0);
  assert.equal(one.board[0], 'X');
  assert.equal(one.currentPlayer, 'O');
  const two = playMove(one, 4);
  assert.equal(two.board[4], 'O');
  assert.equal(two.currentPlayer, 'X');
});

test('não permite sobrescrever casa ocupada', () => {
  const first = playMove(createGameState(), 0);
  assert.equal(playMove(first, 0), first);
});

test('não permite posições inválidas', () => {
  const state = createGameState();
  for (const invalid of [-1, 9, 1.5, NaN, '2']) assert.equal(playMove(state, invalid), state);
});

test('detecta vitória horizontal', () => {
  let state = createGameState();
  for (const position of [0,3,1,4,2]) state = playMove(state, position);
  assert.equal(state.winner, 'X');
  assert.deepEqual(state.winningCombination, [0,1,2]);
  assert.equal(state.status, 'finished');
  assert.equal(playMove(state, 5), state);
});

test('detecta vitória vertical', () => {
  let state = createGameState();
  for (const position of [0,1,3,2,6]) state = playMove(state, position);
  assert.equal(state.winner, 'X');
  assert.deepEqual(state.winningCombination, [0,3,6]);
});

test('detecta vitória diagonal', () => {
  let state = createGameState();
  for (const position of [0,1,4,2,8]) state = playMove(state, position);
  assert.equal(state.winner, 'X');
  assert.deepEqual(state.winningCombination, [0,4,8]);
});

test('detecta empate', () => {
  let state = createGameState();
  for (const position of [0,1,2,4,3,5,7,6,8]) state = playMove(state, position);
  assert.equal(state.isDraw, true);
  assert.equal(state.winner, null);
  assert.equal(state.status, 'finished');
});

test('não modifica o tabuleiro anterior', () => {
  const initial = createGameState();
  const next = playMove(initial, 0);
  assert.equal(initial.board[0], null);
  assert.equal(next.board[0], 'X');
});
