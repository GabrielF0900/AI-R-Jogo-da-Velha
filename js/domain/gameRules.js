export const WINNING_COMBINATIONS = Object.freeze([
  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
  [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
]);

export function createGameState() {
  return { board: Array(9).fill(null), currentPlayer: 'X', winner: null, winningCombination: null, isDraw: false, status: 'playing' };
}

export function playMove(state, position) {
  if (!Number.isInteger(position) || position < 0 || position > 8 || state.status !== 'playing' || state.board[position] !== null) return state;
  const board = [...state.board];
  board[position] = state.currentPlayer;
  const winningCombination = WINNING_COMBINATIONS.find(([a, b, c]) => board[a] && board[a] === board[b] && board[b] === board[c]) ?? null;
  const winner = winningCombination ? state.currentPlayer : null;
  const isDraw = !winner && board.every(Boolean);
  return { board, currentPlayer: winner || isDraw ? state.currentPlayer : state.currentPlayer === 'X' ? 'O' : 'X', winner, winningCombination, isDraw, status: winner || isDraw ? 'finished' : 'playing' };
}
