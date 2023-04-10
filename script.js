// Add an event to the window for the dom content loaded event
// this is needed, because we included our javascript 
// file in the head of the HTML document.
window.addEventListener('DOMContentLoaded', () => {
    //Use the querySelectoryAll ,but for the tiles we just use the Array.from function
    //, because it returns a node which is an array like object.
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    // Create the variables that are needed for the game,
    // 1st create an array with 9 empty strings (this is the board function)
    //2nd store the current player X, or O
    //3rd store whether we have an end game result or the game is still active

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    // Next this will call to display whether or not 
    //Player "X" or "Y" has won OR if there was a tie
    //which is represented by constant.

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';


    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */
   // Next displays the winning combinations, if you have these combinations then you have won the game. 
    // whether you have x or o. These values are also represented by const. 
    //This is an array of array meaning different indexes are stored in it

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // for every sub array which is 3 numbers will check if the array has the same characters for the indexes. 
        // if any of the three elements is an empty string, so basically an empty tile skip the iteration using the contine keyword,
        // if those are equal then set the round one variable to true and exit the for loop using the break keyword

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        // if there is a winner the announce function will be used and call it with player X1 or Player O1 based on the current players value
            // set the is game active to force, if there is no winner ,
            // and the board doesnt have any empty string left we wont have any winners, the unknowns will show as a tie

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    }

    // recieves and end game state string called type the html files will be modified


    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        //  remove the hide class to show the enhancer to the user, then check to see if there is a winner or not by looping through the wing conditions array.
        announcer.classList.remove('hide');
    };

    // Now the isValidAction function is used and it checks whether the tile has a value already
// If it does, it returns false. If not, it returns true.
// use this to make sure empty tiles are played only in the turns

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    // the updateBoard function it sets the value of the element in the board
    // in the board array at the given position to be equal to the value
    // of the current player variable

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    //Next attach an event listner to every tile,  
    //so when the tile is clicked a function will be called and reference that specific tile and its index.
    // Tile reference will be used to modify the ui and index will be used to modify the memory saved board array.
    // Implement the user action function, it represents either X's or O's turn. will be called when user click on tile.

    const userAction = (tile, index) => {
        //User will chechk if the step is a valid action by passing the tile to the isGameActive action function
        if(isValidAction(tile) && isGameActive) {
        //using a template string literal so the current player will be X or O depending on the current players value
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);

            // update board function is called to update the board array
            updateBoard(index);
            //check whether or not there is a winner or not in the handleResultValidation function
            // after that the changePlayer function is called.
            handleResultValidation();
            changePlayer();
        }
    }

    //Resets the game state and also resets the board
    // set the board to contain 9 empty strings then we set game variable to true
    // then hide the announcer by adding height class
    // Player X initially stats the game everytime
    // If the current player is o then call the change player function
    
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

// for every tile we will set the inner text to be an empty sting 
// and remove every player related classes 

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

// This adds an event to the function and
// assigns the reset function to the reset button and resets board.

    resetButton.addEventListener('click', resetBoard);
});
