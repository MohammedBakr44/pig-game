/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, dice, gamePlaying;

init();

dice = Math.floor(Math.random() * 6) + 1;

function changePlayer() {
    activePlayer = Math.abs(activePlayer + -1);
    $('.player-0-panel').classList.toggle('active');
    $('.player-1-panel').classList.toggle('active');
}

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    $('#score-0').textContent = '0';
    $('#score-1').textContent = '0';
    $('#current-0').textContent = '0';
    $('#current-1').textContent = '0';
    // $(`#current-${activePlayer}`).textContent = dice;
    $('.dice').style.display = 'none';
    $(`.player-${activePlayer}-panel`).classList.remove('winner');
    $(`.player-${activePlayer + 1}-panel`).classList.remove('winner');
    $(`.player-${activePlayer}-panel`).classList.remove('active');
    $(`.player-${activePlayer + 1}-panel`).classList.remove('active');
    $(`.player-${activePlayer }-panel`).classList.add('active');
    $(`#name-${activePlayer}`).textContent = 'Player 1';
    $(`#name-${activePlayer + 1}`).textContent = 'Player 2';

}

$('.btn-roll').addEventListener('click', () => {
    if (gamePlaying) {
        let dice = Math.floor(Math.random() * 6) + 1;
        $('img.dice').style.display = 'block';
        $('img.dice').src = `dice-${dice}.png`;

        if (dice !== 1) {
            roundScore += dice;
            $(`#current-${activePlayer}`).textContent = roundScore;
        } else {
            $('img.dice').style.display = 'none';
            roundScore = 0;
            $(`#current-${activePlayer}`).textContent = '0';
            changePlayer();
        }
    }
    // 
});

$('.btn-hold').addEventListener('click', () => {
    scores[activePlayer] += roundScore;
    $(`#score-${activePlayer}`).textContent = scores[activePlayer];
    $(`#current-${activePlayer}`).textContent = '0';
    roundScore = 0;

    if (scores[activePlayer] >= 5) {
        $(`#name-${activePlayer}`).textContent = 'Winner';
        $('img.dice').style.display = 'none';
        $(`.player-${activePlayer}-panel`).classList.add('winner');
        $(`.player-${activePlayer}-panel`).classList.remove('active');
        gamePlaying = false;
    } else {
        changePlayer();
    }

    // if(parseInt($(`#score-${activePlayer}`).textContent) >= 5) {
    //         $(`#name-${activePlayer}`).textContent = 'Winner';
    // }
});

$('.btn-new').addEventListener('click', () => {
    init();
})