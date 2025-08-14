function createGameboard() {
    const gameBoard = new Array(9);
    return{gameBoard};
}
const board = createGameboard();
console.log(board.gameBoard);

function createPlayer(playerName, playerNum) {
    let score = 0;
    const getScore = () => score;
    const updateScore = () => score++;

    return {playerName, playerNum, getScore, updateScore};
}

const playerOne = createPlayer("Jay", 1);
const playerTwo = createPlayer("Brown", 2);

playerOne.updateScore();
playerTwo.updateScore();
playerOne.updateScore();
playerTwo.updateScore();
playerOne.updateScore();
playerTwo.updateScore();
playerOne.updateScore();
playerTwo.updateScore();

console.log(playerOne);
console.log(playerTwo);