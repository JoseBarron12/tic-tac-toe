function createGameboard() {
    const gameBoard = new Array(9);
    return{gameBoard};
}
const board = createGameboard();
console.log(board.gameBoard);

function createPlayer(name) {
    const playerName = "Player: " + name;
    
    let score = 0;
    const getScore = () => score;
    const updateScore = () => score++;

    return {playerName, getScore, updateScore};
}

const playerOne = createPlayer("Jay");

playerOne.updateScore();
playerOne.updateScore();

console.log({
    playerName: playerOne.playerName,
    score: playerOne.getScore()
});