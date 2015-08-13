/*
TicTacToe Javascript v1.0
Last Updated: 2015-07-28
Author: William R.A.D. Funk - http://WilliamRobertFunk.com 
*/

/** @var {Array} board - The TicTacToe board. */
var board = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
/** @var {String} square - The state of a specific TicTacToe square. */
var square = 0;
/** @var {Number} p1score - Player 1's score */
var p1score = 0;
/** @var {Number} p2score - Player 2's score */
var p2score = 0;
/** @var {String} pTurn - Keeps track of which player's turn it is */
var pTurn = "1";
/** @var {String} pType - Is opponent human or AI */
var pType;

/**
 * Checks to see if chosen square is already taken.
 * @param {Array} board - The state of the TicTacToe board.
 * @param {String} square - Is the chosen square empty.
 * @returns {Boolean} - True is empty, False is already taken.
 * @author William R.A.D. Funk
 */
function checkIfAvailable(board, square)
{
    if (board[square] == 1 || board[square] == 2)
    {
        return false;
    }
    else
    {
        return true;
    }
}

/**
 * Places player's mark on chosen square.
 * @param {String} cellId - HTML square's ID.
 * @param {String} pTurn - Current player.
 * @param {String} square - Chosen square.
 * @param {Array} board - The TicTacToe board.
 * @returns {Array} board - Updated TicTacToe board.
 * @author William R.A.D. Funk
 */
function attachPlayerToCell(cellId, pTurn, square, board)
{
    if (pTurn == "1")
    {
        $(cellId).css("background-image", "url(images/ticTac-X.png)");
        $(cellId).addClass("p1Cell");
        board[$(cellId).index()] = 1;
        return board;
    }
    else if (pTurn == "2")
    {
        $(cellId).css("background-image", "url(images/ticTac-O.png)");
        $(cellId).addClass("p2Cell");
        board[$(cellId).index()] = 2;
        return board;
    }
    else
    {
        console.log("ERROR: Player number has exceeded bounds!");
        return board;
    }
}

/**
 * Changes the turn after previous move is completed.
 * @param {String} pTurn - Current player.
 * @returns {String} - Next player's turn.
 * @author William R.A.D. Funk
 */
function changeTurn(pTurn)
{
    /** @var {String} player1Color - Background color for player 1. */
    var player1Color = "#99FF99";
    /** @var {String} player2Color - Background color for player 2. */
    var player2Color = "#FF99FF";
    if (pTurn === "1")
    {
        $("h2 span.p_number").html("2");
        $("h2 span.p_token").html("O");
        $("h2").css("text-align", 'right');
        $("body").css("background-color", player2Color);
        return "2";
    }
    else if (pTurn === "2")
    {
        $("h2 span.p_number").html("1");
        $("h2 span.p_token").html("X");
        $("h2").css("text-align", 'left');
        $("body").css("background-color", player1Color);
        return "1";
    }
    else
    {
        console.log("ERROR: Player number has exceeded bounds!");
    }
}

/**
 * Checks to see if recent move resulted in a win.
 * @param {Array} board - The TicTacToe board.
 * @param {String} pTurn - Current player.
 * @returns {Boolean} - True is win, False if no win.
 * @author William R.A.D. Funk
 */
function checkForWin(board, pTurn)
{
    // Checks to make sure legitimate player number was passed.
    if (pTurn != "1" && pTurn != "2")
    {
        console.log("ERROR: Player number has exceeded bounds!");
        return false;
    }
    // Checks all win scenarios.
    if( (board[0] != 0 && board[0] == board[1] && board[1] == board[2]) || 
        (board[0] != 0 && board[0] == board[4] && board[4] == board[8]) ||
        (board[0] != 0 && board[0] == board[3] && board[3] == board[6]) || 
        (board[1] != 0 && board[1] == board[4] && board[4] == board[7]) || 
        (board[2] != 0 && board[2] == board[5] && board[5] == board[8]) ||
        (board[2] != 0 && board[2] == board[4] && board[4] == board[6]) ||
        (board[3] != 0 && board[3] == board[4] && board[4] == board[5]) || 
        (board[6] != 0 && board[6] == board[7] && board[7] == board[8]) )
    {
        return true;
    }
    else
    {
        return false;
    }
}

/**
 * Checks to see if recent move resulted in a tie.
 * @param {Array} board - The TicTacToe board.
 * @returns {Boolean} - True is tie, False if no tie.
 * @author William R.A.D. Funk
 */
function checkForTie(board)
{
    for(i = 0; i < 9; i++)
    {
        if(board[i] == 0)
        {
            return false;
        }
    }
    return true;
}

/**
 * Increases a player's score after a win. 10 is max.
 * @param {String} pTurn - Current player.
 * @var {Number} p1score - Player 1's score.
 * @var {Number} p2score - Player 2's score.
 * @author William R.A.D. Funk
 */
function increaseScore(pTurn)
{
    if (pTurn == "1")
    {
        p1score += 1;
        $("#p1_score span").html(p1score);
    }
    else if (pTurn == "2")
    {
        p2score += 1;
        $("#p2_score span").html(p2score);
    }
    else 
    {
        console.log("ERROR: increaseScore(pTurn) called with invalid pTurn argument");
    }

    if (p1score >= 10 || p2score >= 10)
    {
        alert("Congratulations!\n\nPlayer " + pTurn + " has won.\n\n");
        $("#p1_score span").html("0");
        $("#p2_score span").html("0");
        p1score = 0;
        p2score = 0;
    }
}

/**
 * Resets board is win, tie, or reset button press.
 * @var {Array} board - The TicTacToe board.
 * @author William R.A.D. Funk
 */
function resetBoard()
{
    $("li").each(function(event)
    {
        $(this).css("background-image", "none");
        $(this).removeClass("p1Cell");
        $(this).removeClass("p2Cell");
        board[$(this).index()] = 0;
    });
}

/**
 * Controls modal visibility for human or computer opponent choice.
 * @author William R.A.D. Funk
 */
function overlay()
{
    document.getElementById("human_or_comp").style.visibility = "hidden";
}

/**
 * When a square is selected and updated.
 * @param {String} cellId - HTML square's ID.
 * @param {Array} board - The TicTacToe board.
 * @param {String} pTurn - Current player.
 * @returns {String} pTurn - Next player's turn.
 * @author William R.A.D. Funk
 */
function selectSquare(cellId, board, pTurn)
{
    if(checkIfAvailable(board, $(cellId).index()))
    {
        // Update the board.
        board = attachPlayerToCell(cellId, pTurn, $(cellId).index(), board);
        // Was the move a winner?
        if(checkForWin(board, pTurn))
        {
            alert("Player " + pTurn + " wins the round!\n\n");
            increaseScore(pTurn);
            resetBoard();
        }
        // Was the move a tie?
        else if(checkForTie(board))
        {
            alert("Tie Game! No points awarded.");
            resetBoard();
        }
        // Next player's turn.
        pTurn = changeTurn(pTurn);
    }
    // If computer opponent, computer makes move.
    if(pType == "computer" && pTurn == "2")
    {
        var nextMove = AIchoice(board);
        cellId = getCellId(nextMove);
        pTurn = selectSquare(cellId, board, pTurn);
        return pTurn;
    }
    // If human opponent, person gets to make a move.
    else
    {
        return pTurn;
    }
}

/**
 * Takes index number, and gets HTML cellId.
 * @param {Number} nextMove - numerical index of chosen square.
 * @returns {String} - HTML ID of chosen square.
 * @author William R.A.D. Funk
 */
function getCellId(nextMove)
{
    switch(nextMove)
    {
        case 0:
        {
            return "#square_one";
        }
        case 1:
        {
            return "#square_two";
        }
        case 2:
        {
            return "#square_three";
        }
        case 3:
        {
            return "#square_four";
        }
        case 4:
        {
            return "#square_five";
        }
        case 5:
        {
            return "#square_six";
        }
        case 6:
        {
            return "#square_seven";
        }
        case 7:
        {
            return "#square_eight";
        }
        case 8:
        {
            return "#square_nine";
        }
        default:
        {
            console.log("ERROR: Invalid move by computer player");
            return;
        }
    }
}

/**
 * ActionListeners activated when page is finished loading.
 * @author William R.A.D. Funk
 */
$( document ).ready(function()
{
    /**
     * ActionListeners specific to the cells of the TicTacToe board.
     * @author William R.A.D. Funk
     */
    $("li")
        .click(function(event)
        {
            var cellId = event.target.id;
            cellId = "#" + cellId;

    	    pTurn = selectSquare(cellId, board, pTurn);
        })
        .mouseover(function(event)
        {
            var cellId = event.target.id;
            cellId = "#" + cellId;

            if (checkIfAvailable(board, $(cellId).index()))
            {
                $(cellId).css("opacity", '0.5');
            }
        })
        .mouseout(function(event)
        {
            var cellId = event.target.id;
            cellId = "#" + cellId;
            $(cellId).css("opacity", '1.0');
        });
    /**
     * ActionListeners specific to the buttons ("Reset Board" and "AI or Human Opponent")
     * @author William R.A.D. Funk
     */
    $("button")
        .click(function(event)
        {
            if(this.id == "btn_reset")
            {
                resetBoard();
                $("#p1_score span").html("0");
                $("#p2_score span").html("0");
                changeTurn("2");
            }
            else if(this.id == "human" || this.id == "computer")
            {
                overlay();
                pType = (this.id == "computer") ? "computer" : "human";
            }
        });
});