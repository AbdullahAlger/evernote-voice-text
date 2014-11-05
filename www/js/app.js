// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var evernote = angular.module('everVoice', ['ionic', 'ngCordova', 'ngCordovaMocks'])

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
});

evernote.controller('RecordCtrl', function($scope, $cordovaCapture, $http) {

  $scope.captureAudio = function() {
    var options = { duration: 10 };

    $cordovaCapture.captureAudio(options).then(function(audioData) {
      // Success! Audio data is here
      console.log('hey');
      console.log(audioData);
    }, function(err) {
      // An error occured. Show a message to the user
    });
  }

});


// Evernote Popup Controller

evernote.controller('PopupCtrl', ['$scope', '$ionicPopup', 'createEvernote', function($scope, $ionicPopup, createEvernote){
  $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Save Recording',
     template: 'Save to Evernote?' });
   confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure');
     } else {
       console.log('You are not sure');
     }
   });
 };
}]);
// File Cordova to send to att ???

evernote.directive('sendATT', function($scope) {
// send to ATT



});

evernote.service('createEvernote', function() {
// Evernote creates a new note


});


evernote.filter('timecode', function(){
   return function(seconds) {
     seconds = Number.parseFloat(seconds);

     // Returned when No Time is Provided
     if (Number.isNaN(seconds)) {
       return '-:--';
     }

     // Returns a Whole Number
     var wholeSeconds = Math.floor(seconds);
     var minutes = Math.floor(wholeSeconds / 60);
     var remainingSeconds = wholeSeconds % 60;

     var output = minutes + ':';
     // zero pad seconds, so 9 seconds should be :09
     if (remainingSeconds < 10) {
       output += '0';
     }
     output += remainingSeconds;
     return output;
   }
 });



