
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
  var user1 = "Player 1";

  $("#submitButton").on("click", function(event) {
    event.preventDefault();
    msg = $("#messageInput").val();
    database.ref().child("chat").push({
      message: msg
    });
    $("form").trigger("reset");
    $("#msgBox").scrollTop($("#msgBox")[0].scrollHeight);
  });

  $("#clearButton").on("click", function(event) {
    event.preventDefault();
    removeChild("chat");
  });

  database.ref().child("chat").on("child_added", function(snapshot) {
    $("#msgBox").append("<p>" + user1 + ":<br>" + snapshot.val().message + "</p>");
  });

  function removeChild(childName) {
    database.ref().child(childName).remove();
    $("#msgBox").html("<div id='initialMsg'><span style='color:grey'>Messages will appear here</span></div>");
  }
});
