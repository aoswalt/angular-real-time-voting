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
    const dbref = db.ref("votes");

    main.heading = "Voterific";
    main.votes = {};

    main.addNominee = () => dbref.update({ [dbref.push().key]: {name:main.nominee, count:0} })
      .then($timeout().then(() => main.nominee = null));
    main.castVote = key => db.ref(`votes/${key}/count`).transaction(val => ++val);

    db.ref("votes").on("child_added", snapshot =>
      $timeout().then(() => main.votes[snapshot.getKey()] = snapshot.val()));
    db.ref("votes").on("child_changed", snapshot =>
      $timeout().then(() => main.votes[snapshot.getKey()] = snapshot.val()));
  });
