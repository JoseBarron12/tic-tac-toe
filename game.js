function createGameboard() {
    let gameBoard = new Array(9);

    const getCurrentGameBoard = () => gameBoard;
    
    const addMove = (playerSymbol, index) => {
        gameBoard[index] = playerSymbol;
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

function createPlayer(playerName, playerNum, playerSymbol) {
    let score = 0;
    const getScore = () => score;
    const updateScore = () => score++;
    const resetScore = () => score = 0;

    return {playerName, playerNum, playerSymbol, getScore, updateScore, resetScore};
}

function createGame(playerOne, playerTwo)
{
    const gamePlayerOne = createPlayer(playerOne, 1, "X");
    const gamePlayerTwo = createPlayer(playerTwo, 2, "O");
    const game = createGameboard();

    const playGame = (rounds) => {
        for(let i = 0; i < rounds; i++)
        {
            gamePlayerOne.updateScore();
            gamePlayerTwo.updateScore();
        }
        game.addMove(gamePlayerOne.playerSymbol, 5);
        game.addMove(gamePlayerTwo.playerSymbol, 0);
        console.log(game.displayBoard());
        let messageOne =`Player ${gamePlayerOne.playerNum}: ${gamePlayerOne.playerName} with a score of ${gamePlayerOne.getScore()}`;
        let messagetwo =`Player ${gamePlayerTwo.playerNum}: ${gamePlayerTwo.playerName} with a score of ${gamePlayerTwo.getScore()}`;
        return messageOne + '\n' + messagetwo;
    }

    return{playGame};
}

const game = createGame("Jay", "James");

console.log(game.playGame(5));