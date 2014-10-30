// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('everVoice', ['ionic'])

.controller('RecordVoice', function($scope){
  $scope.recordActive = true;
})


.service('VoiceService', function($scope, $log){

// Record Function
  $scope.record = function() {
    $log.log('record');
  };

// Stop Function
  $scope.stop = function() {
    $log.log('stop');
  }; 

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
