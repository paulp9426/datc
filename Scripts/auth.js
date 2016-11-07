/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/gapi/gapi.d.ts" />
var Auth;
(function (Auth) {
    //google accoutn settings
    var clientId = '33086095654-621eq43a9a8ubn5anhrotltfa18vfdg2.apps.googleusercontent.com';
    var scopes = 'https://www.googleapis.com/auth/drive';
    //UI controls
    var connectButton = $("#connectButton");
    var message = $("#message");
    var panel = $("#panel");
    var authResultPanel = $("#authResult");
    var tokenPanel = $("#token");
    //function invoked after google API has been loaded
    function load() {
        //google api is loaded
        //try to see if authorized
        gapi.auth.init(function () {
            checkAuth(true);
        });
        //register connect click event
        connectButton.click(handleAuthClick);
    }
    Auth.load = load;
    function checkAuth(immediate) {
        gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: immediate }, handleAuthResult);
    }
    function handleAuthClick(event) {
        checkAuth(false);
    }
    function handleAuthResult(authResult) {
        //display result on screen
        if (authResult) {
            authResultPanel.text(JSON.stringify(authResult));
        }
        if (authResult && !authResult.error) {
            //authorization granted
            showAuthorizedMessage();
        }
        else {
            //authorization not granted
            showNotAuthorizedMessage();
        }
    }
    function showAuthorizedMessage() {
        connectButton.addClass("hidden");
        message.text("Aplicația este autorizată să acceseze resurse utilizatorului.");
        panel.removeClass("panel-danger");
        panel.addClass("panel-success");
        //retrive token
        tokenPanel.text(JSON.stringify(gapi.auth.getToken()));
    }
    function showNotAuthorizedMessage() {
        connectButton.removeClass("hidden");
        message.text("Aplicația NU este autorizată să acceseze resurse utilizatorului.");
        panel.removeClass("panel-success");
        panel.addClass("panel-danger");
    }
})(Auth || (Auth = {}));
function loadAuth() {
    Auth.load();
}
//# sourceMappingURL=auth.js.map