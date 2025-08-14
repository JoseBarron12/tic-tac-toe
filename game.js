function createGameboard() {
    let gameBoard = new Array(9);

    const getCurrentGameBoard = () => gameBoard;
    
    const addMove = (playerNum, index) => {
        gameBoard[index] = playerNum;
    }
    
    const validateMove = (index) => {
        let isValid = true;
        if (index < 0 || index >= gameBoard.length)
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

function createGame(playerOne, playerTwo)
{
    const gamePlayerOne = createPlayer(playerOne, 1);
    const gamePlayerTwo = createPlayer(playerTwo, 2);
    const game = createGameboard();

    const playGame = (rounds) => {
        for(let i = 0; i < rounds; i++)
        {
            gamePlayerOne.updateScore();
            gamePlayerTwo.updateScore();
        }
        let messageOne =`Player ${gamePlayerOne.playerNum}: ${gamePlayerOne.playerName} with a score of ${gamePlayerOne.getScore()}`;
        let messagetwo =`Player ${gamePlayerTwo.playerNum}: ${gamePlayerTwo.playerName} with a score of ${gamePlayerTwo.getScore()}`;
        return messageOne + '\n' + messagetwo;
    }

    return{playGame};
}

const game = createGame("Jay", "James");

console.log(game.playGame(5));