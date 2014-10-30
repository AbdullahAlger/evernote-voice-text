// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('everVoice', ['ionic'])

.controller('RecordVoice', ['$scope', 'VoiceService', function($scope, VoiceService){
  $scope.recordActive = true;
}])


.service('VoiceService', ['$scope', '$log', function($scope, $log){

// Record Function
  $scope.record = function() {
    var src = "??";
    var mediaRec = new Media(src,
    // Success message  
      function() {
        $log("record success");
      }, 
    // Error message
      function(err) {
        $log("record error " + err.code);
      });
    // Starts recording
    mediaRec.startRecord();
    // Sets a timeout for the recording if not stopped
    setTimeout(function() {
      mediaRec.stopRecord();
      }, 60000);
    };


// Stop Function
  $scope.stop = function() {
    mediaRec.stopRecord();
  }; 


// Record Duration 
  
  

}])

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
