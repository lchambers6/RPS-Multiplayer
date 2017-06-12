
$(document).ready(function() {


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAPp8Pd0Z9IqinCTYgGpEFj1EBw3ev90WU",
    authDomain: "rpsgamehw.firebaseapp.com",
    databaseURL: "https://rpsgamehw.firebaseio.com",
    projectId: "rpsgamehw",
    storageBucket: "rpsgamehw.appspot.com",
    messagingSenderId: "399888694448"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var msg = "";
  var playerCount = 0;

  $("#submitButton").on("click", function(event) {
    event.preventDefault();
    msg = $("#messageInput").val();
    database.ref("chat").push({
      message: msg
    });
    $("form").trigger("reset");
    $("#msgBox").scrollTop($("#msgBox")[0].scrollHeight);
    $("#msgBox").empty();
    database.ref("chat").on("child_added", function(snapshot) {
      $( "#initialMsg" ).remove();
      $("#msgBox").append("<p>" + player1 + ":<br>" + snapshot.val().message + "</p>");
    });
  });

  // database.ref().onDisconnect("child_added", function(snapshot) {
  //   database.ref().child("player1").remove();
  // });

  $("#playerForm").submit( function(event) {
    event.preventDefault();
    playerName = $("#playerInput").val();
    firebase.auth().signInAnonymously();
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      playerCount++;
    }
    addPlayer(uid);
    });
  });

  function addPlayer(uid) {
    database.ref(uid).set({
        name: playerName,
        wins: 0,
        losses: 0,
        playerNum: playerCount,
        choice: ""
    });
    var playerID = "#player" + playerCount;
    $("form").trigger("reset");
    database.ref().on("child_added", function(snapshot) {
      $( "#playerForm" ).remove();
      $( "#playerButton" ).remove();
      $("#playerSection").html("<div id='playerName'><h1>" + snapshot.val().name + "</h1></div>");
      $(playerID).empty();
      $(playerID).html("<div><h1>" + snapshot.val().name + "</h1>" + "<p>Wins: " + snapshot.val().wins + "</p>" + "<p>Losses: " + snapshot.val().losses + "</p><div>");
      $(playerID).append("<div><p>Choose element: </p></div><div id='" + playerID + "Rock'><h3>Rock</h3></div><div id='" + playerID + "Paper'><h3>Paper</h3></div><div id='" + playerID + "Scissors'><h3>Scissors</h3></div>");
    });
  };

  $("#clearButton").on("click", function(event) {
    event.preventDefault();
    database.ref().child("chat").remove();
    $("#msgBox").html("<div id='initialMsg'><span style='color:grey'>Messages will appear here</span></div>");
  });



});