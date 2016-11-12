<!DOCTYPE html>

<html>
  <head>
    <title>Editor</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="w3.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">



      <script src="https://www.gstatic.com/firebasejs/3.5.3/firebase.js"></script>
      <script>
        // Initialize Firebase
        var config = {
          apiKey: "AIzaSyCg8q3JPOVremSm5Exz74by1Rsv4ljk970",
          authDomain: "llylly-95353.firebaseapp.com",
          databaseURL: "https://llylly-95353.firebaseio.com",
          storageBucket: "llylly-95353.appspot.com",
          messagingSenderId: "745498047349"
        };
        firebase.initializeApp(config);
      </script>



    <script src="scripts/wScript.js"></script>
    <script src="scripts/editor.js"></script>
    <!-- fix this, missing something here cause layout padding issue.
      case expression:

        break;
      default:

    }
    -->
  </head>


  <body class="w3-light-grey w3-content " style="max-width:1600px">

    <!-- Top header for login on screens: hide on small screen since on small screen, there will be another header. 
    <header class="w3-container w3-top w3-hide-small w3-hide-medium w3-xlarge w3-padding-16">
        <a class="w3-right w3-btn w3-dark-grey w3-padding w3-round-jumbo"><i class="material-icons">person</i>  Login</a>
    </header>
  -->

    <!-- Sidenav/menu -->
    <nav class="w3-sidenav w3-white w3-center w3-text-grey w3-collapse w3-top" style="z-index:3;width:300px;font-weight:bold" id="mySidenav"><br>
      <h3 class="w3-padding-64"><b>Timberwolf Life</b></h3>
        <a href="#index" onclick="index_open()" class="w3-padding">LOBBY</a>
        <a id="create" href="#create" onclick="create_open()" class="w3-padding">CREATE</a>
        <a href="#editor" onclick="editorPage_open()" class="w3-padding">MAP EDITOR</a>
        <a href="#profile" onclick="profile_open()" class="w3-padding">PROFILE</a>
        <a href="#about" onclick="about_open()" class="w3-padding">ABOUT</a>
    </nav>

    <!-- Top menu on small screens -->
    <header class="w3-container w3-top w3-hide-large w3-white w3-xlarge w3-padding-16">
      <span class="w3-left w3-padding">TW</span>
      <a class="w3-right w3-btn-floating w3-white" onclick="w3_open()">&#9776</a>
    </header>

    <!-- Overlay effect when opening sidenav on small screens -->
    <div class="w3-overlay w3-hide-large w3-animate-opacity" onclick="w3_close()" style="cursor:pointer" title="close side menu" id="myOverlay"></div>

    <!-- !WEB PAGE CONTENT! -->
    <div class="w3-main" style="margin-left:300px">
        <!-- Push down content on small screens  -->
        <div class="w3-hide-large" style="margin-top:83px"></div>


        <div class="w3-container " style="margin-top:83px">
          <h2>Draw Map</h2>

            <div class="w3-threequarter w3-container w3-card-2 ">

              
              
                <form id = "load-map-form"  class="w3-container w3-row " action = "#">
                    
                    <input id="loadMapField" class="w3-input w3-margin w3-border w3-quarter" type="text" name="input a map" placeholder="Map Name">
                    
                    <button id="loadMap_button" type="button" value="loadMap" class="w3-btn w3-quarter w3-margin w3-dark-grey w3-large w3-round-large w3-animate-zoom">loadMap</button>
                  

                    <select id="cell_type" class="w3-select w3-margin w3-border w3-quarter" name="option">
                      <option value="" disabled selected>Choose your option</option>
                      <option value="images/Void.png">Void Cell</option>
                      <option value="images/P1_LIVE.png">player1 live cell</option>
                      <option value="images/P2_LIVE.png">player2 live cell</option>
                      <option value="images/P1_DEAD.png">player1 dead cell</option>
                      <option value="images/P2_DEAD.png">player2 dead cell</option>
                      <option value="images/EMPTY_CELL.png">remove cell</option>
                    </select>

                    <button id="reset_button" type="button" value="Reset" class="w3-btn w3-quarter w3-margin w3-dark-grey w3-large w3-round-large w3-animate-zoom">Reset</button>

                </form>
              

              <div class="w3-container w3-center w3-padding-16">
                  <canvas id="editor_canvas" width="512" height="512">
                  </canvas>
              </div>

            </div>



            <div class="w3-quarter w3-container">
            <!--
                <form id = "map-form" action = "#">
                  Creator:
                  <input id = "creator" type = "text" name = "creator">
                  map name:
                  <input id = "mapname" type = "text" name = "map name">


                    <input id = "save_button" type = "button" value = "save"/>
                    <input id = "delete_button" type = "button" value = "delete"/>
                </form>
            -->
                <form id = "map-form" action="#" class="w3-container w3-card-4 w3-light-grey w3-text-grey ">

                  <h2 class="w3-center">Map Info</h2>

                  <div class="w3-row w3-section">
                      <div class="w3-col" style="width: 50px"><i class="w3-xxlarge fa fa-user"></i></div>

                      <div class="w3-rest">
                          <input id = "creator" class="w3-input w3-border" name="createor" type="text" placeholder="Creator Name">
                      </div>
                  </div>


                  <div class="w3-row w3-section">
                      <div class="w3-col" style="width: 50px"><i class="w3-xxlarge fa fa-map"></i></div>

                      <div class="w3-rest">
                          <input id = "mapname" class="w3-input w3-border" name="map name" type="text" placeholder="Map Name">
                      </div>
                  </div>

                  <p class="w3-center">
                      <button id = "save_button" type = "button" value = "save" class="w3-btn w3-section w3-dark-grey w3-medium w3-round-large w3-animate-zoom"> Save </button>
                      <button id = "delete_button" type = "button" value = "delete" class="w3-btn w3-section w3-dark-grey w3-medium w3-round-large w3-animate-zoom"> Delete </button>
                  </p>


                </form>


            </div>

          


        </div>



    

    </div>

<script>initEditor();</script>
</body>
</html>
