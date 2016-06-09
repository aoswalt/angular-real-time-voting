angular.module("app", [])
  .config(() => {
    firebase.initializeApp({
      apiKey: "AIzaSyAT2D9QJIiPHzlORB8fGEoRQQAPoeazwn4",
      authDomain: "angular-real-time-voting.firebaseapp.com",
      databaseURL: "https://angular-real-time-voting.firebaseio.com",
      storageBucket: "angular-real-time-voting.appspot.com"
    });
  })

  .controller("MainCtrl", function($timeout) {
    const main = this;

    main.heading = "Voterific";
    firebase.database().ref("votes").on("value", snapshot =>
      $timeout(() => snapshot.val())
        .then(data => {
          main.redCount = data.red;
          main.blueCount = data.blue;
        }));
  });
