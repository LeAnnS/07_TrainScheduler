var test = ["js is connected"]
console.log(test)

/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyBa0PzVr6fBZL6GNToBCCgJaRr2qUkW2s4",
    authDomain: "trainscheduler-59226.firebaseapp.com",
    databaseURL: "https://trainscheduler-59226.firebaseio.com",
    projectId: "trainscheduler-59226",
    storageBucket: "trainscheduler-59226.appspot.com",
    messagingSenderId: "512565559585"
};

firebase.initializeApp(config);

// create variable to reference the database
var database = firebase.database();

// 2. Capture button click
$("#add-train-btn").on("click", function(event) {
	event.preventDefault();

	// Grabs user input
	var trainName = $("#train-name-input").val().trim();
	var trainDest = $("#dest-input").val().trim();
	var trainStart = $("#start-input").val().trim();
	var trainFreq = $("#freq-input").val().trim();

	// Creates local object for holding train data
	var newTrain = {
		name: trainName,
		dest: trainDest,
		start: trainStart,
		freq: trainFreq,
	};

	console.log(newTrain);

	// Pushes new train data to the firebase database
	database.ref().push(newTrain);

	// log to console
	console.log(newTrain.name);
	console.log(newTrain.dest);
	console.log(newTrain.start);
	console.log(newTrain.freq);

	// alert
	alert("Train successfully added");

	// clears all of the text-boxes
	$("#train-name-input").val("");
	$("#dest-input").val("");
	$("#start-input").val("");
	$("#freq-input").val("");
});

// firebase event for adding train to the database
database.ref().on("child_added", function(childSnapshot,prevChildKey) {

	console.log(childSnapshot.val());

	// store firebase info in a variable
	var trainName = childSnapshot.val().name;
	var trainDest = childSnapshot.val().dest;
	var trainStart = childSnapshot.val().start;
	var trainFreq = childSnapshot.val().freq;

	// train info
	console.log(trainName);
	console.log(trainDest);
	console.log(trainStart);
	console.log(trainFreq);

	// calculate the next arrival time

	// calculate the minutes away time


	// add train's data to the table
	$("#train-schedule > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td></tr>");
});

// Handle the errors
// function(errorObject) {
	// console.log("Errors handled: " + errorObject.code);
// };
