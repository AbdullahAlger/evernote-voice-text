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

evernote.controller('RecordCtrl', function($scope, $cordovaMedia) {

  $scope.captureAudio = function() {
    var options = { duration: 10 };

    $cordovaCapture.captureAudio(options).then(function(audioData) {
      // Success! Audio data is here
    }, function(err) {
      // An error occured. Show a message to the user
    });
  }


});


// Evernote Popup Controller

evernote.controller('PopupCtrl', function($scope, $ionicPopup){
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
});
// File Cordova to send to att ???

evernote.directive('sendATT', function($scope) {
// send to ATT



});

evernote.directive('createEvernote', function($scope) {
// Evernote creates a new note

  var Evernote = require('evernote').Evernote;

  module.exports = function(
    token,
    noteTitle,
    noteBody,
    isReminder,
    callback
  ) {

    var client = new Evernote.Client({token: token, sandbox: false});
    var noteStore = client.getNoteStore();

    console.log(noteStore);

    var nBody = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    nBody += "<!DOCTYPE en-note SYSTEM \"http://xml.evernote.com/pub/enml2.dtd\">";
    nBody += "<en-note>" + noteBody + "</en-note>";

    // Create note object
    var ourNote = new Evernote.Note();
    ourNote.title = noteTitle;
    ourNote.content = nBody;
    ourNote.attributes = new Evernote.NoteAttributes();
    if (isReminder) {
      ourNote.attributes.reminderOrder = 0;
    }

    // Attempt to create note in Evernote account
    noteStore.createNote(ourNote, function(err, note) {
      callback(err, note);
    });
  };




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



