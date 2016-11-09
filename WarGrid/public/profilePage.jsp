<!DOCTYPE html>

<html>
  <head>
    <title>Profile</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="w3.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <script src="scripts/wScript.js"></script>

  </head>

  <body class="w3-light-grey w3-content" style="max-width:1600px">


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
      <span class="w3-left w3-padding">WG</span>
      <a class="w3-right w3-btn-floating w3-white" onclick="w3_open()">&#9776</a>
    </header>

    <!-- Overlay effect when opening sidenav on small screens -->
    <div class="w3-overlay w3-hide-large w3-animate-opacity" onclick="w3_close()" style="cursor:pointer" title="close side menu" id="myOverlay"></div>

    <!-- !WEB PAGE CONTENT! -->
    <div class="w3-main" style="margin-left:300px">
    	<!-- Push down content on small screens  -->
      	<div class="w3-hide-large" style="margin-top:83px"></div>
      <!-- Profile content -->
      
        <div class="w3-container" style="margin-top:83px">
        	<h1>Profile</h1>
        	<p>Match history result:</p>
        	<div class="w3-panel w3-card-8 w3-round-xlarge">
        		<p>Player Name: </p>
        		<p>Total Wins: </p>
        		<p>Total Loss: </p>
        	</div>
        </div>

    </div>



  
      


    

  


	</body>
</html>



