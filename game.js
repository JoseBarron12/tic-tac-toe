function createGameboard() {
    const gameBoard = new Array(9);
    return{gameBoard};
}
const board = createGameboard();
console.log(board.gameBoard);