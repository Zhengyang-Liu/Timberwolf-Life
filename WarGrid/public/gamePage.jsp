<!DOCTYPE html>
<html>

<head>
    <title>Game</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="w3.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
    <script src="scripts/wScript.js"></script>
    <script src="scripts/jquery-1.12.4.min.js"></script>
    <script src="scripts/map.js"></script>
    <script src="scripts/main.js"></script>
    <script src="https://www.gstatic.com/firebasejs/3.5.3/firebase.js"></script>
    <script>
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyCg8q3JPOVremSm5Exz74by1Rsv4ljk970"
            , authDomain: "llylly-95353.firebaseapp.com"
            , databaseURL: "https://llylly-95353.firebaseio.com"
            , storageBucket: "llylly-95353.appspot.com"
            , messagingSenderId: "745498047349"
        };
        firebase.initializeApp(config);
    </script>
</head>

<body class="w3-grey w3-content" style="max-width:1600px">
    <div id="gameDiv" class="w3-container w3-center  w3-padding-64">
        <div class="w3-container w3-card-24 w3-dark-grey w3-round-xlarge">
            <div class="w3-container w3-padding-32">

              <canvas id="game_canvas"  class="w3-sand w3-round-xlarge"  width="512" height="512" >
              </canvas>
            </div>
        </div>
        <!--
            <input id="confirmButton" type="button" value="Confirm" />
            -->
        <div class="w3-container w3-row w3-center"> <span id="text">Cell left: 0</span> </div>
        <div class="w3-container w3-row w3-center">
            <button id="resetButton" class="w3-btn w3-dark-grey w3-large w3-round-large w3-animate-zoom">Reset</button>
            <button id="confirmButton" value="Confirm" class="w3-btn w3-dark-grey w3-large w3-round-large w3-animate-zoom">Confirm</button>
            <button id="ghostButton" class="w3-btn w3-dark-grey w3-large w3-round-large w3-animate-zoom">Ghost On/Off </button>
            <button id="surrenderButton" class="w3-btn w3-dark-grey w3-large w3-round-large w3-animate-zoom">Surrender</button>
        </div>

         <p id="instruction" class="w3-container w3-row w3-center">
             This game is a turn based strategy game that requires two players play against each other. Both player need to play on one machine for now.<br/>
             Players' goal is to occupy the entire map with their live cells or dead cells, once a cell is occupied by a player's live cell, it become part of the player's terrtory until it get occupied by another player<br/>
             Player can place certain amount of living cells each turn, after pressing "confirm", all live cells of current player will render 1 frame base on game of life algorithm, then it is the other player's turn. <br/>
             The amount of Live cells players can place is depend on the size of their terrtory; and players can only place cells in or next to their terrtory. <br/>
             yellow cells will indicate position of your live cells in the next turn based on your current placement, you can turn it on/off by pressing "Ghost on/off button <br/>
             "Reset" button will cancel all placement of the current turn.

        </p>
    </div>
    <script>
        initGameOfLife();
    </script>
</body>

</html>
