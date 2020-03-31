// Initialize Firebase
var index = 0;
 var firebaseConfig = {
    apiKey: "AIzaSyCCMXR9uPztYA2MCv18wq266ul2qAEsZzs",
    authDomain: "hmwrk7.firebaseapp.com",
    databaseURL: "https://hmwrk7.firebaseio.com",
    projectId: "hmwrk7",
    storageBucket: "hmwrk7.appspot.com",
    messagingSenderId: "799248801211",
    appId: "1:799248801211:web:dfbe013b61cf9dc063b89e",
    measurementId: "G-SQ0CEE35GG"
  };
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#formID").on("submit", function (event) {
    event.preventDefault();

    var name = $("#trainName").val().trim();
    var destination = $("#trainDestination").val().trim();
    var fTime = $("#firstTrainTime").val().trim();
    var frequency = $("#frequency").val().trim();

    database.ref().push({
      name: name,
      destination: destination,
      firstTime: fTime,
      frequency: frequency
    });

    $("#trainName").val("");
    $("#trainDestination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");

    return false;
  });

database.ref().orderByChild("dateAdded").on("child_added", function (childSnapshot) {

  var fTime = childSnapshot.val().firstTime;
  var tFrequency = parseInt(childSnapshot.val().frequency);
  var fTrain = moment(fTime, "HH:mm").subtract(1, "years");
  console.log(fTrain);
  console.log(fTime);
  var currentTime = moment();
  var currentTimeCalc = moment().subtract(1, "years");
  var diffTime = moment().diff(moment(fTrain), "minutes");
  var tRemainder = diffTime%tFrequency;
  var minutesRemaining = tFrequency - tRemainder;
  var nextTrain = moment().add(minutesRemaining, "minutes").format ("hh:mm A");
  var beforeCalc = moment(fTrain).diff(currentTimeCalc, "minutes");
  var beforeMinutes = Math.ceil(moment.duration(beforeCalc).asMinutes());

  if ((currentTimeCalc - fTrain) < 0) {
    nextTrain = childSnapshot.val().fTime;
    console.log("Before First Train");
    minutesRemaining = beforeMinutes;
  }
  else {
    nextTrain = moment().add(minutesRemaining, "minutes").format("hh:mm A");
    minutesRemaining = tFrequency - tRemainder;
    console.log("Working");
  }


  var newRow = $("<tr>");
  newRow.addClass("row-" + index);
  var cell1 = $("<td>").text(childSnapshot.val().name);
  var cell2 = $("<td>").text(childSnapshot.val().destination);
  var cell3 = $("<td>").text(childSnapshot.val().frequency);
  var cell4 = $("<td>").text(nextTrain);
  var cell5 = $("<td>").text(minutesRemaining);

  newRow
    .append(cell1)
    .append(cell2)
    .append(cell3)
    .append(cell4)
    .append(cell5)


 $("#tableContent").append(newRow);
 index++;
  
}, function (error) {
  alert(error.code);
});

function submitRow () {
  var newName = $(".newName").val().trim();
  var newDestination = $(".newDestination").val().trim();
  var newFrequency = $(".newFrequency").val().trim();

  database.ref().child($(this).attr("data-key")).child("name").set(newName);
  database.ref().child($(this).attr("data-key")).child("destination").set(newDestination);
  database.ref().child($(this).attr("data-key")).child("frequency").set(newFrequency);
};

$(document).on("click", ".submitButton", submitRow);