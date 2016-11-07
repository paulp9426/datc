/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/gapi/gapi.d.ts" />
/// <reference path="notepad.ts" />
var NotepadAuth;
(function (NotepadAuth) {
    //Google account settings
    var clientId = '33086095654-621eq43a9a8ubn5anhrotltfa18vfdg2.apps.googleusercontent.com';
    var scopes = 'https://www.googleapis.com/auth/drive';
    //UI controls
    var connectButton = $("#connectButton");
    var saveButton = $("#saveButton");
    //function invoked after Google API has been loaded
    function load() {
        //Google api is loaded
        //try to see if authorized
        gapi.auth.init(function () {
            checkAuth(true);
        });
        //register connect click event
        connectButton.click(handleAuthClick);
        saveButton.click(function () { Notepad.save(); });
    }
    NotepadAuth.load = load;
    function checkAuth(immediate) {
        gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: immediate }, handleAuthResult);
    }
    function handleAuthClick(event) {
        checkAuth(false);
    }
    function handleAuthResult(authResult) {
        if (authResult && !authResult.error) {
            //authorization granted
            connectButton.addClass("hidden");
            saveButton.removeClass("hidden");
            Notepad.getTextFiles();
        }
        else {
            //authorization not granted
            connectButton.removeClass("hidden");
            saveButton.addClass("hidden");
        }
    }
})(NotepadAuth || (NotepadAuth = {}));
function loadNotepadAuth() {
    NotepadAuth.load();
}
//# sourceMappingURL=notepad-auth.js.map