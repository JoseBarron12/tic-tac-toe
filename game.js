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

    const displayBoard = () => {
        let rowDashes = "-".repeat(7);
        let gameBoardOutput = rowDashes + "\n";
        let j = 1;
        let gameItem = "";
        for(let i = 0; i < gameBoard.length; i++)
        {
            if(gameBoard[i] == undefined)
            {
                gameItem = "-";
            }
            else
            {
                gameItem = gameBoard[i];
            }
            
            if(j == 1)
            {
                gameBoardOutput += `|${gameItem}|`;
                j++;
            }
            else if (j == 2)
            {
                gameBoardOutput += `${gameItem}`;
                j++;
            }
            else
            {
                gameBoardOutput += `|${gameItem}|` + "\n";
                gameBoardOutput += rowDashes + "\n";
                j = 1;
            } 
        }
        return gameBoardOutput;
    }

    return{getCurrentGameBoard, addMove, validateMove, displayBoard};
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
        game.addMove(gamePlayerOne.playerNum, 5);
        game.addMove(gamePlayerTwo.playerNum, 0);
        console.log(game.displayBoard());
        let messageOne =`Player ${gamePlayerOne.playerNum}: ${gamePlayerOne.playerName} with a score of ${gamePlayerOne.getScore()}`;
        let messagetwo =`Player ${gamePlayerTwo.playerNum}: ${gamePlayerTwo.playerName} with a score of ${gamePlayerTwo.getScore()}`;
        return messageOne + '\n' + messagetwo;
    }

    return{playGame};
}

const game = createGame("Jay", "James");

console.log(game.playGame(5));