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

    var train, destination, time, frequency, time_arr, mins_aw;

    event.preventDefault();

    train = $('#train').val().trim();
    destination = $('#destination').val().trim();
    time = $('#time').val().trim();
    frequency = $('#frequency').val().trim();
    time_arr = moment(time, 'HH:mm').format('hh:mm a');

    var year = moment().get('year');
    var month = moment().get('month');
    var hour = "" + time.charAt(0) + "" + time.charAt(1);
    var minute = "" + time.charAt(3) + "" + time.charAt(4);
    var tt = moment().set({ 'year': year, 'month': month, 'hour': hour, 'minute': minute });
    mins_aw = parseInt(moment(tt).diff(moment()) / 60000);

    if (!train || !destination || !time || !frequency || !time_arr) {

    }
    else {

        trains.push({

            train: train,
            destination: destination,
            time: time,
            frequency: frequency,
            arrival: time_arr,
            away: mins_aw
        });
    }
});

trains.on("child_added", function (data, prevChildKey) {

    setTrains();

});

function setTrains() {

    trains.on("value", function (snapshot) {

        $('#post-content').empty();
        snapshot.forEach(element => {

            var val = element.val();

            $('#post-content').append('<tr><td>' + val.train + '</td><td>' + val.destination + '</td><td>' + val.frequency + '</td><td>' + val.arrival + '</td><td>' + val.away + '</td></tr>');
        });

    }, function (error) {
        console.log("Error: " + error.code);
    });
}
