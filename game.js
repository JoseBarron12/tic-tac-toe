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
        let currentItemInRow = 1; 
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
            
            if(currentItemInRow == 1)
            {
                gameBoardOutput += `|${gameItem}|`;
                currentItemInRow++;
            }
            else if (currentItemInRow == 2)
            {
                gameBoardOutput += `${gameItem}`;
                currentItemInRow++;
            }
            else
            {
                gameBoardOutput += `|${gameItem}|` + "\n";
                gameBoardOutput += rowDashes + "\n";
                currentItemInRow = 1;
            } 
        }
        return gameBoardOutput;
    }

    const isLineEmpty = (indexOne, indexTwo, indexThree) => {
        if (gameBoard[indexOne] == undefined || 
                gameBoard[indexTwo] == undefined || 
                gameBoard[indexThree] == undefined)
        {
            return true;
        }
        return false;
    }

    const isLineFull = (indexOne, indexTwo, indexThree, symbol) => {
        if (gameBoard[indexOne] == symbol && 
            gameBoard[indexTwo] == symbol && 
            gameBoard[indexThree] == symbol)
        {
            return true;
        }
        return false;
    }

    const isBoardFull = () =>
    {
        for(let i = 0; i < gameBoard.length; i++)
        {
            if(gameBoard[i] == undefined)
            {
                return false
            }
        }
        return true;
    }


    return{getCurrentGameBoard, addMove, validateMove, displayBoard, isLineEmpty, isLineFull, isBoardFull};
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

    let currentWinner;

    const winCheck = (function () {
        const topHorizotal = () => {
            if(game.isLineFull(0,1,2, gamePlayerOne.playerSymbol))
            {
                currentWinner = gamePlayerOne;
                return true;
            }
            else if (game.isLineFull(0,1,2, gamePlayerTwo.playerSymbol))
            {
                currentWinner = gamePlayerTwo;
                return true;
            }
            return false
        };
        
        const midHorizotal = () => {
            if(game.isLineFull(3,4,5, gamePlayerOne.playerSymbol))
            {
                currentWinner = gamePlayerOne;
                return true;
            }
            else if (game.isLineFull(3,4,5, gamePlayerTwo.playerSymbol))
            {
                currentWinner = gamePlayerTwo;
                return true;
            }
            return false
        };
        
        const bottomHorizotal = () => {
            if(game.isLineFull(6,7,8, gamePlayerOne.playerSymbol))
            {
                currentWinner = gamePlayerOne;
                return true;
            }
            else if (game.isLineFull(6,7,8, gamePlayerTwo.playerSymbol))
            {
                currentWinner = gamePlayerTwo;
                return true;
            }
            return false
        };
        
        const leftVertical = () => {
            if(game.isLineFull(0,3,6, gamePlayerOne.playerSymbol))
            {
                currentWinner = gamePlayerOne;
                return true;
            }
            else if (game.isLineFull(0,3,6, gamePlayerTwo.playerSymbol))
            {
                currentWinner = gamePlayerTwo;
                return true;
            }
            return false
        };
        
        const midVertical = () => {
            if(game.isLineFull(1,4,7, gamePlayerOne.playerSymbol))
            {
                currentWinner = gamePlayerOne;
                return true;
            }
            else if (game.isLineFull(1,4,7, gamePlayerTwo.playerSymbol))
            {
                currentWinner = gamePlayerTwo;
                return true;
            }
            return false
        };
        
        const rightVertical = () => {
            if(game.isLineFull(2,5,8, gamePlayerOne.playerSymbol))
            {
                currentWinner = gamePlayerOne;
                return true;
            }
            else if (game.isLineFull(2,5,8, gamePlayerTwo.playerSymbol))
            {
                currentWinner = gamePlayerTwo;
                return true;
            }
            return false
        };
        
        const leftDiagonal = () => {
            if(game.isLineFull(0,4,8, gamePlayerOne.playerSymbol))
            {
                currentWinner = gamePlayerOne;
                return true;
            }
            else if (game.isLineFull(0,4,8, gamePlayerTwo.playerSymbol))
            {
                currentWinner = gamePlayerTwo;
                return true;
            }
            return false
        };
        
        const rightDiagonal = () => {
            if(game.isLineFull(0,4,8, gamePlayerOne.playerSymbol))
            {
                currentWinner = gamePlayerOne;
                return true;
            }
            else if (game.isLineFull(3,4,6, gamePlayerTwo.playerSymbol))
            {
                currentWinner = gamePlayerTwo;
                return true;
            }
            return false
        };

        const checkAll = () => {
            if( topHorizotal() || midHorizotal() || bottomHorizotal()
                || leftVertical() || midVertical() || rightVertical()
                || leftDiagonal() || rightDiagonal() )
            {
                return true;
            }
            return false;
        }
        return{ topHorizotal, midHorizotal, bottomHorizotal,
                leftVertical, midVertical, rightVertical,
                leftDiagonal, rightDiagonal, checkAll};
    })();

    const displayInitialBoard = () => {
        
        const gameBoard = document.querySelector(".gameboard");

        for(let i = 0; i < game.getCurrentGameBoard().length; i++)
        {
            const boardItem = document.createElement("div");
            boardItem.classList.add("board-item");
            boardItem.setAttribute("id", `${i}`);
            gameBoard.appendChild(boardItem);
        }
    };

    const displayCurrentBoard = () => {
        const gameBoardItems = document.querySelectorAll(".board-item");
        let currentBoardItem = 0;
        const currentGameBoard = game.getCurrentGameBoard();
        gameBoardItems.forEach(boardItem => {
            if(boardItem.children.length == 0)
            {
                if(currentGameBoard[currentBoardItem] != undefined)
                {
                    boardItem.textContent = `${currentGameBoard[currentBoardItem]}`;
                    console.log(currentGameBoard[currentBoardItem]);
                }
            }
            currentBoardItem++;
        });
    }


    const playGame = (rounds) => {
        
        displayInitialBoard();
        game.addMove(gamePlayerTwo.playerSymbol, 0);
        displayCurrentBoard();
        game.addMove(gamePlayerTwo.playerSymbol, 1);
        game.addMove(gamePlayerOne.playerSymbol, 2);
        game.addMove(gamePlayerOne.playerSymbol, 3);
        game.addMove(gamePlayerOne.playerSymbol, 4);
        game.addMove(gamePlayerTwo.playerSymbol, 5);
        game.addMove(gamePlayerTwo.playerSymbol, 6);
        game.addMove(gamePlayerOne.playerSymbol, 7);
        game.addMove(gamePlayerOne.playerSymbol, 8);
        if(winCheck.checkAll())
        {
            console.log(`WINNER: PLAYER ${currentWinner.playerName}`);
            if(currentWinner == gamePlayerOne)
            {
                gamePlayerOne.updateScore();
            }
            else
            {
                gamePlayerTwo.updateScore();
            }
        }  
        if(game.isBoardFull())
        {
            console.log("NO WINNER TIEEE");
        }

        console.log(game.displayBoard());
        let messageOne =`Player ${gamePlayerOne.playerNum}: ${gamePlayerOne.playerName} with a score of ${gamePlayerOne.getScore()}`;
        let messagetwo =`Player ${gamePlayerTwo.playerNum}: ${gamePlayerTwo.playerName} with a score of ${gamePlayerTwo.getScore()}`;
        return messageOne + '\n' + messagetwo;
    }

    return{playGame, displayInitialBoard};
}

const game = createGame("Jay", "James");

console.log(game.playGame(5));

