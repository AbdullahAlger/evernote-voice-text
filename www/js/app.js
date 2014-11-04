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

evernote.service('createEvernote', function($rootScope) {
// Evernote creates a new note

  return {

    consumerKey: 'abdullahalger',
    consumerSecret: '6a2c6323f12f818c',
    evernoteHostName: 'https://sandbox.evernote.com',
    loginEvernote: function() {
      options = {
        consumerKey: evernote.consumerKey,
        consumerSecret: evernote.consumerSecret,
        callbackUrl : "https://sandbox.evernote.com", // this filename doesn't matter in this example
        signatureMethod : "HMAC-SHA1"
      };
      oauth = OAuth(options);
      // OAuth Step 1: Get request token
      oauth.request({'method': 'GET', 'url': app.evernoteHostName + '/oauth', 'success': app.success, 'failure': app.failure});
    },
      success: function(data) {
        var isCallBackConfirmed = false;
        var token = '';
        var vars = data.text.split("&");
        for (var i = 0; i < vars.length; i++) {
          var y = vars[i].split('=');
          if(y[0] === 'oauth_token')  {
            token = y[1];
          }
          else if(y[0] === 'oauth_token_secret') {
            this.oauth_token_secret = y[1];
            localStorage.setItem("oauth_token_secret", y[1]);
          }
          else if(y[0] === 'oauth_callback_confirmed') {
            isCallBackConfirmed = true;
          }
        }
        var ref;
        if(isCallBackConfirmed) {
          // step 2
          ref = window.open(app.evernoteHostName + '/OAuth.action?oauth_token=' + token, '_blank');
          ref.addEventListener('loadstart',
            function(event) {
              var loc = event.url;
              if (loc.indexOf(app.evernoteHostName + '/Home.action?gotOAuth.html?') >= 0) {
                var index, verifier = '';
                var got_oauth = '';
                var params = loc.substr(loc.indexOf('?') + 1);
                params = params.split('&');
                for (var i = 0; i < params.length; i++) {
                  var y = params[i].split('=');
                  if(y[0] === 'oauth_verifier') {
                    verifier = y[1];
                  }
                }
              } else if(y[0] === 'gotOAuth.html?oauth_token') {
                got_oauth = y[1];
              }
              // step 3
              oauth.setVerifier(verifier);
              oauth.setAccessToken([got_oauth, localStorage.getItem("oauth_token_secret")]);

              var getData = {'oauth_verifier':verifier};
              ref.close();
              oauth.request({'method': 'GET', 'url': app.evernoteHostName + '/oauth',
                'success': app.success, 'failure': app.failure});

            }
          );
        } else {
          // Step 4 : Get the final token
          var querystring = app.getQueryParams(data.text);
          var authTokenEvernote = querystring.oauth_token;
          // authTokenEvernote can now be used to send request to the Evernote Cloud API

          // Here, we connect to the Evernote Cloud API and get a list of all of the
          // notebooks in the authenticated user's account:
          var noteStoreURL = querystring.edam_noteStoreUrl;
          var noteStoreTransport = new Thrift.BinaryHttpTransport(noteStoreURL);
          var noteStoreProtocol = new Thrift.BinaryProtocol(noteStoreTransport);
          var noteStore = new NoteStoreClient(noteStoreProtocol);
          noteStore.listNotebooks(authTokenEvernote, function (notebooks) {
            console.log(notebooks);
          }
        },
        function onerror(error) {
          console.log(error);
        });

      },
      failure: function(error) {
        console.log('error ' + error.text);
    }
  }

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



