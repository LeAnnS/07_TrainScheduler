var test = ["js is connected"]
console.log(test)

// Add current time to schedule board
var currentTime = moment();
	console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
$("#now").text(currentTime);

/* global firebase moment */

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
		// console.log(newTrain.name);
		// console.log(newTrain.dest);
		// console.log(newTrain.start);
		// console.log(newTrain.freq);	
		// console.log(newTrain.next);
		// console.log(newTrain.minRem);

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
	
	// // train info
	// console.log(trainName);
	// console.log(trainDest);
	// console.log(trainStart);
	// console.log(trainFreq);	
	// console.log(nextTrain);
	// console.log(minTillNext);

	// Calculates train times	
		// Set first time (push back 1 year to ensure it is before current time)
		var startTimeOrig = moment(trainStart, "hh:mm").subtract(1, "years");
			console.log("Original start time: " + startTimeOrig);

		// calculate the difference between the start time & the current time
		var diffTime = moment().diff(moment(startTimeOrig), "minutes");
			console.log("Difference in time: " + diffTime);

		// calculate the remainder minutes from the last train
		var minRemainder = diffTime % trainFreq;
			console.log("Minutes since last Train: " + minRemainder);

		// calculate the minutes until the next train
		var minTillNext = trainFreq - minRemainder;
			console.log("Minutes until next Train: " + minTillNext);

		// calculate the next arrival time
		var nextTrain = moment().add(minTillNext, "minutes").format("HH:mm");
			console.log("Arrival Time: " + moment(nextTrain).format("HH:mm"));


	

	// add train's data to the table in html file
	$("#train-schedule > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextTrain + "</td><td>" + minTillNext + "</td></tr>");
});

// Handle the errors
// function(errorObject) {
	// console.log("Errors handled: " + errorObject.code);
// };
