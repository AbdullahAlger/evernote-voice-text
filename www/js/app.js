// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('everVoice', ['ionic', 'ngCordova'])

.controller('RecordVoice', ['$scope', '$ionicPopup', 'VoiceService', function($scope, $ionicPopup, $cordovaMedia, VoiceService){


// Evernote Popup - Was Formerly another Controller
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

// Show Time Recording
  VoiceService.onTimeUpdate(function(event, time) {
    $scope.$apply(function() {
      $scope.recordTime = time;
    });
  });

}])

// File Cordova to send to att ???

.factory('VoiceService',['$rootScope', function($rootScope){

  var currentRecording = null;

  return {
  onTimeUpdate: function(callback) {
      return $rootScope.$on('recording:timeupdate', callback);
    }
  };


}])

.filter('timecode', function(){
   return function(seconds) {
     seconds = Number.parseFloat(seconds);
 
     // Returned when No Time is Provided
     if (Number.isNaN(seconds)) {
       return '-:--';
     }
 
     // Returns a Whole Number
     var wholeSeconds = Math.floor(seconds);
     var minutes = Math.floor(wholeSeconds / 60);
     remainingSeconds = wholeSeconds % 60;
 
     var output = minutes + ':';
     // zero pad seconds, so 9 seconds should be :09
     if (remainingSeconds < 10) {
       output += '0';
     }
     output += remainingSeconds;
     return output;
   }
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
