angular.module("app", [])   //NOTE(adam): array here causes instantiation of module
  .controller("MainCtrl", function() {
    const main = this;

    main.heading = "Rock the Vote!";
  })
