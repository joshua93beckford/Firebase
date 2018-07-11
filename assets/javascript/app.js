var config = {
    apiKey: "AIzaSyB48Vx0hCvWOPeNMXwLM4Ci0n_Ho6_lYf8",
    authDomain: "testproject-b18c8.firebaseapp.com",
    databaseURL: "https://testproject-b18c8.firebaseio.com",
    projectId: "testproject-b18c8",
    storageBucket: "testproject-b18c8.appspot.com",
    messagingSenderId: "343903222902"
};
firebase.initializeApp(config);

var trains = firebase.database().ref("trainsshced/");

setTrains();

$('body').on('click', '#submit', function (event) {

    var train, destination, time, frequency;

    event.preventDefault();

    train = $('#train').val().trim();
    destination = $('#destination').val().trim();
    time = $('#time').val().trim();
    frequency = $('#frequency').val().trim();

    if (!train || !destination || !time || !frequency) {

    }
    else{
        
        trains.push({

            train: train,
            destination: destination,
            time: time,
            frequency: frequency

        });
    }
});

trains.on("child_added", function(data, prevChildKey) {

    setTrains();

});

function setTrains(){

    trains.on("value", function (snapshot) {
    
        console.log(snapshot.val());
        $('#post-content').empty();
        snapshot.forEach(element => {
    
            var val = element.val();
    
            console.log(val);

            $('#post-content').append('<tr><td>' + val.train + '</td><td>' + val.destination + '</td><td>' + val.frequency + '</td></tr>');
    
    
        });
    
     }, function (error) {
        console.log("Error: " + error.code);
     });
    }
    