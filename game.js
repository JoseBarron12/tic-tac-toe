function createGameboard() {
    let gameBoard = new Array(9);

    const getCurrentGameBoard = () => gameBoard;
    
    const addMove = (playerNum, index) => {
        gameBoard[index] = playerNum;
    }
    
    const validateMove = (index) => {
        let isValid = true;
        if (index < 0 || index > gameBoard.length)
        {
            isValid = false;
        }
        if (gameBoard[index] != undefined)
        {
            isValid = false;
        }
        return isValid;
    }

    return{getCurrentGameBoard, addMove, validateMove};
}

function createPlayer(playerName, playerNum) {
    let score = 0;
    const getScore = () => score;
    const updateScore = () => score++;

    return {playerName, playerNum, getScore, updateScore};
}

const game = createGameboard();

console.log(game.validateMove(5));
game.addMove(1, 5);
console.log(game.validateMove(5));
