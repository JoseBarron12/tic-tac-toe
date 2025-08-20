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

    const clearBoard = () => {
        gameBoard.fill(undefined);
        const gameBoardTiles = document.querySelectorAll(".board-item");
        if(gameBoardTiles != null)
        {
            gameBoardTiles.forEach(tile => {
                tile.replaceChildren();
                tile.classList.remove("tile-invalid");
            });
        }
    }
    return{getCurrentGameBoard, addMove, validateMove, displayBoard, isLineEmpty, isLineFull, isBoardFull, clearBoard};
}

function createPlayer(playerName, playerNum, playerSymbol) {
    let score = 0;
    const getScore = () => score;
    const updateScore = () => score++;
    const resetScore = () => score = 0;

    return {playerName, playerNum, playerSymbol, getScore, updateScore, resetScore};
}




function createGame(playerOne, playerOneSymbol, playerTwo, playerTwoSymbol )
{
    const gamePlayerOne = createPlayer(playerOne, 1, playerOneSymbol);
    const gamePlayerTwo = createPlayer(playerTwo, 2, playerTwoSymbol);
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

    const displayIcon = (symbol, parent) => {
        const icon = document.createElement("img");
        icon.classList.add("board-icon");
        if(symbol == "O")
        {
            icon.setAttribute("src", "./icons/new-o.svg")
            icon.classList.add("o");
            parent.appendChild(icon);
        }
        else
        {
            icon.setAttribute("src", "./icons/new-x.svg")
            icon.classList.add("x");
            parent.appendChild(icon);
        }
    }

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

    const displayGameInfo = (rounds) => {
        
        const displayPlayerInfo = (number) => {
            let num = ""; 
            let player;
            if(number == 1)
            {
                num = "one";
                player = gamePlayerOne;
            }
            else
            {
                num = "two";
                player = gamePlayerTwo;
            }
            
            const playerName = document.querySelector(`.player-${num}-name`);
            playerName.textContent = player.playerName;
            
            const playerSymbol = document.querySelector(`.player-${num}-symbol`);
            displayIcon(player.playerSymbol, playerSymbol);
            
            const playerScore = document.querySelector(`.player-${num}-score`);
            playerScore.textContent = player.getScore();
        }

        displayPlayerInfo(gamePlayerOne.playerNum);
        displayPlayerInfo(gamePlayerTwo.playerNum);

        const roundsText = document.querySelector(".rounds");
        roundsText.textContent = rounds;
    }

    const displayCurrentBoard = () => {
        
        const gameBoardItems = document.querySelectorAll(".board-item");
        let currentBoardItem = 0;
        const currentGameBoard = game.getCurrentGameBoard();
        gameBoardItems.forEach(boardItem => {
            if(boardItem.children.length == 0)
            {
                let symbol = currentGameBoard[currentBoardItem];
                if(symbol != undefined)
                {
                    displayIcon(symbol, boardItem);
                }
            }
            currentBoardItem++;
        });
    }

    const displayPlayedTile = (tileNum) => {
        const gameBoardTile = document.querySelector(`[id="${tileNum}"].board-item`);
        gameBoardTile.classList.add("tile-invalid");
    }

    const displayCurrentPlayer = (playerNum) => {
        const currentPlayer = document.querySelector(`[id="${playerNum}"].player-info`);
        currentPlayer.classList.add("player-active");
    }

    const removePastPlayer = (playerNum) => {
        const currentPlayer = document.querySelector(`[id="${playerNum}"].player-info`);
        currentPlayer.classList.remove("player-active");
    }   

    const playGame = (rounds) => {
        
        displayGameInfo(rounds);
        displayInitialBoard();

        let currentPlayer = gamePlayerOne;
        let roundsPlayed = 0;

        displayCurrentPlayer(currentPlayer.playerNum);


        const gameBoardTiles = document.querySelectorAll(".board-item");
        gameBoardTiles.forEach(tile => {
            
            tile.addEventListener("click", () => {
            const tileNum = tile.getAttribute("id");
            if(!game.validateMove(tileNum))
            {
                return;
            }
            game.addMove(currentPlayer.playerSymbol, tileNum);
            displayPlayedTile(tileNum);
            displayCurrentBoard();

            removePastPlayer(currentPlayer.playerNum);
            currentPlayer = (currentPlayer == gamePlayerOne) ? gamePlayerTwo : gamePlayerOne;
            displayCurrentPlayer(currentPlayer.playerNum);
            if(winCheck.checkAll())
            {
                console.log(`WINNER: PLAYER ${currentWinner.playerName}`);
                if(currentWinner == gamePlayerOne)
                {
                    gamePlayerOne.updateScore();
                    displayGameInfo(rounds);
                    roundsPlayed++;
                    game.clearBoard();
                    displayCurrentBoard();
                    if(roundsPlayed == rounds)
                    {
                        let messageOne =`Player ${gamePlayerOne.playerNum}: ${gamePlayerOne.playerName} with a score of ${gamePlayerOne.getScore()}`;
                        let messagetwo =`Player ${gamePlayerTwo.playerNum}: ${gamePlayerTwo.playerName} with a score of ${gamePlayerTwo.getScore()}`;
                        return messageOne + '\n' + messagetwo;
                    }
                    
                }
                else
                {
                    gamePlayerTwo.updateScore();
                    displayGameInfo(rounds);
                    roundsPlayed++;
                    game.clearBoard();
                    displayCurrentBoard();
                    if(roundsPlayed == rounds)
                    {
                        let messageOne =`Player ${gamePlayerOne.playerNum}: ${gamePlayerOne.playerName} with a score of ${gamePlayerOne.getScore()}`;
                        let messagetwo =`Player ${gamePlayerTwo.playerNum}: ${gamePlayerTwo.playerName} with a score of ${gamePlayerTwo.getScore()}`;
                        return messageOne + '\n' + messagetwo;
                    }
                }
                }  
                if(game.isBoardFull())
                {
                    console.log("NO WINNER TIEEE");
                }
                });
        });
    }

    return{playGame, displayInitialBoard};
}

const gameSetting = document.querySelector(".game-start");

const confirmSettingButton = document.querySelector(".submit-button");
const form= document.querySelector(".game-settings");

confirmSettingButton.addEventListener("click", (event) => {
    event.preventDefault();
    
    const rounds = form.querySelector('[name="rounds"]');
    
    const gameMode = form.querySelector('[name="gamemode"]:checked');

    const playerOneName = form.querySelector('[name="player-one-name"]');
    const playerOneSymbol = form.querySelector('[name="player-one-symbol"]');

    playerOneName.classList.remove("user-valid");
    playerOneName.classList.remove("user-invalid");

    playerOneSymbol.classList.remove("user-valid");
    playerOneSymbol.classList.remove("user-invalid");

    const playerTwoName = form.querySelector('[name="player-two-name"]');
    const playerTwoSymbol = form.querySelector('[name="player-two-symbol"]');

    playerTwoName.classList.remove("user-valid");
    playerTwoName.classList.remove("user-invalid");

    playerTwoSymbol.classList.remove("user-valid");
    playerTwoSymbol.classList.remove("user-invalid");

    let inputValid = true;
    let computer = false;

    if(gameMode.value == "computer")
    {
        if(playerOneName.value == "")
        {
            playerOneName.classList.add("user-invalid");
            inputValid = false;
        }
        else
        {
            playerOneName.classList.add("user-valid"); 
        }
        playerOneSymbol.classList.add("user-valid");
        computer = true;
    }
    else
    {
        if(playerOneName.value == "")
        {
            playerOneName.classList.add("user-invalid");
            inputValid = false;
        }
        else
        {
            playerOneName.classList.add("user-valid"); 
        }
        
        if(playerTwoName.value == "")
        {
            playerTwoName.classList.add("user-invalid");
            inputValid = false;
        }
        else
        {
            playerTwoName.classList.add("user-valid"); 
        }

        if(playerOneSymbol.value == playerTwoSymbol.value)
        {
            inputValid = false;
            playerTwoSymbol.classList.add("user-invalid");
            playerOneSymbol.classList.add("user-invalid");
        }
        else
        {
            playerTwoSymbol.classList.add("user-valid");
            playerOneSymbol.classList.add("user-valid");
        }

    }
    if(inputValid)
    {
        gameSetting.close();
        console.log(rounds.value);
        console.log(gameMode.value);
        console.log(playerOneName.value);
        console.log(playerOneSymbol.value);
        if(!computer)
        {
            const game = createGame(playerOneName.value, playerOneSymbol.value, playerTwoName.value, playerTwoSymbol.value);
            console.log(game.playGame(rounds.value));
        }
        else
        {
            let computerSymbol = "X";
            if(playerOneSymbol.value == "X")
            {
                computerSymbol = "O";
            }
            const game = createGame(playerOneName.value, playerOneSymbol.value, "Computer", computerSymbol);
            console.log(game.playGame(rounds.value));
        }
        

    }

});


const settingsButton = document.querySelector(".setting");

settingsButton.addEventListener("click", () => {
    gameSetting.show();
    const gameButtons = document.querySelector(".game-buttons");
    const exitButton = document.createElement("button");
    if(gameButtons.children.length == 1)
    {
        exitButton.classList.add("exit-setting-button");
        exitButton.textContent = "Cancel";
        gameButtons.appendChild(exitButton);
    }
    
    const settingsExitButton = document.querySelector(".exit-setting-button");

    settingsExitButton.addEventListener("click", (event) => {
        event.preventDefault();
        gameSetting.close();
    });
    
});

const gameMode = form.querySelectorAll('.icon-choice');
const playerTwoInfo = form.querySelector(".player-two-info");
gameMode.forEach(element => {
    const icon = element.getAttribute("id");
    element.addEventListener("click", () => {
        if(icon == "computer")
        {
            playerTwoInfo.style.opacity = "0%";
        }
        else
        {
            playerTwoInfo.style.opacity = "100%";
        }    
    });
});


// random number between (min, max - 1)
function getRandomNumRange(min, max) 
{ 
    while ( true )
    {
        let num = Math.floor(Math.random() * max);
        if (num >= min)
        {
            return num;
        }
    }
}
