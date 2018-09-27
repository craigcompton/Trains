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

// 2. Button for adding 
$("#submit").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#trainName").val().trim();
    var dest = $("#dest").val().trim();
    var firstTrain = moment($("#firstTrain").val().trim()).format("HH:mm");
    var freq = $("#freq").val().trim();

    // Creates local "temporary" object for holding employee data
    var train = {
        name: trainName,
        desination: dest,
        startingTrainTime: firstTrain,
        frequency: freq
    };

    // Uploads  data to the database
    database.ref().push({
        name: trainName,
        desination: dest,
        startingTrainTime: firstTrain,
        frequency: freq
    });

    // Logs everything to console
    console.log(train.name);
    console.log(train.desination);
    console.log(train.startingTrainTime);
    console.log(train.frequency);

    // alert("Employee successfully added");

    // Clears all of the text-boxes
    $("#trainName").val("");
    $("#dest").val("");
    $("#firstTrain").val("");
    $("#freq").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    // var name = childSnapshot.val().trainName;
    // var desination = childSnapshot.val().dest;
    // var startingTrainTime = childSnapshot.val().firstTrain;
    // var frequency = childSnapshot.val().freq;

    // Store everything into a variable.
    var name = childSnapshot.val().name;
    var desination = childSnapshot.val().desination;
    var startingTrainTime = childSnapshot.val().startingTrainTime;
    var frequency = childSnapshot.val().frequency;


    // Employee Info
    console.log(name);
    console.log(desination);
    console.log(startingTrainTime);
    console.log(frequency);

    // Prettify the employee start
    var startingTrainTimePretty = moment(startingTrainTime).format("HH:mm");
    console.log('startingTrainTime = ', startingTrainTimePretty)

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    // var empMonths = moment().diff(moment(empStart), "months");
    // console.log(empMonths);

    var nextArrival = moment().diff(moment(startingTrainTimePretty), "minutes");
    console.log(nextArrival);

    // Calculate the total billed rate
    // var empBilled = empMonths * frequency;
    // console.log(empBilled);

    var minAway = "math";

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(desination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minAway),
    );

    // Append the new row to the table
    $("#tList  > tbody").append(newRow);
});

  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016

  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
