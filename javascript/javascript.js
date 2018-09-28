console.log("JS connected");

$(document).ready(function () {
    console.log("document loaded");
});

$(window).on("load", function () {
    console.log("window loaded");
});

console.log("JS connected");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA4YOWz1AJx5DUXX-SPzmE3Tn2ZT956CWI",
    authDomain: "train-scheduler-ccce3.firebaseapp.com",
    databaseURL: "https://train-scheduler-ccce3.firebaseio.com",
    projectId: "train-scheduler-ccce3",
    storageBucket: "train-scheduler-ccce3.appspot.com",
    messagingSenderId: "247407927688"
};
firebase.initializeApp(config);



// ------------------------------------------



var database = firebase.database();

// Button  
$("#submit").on("click", function (event) {
    event.preventDefault();

    // user input
    var trainName = $("#trainName").val().trim();
    var dest = $("#dest").val().trim();
    var firstTrain = moment($("#firstTrain").val().trim()).format("HH:mm");
    var freq = $("#freq").val().trim();

    console.log(trainName);
    console.log(dest);
    console.log(firstTrain);
    console.log(freq);

    // stores data in a var
    var train = {
        name: trainName,
        destination: dest,
        startingTrainTime: firstTrain,
        frequency: freq
    };

    // data to the database
    database.ref().push({
        name: trainName,
        destination: dest,
        startingTrainTime: firstTrain,
        frequency: freq
    });

    //  console logs it 
    console.log(train.name);
    console.log(train.destination);
    console.log(train.startingTrainTime);
    console.log(train.frequency);

    // Clears the text
    $("#trainName").val("");
    $("#dest").val("");
    $("#firstTrain").val("");
    $("#freq").val("");
});

// create event for adding to the database and a row to the html
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store database into a variable.
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var startingTrainTime = childSnapshot.val().startingTrainTime;
    var frequency = childSnapshot.val().frequency;


    // train Info
    console.log(name);
    console.log(destination);
    console.log(startingTrainTime);
    console.log(frequency);

    // Prettify the train time
    var startingTrainTimePretty = moment(startingTrainTime).format("HH:mm");
    console.log('startingTrainTime = ', startingTrainTimePretty)

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTime = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTime);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTime), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % freq;
    console.log(tRemainder);

    // Minute Until Train
    var minAway = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minAway);

    // Next Train
    var nextArrival = moment().add(minAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

    //  the new html row
    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minAway),
    );

    // Append the new row to the table
    $("#tList  > tbody").append(newRow);
});