export function renderGame(state, elements, onMove) {
  elements.board.replaceChildren(...state.board.map((mark, position) => {
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'cell';
    cell.dataset.mark = mark ?? '';
    cell.textContent = mark ?? '';
    cell.disabled = Boolean(mark) || state.status !== 'playing';
    cell.setAttribute('aria-label', `Casa ${position + 1}${mark ? `, ${mark}` : ', vazia'}`);
    if (state.winningCombination?.includes(position)) cell.classList.add('winner');
    cell.addEventListener('click', () => onMove(position));
    return cell;
  }));
  elements.status.textContent = state.winner ? `Jogador ${state.winner} venceu!` : state.isDraw ? 'Empate! Jogue novamente.' : `Vez do jogador ${state.currentPlayer}`;
}
