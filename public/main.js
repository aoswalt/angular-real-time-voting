angular.module("app", ["angular.filter"])
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

    const db = firebase.database();

    main.castVote = key => db.ref(`votes/${key}/count`).transaction(val => ++val);

    main.heading = "Voterific";
    db.ref("votes").on("value", snapshot =>
      $timeout(() => snapshot.val())
        .then(data => main.votes = data));
  });
