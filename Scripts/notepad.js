var Notepad;
var folderID = "";
(function (Notepad) {
    var boundary = '-------314159265358979323846';
    var delimiter = "\r\n--" + boundary + "\r\n";
    var close_delim = "\r\n--" + boundary + "--";
    function getTextFiles() {
        gapi.client.load('drive', 'v3', function () {
            getTextFilesOnDrive();
        });
    }
    Notepad.getTextFiles = getTextFiles;
    function getTextFilesOnDrive(callback) {
        var request = gapi.client.request({
            'path': '/drive/v3/files',
            'method': 'GET',
            'params': { 'q': "fileExtension='txt'" }
        });
        if (!callback) {
            callback = function (results) {
                console.log(results);
            };
        }
        request.execute(callback);
    }
    function save() {
        var fileName = $("#fileName");
        var fileContent = $("#fileContent");
        var folderName = $("#folderName");

        console.log(folderName.val());

        if (folderName.val() == "") {
            createTextFile(fileName.val(), fileContent.val());
        } else {
            getAllFolders(folderName.val());

        }

    }

    function createFolder(folderName) {
        var request = gapi.client.request({
            'path': 'drive/v2/files',
            'method': 'POST',
            'body': {
                'title': folderName,
                'mimeType': 'application/vnd.google-apps.folder'
            }
        });
        request.execute(printout);
    }

    function printout(result) {
        console.log(result);
        var fileName = $("#fileName");
        var fileContent = $("#fileContent");
        createTextFile(fileName.val(), fileContent.val());
        folderID = result.id;

    }

    function getAllFolders(folderName) {
        var request = gapi.client.request({
            'path': 'drive/v2/files',
            'method': 'GET',
            'params': {
                'maxResults': '20',
                'q': "mimeType = 'application/vnd.google-apps.folder' and title contains '" + folderName + "'"
            }
        });

        request.execute(listItems);

    }

    function listItems(resp) {
        var folderName = $("#folderName");
        var result = resp.items;
        var i = 0;
        
        for (i = 0; i < result.length; i++) {
            console.log(result[i].title);
            if(result[i].title == folderName.val()){
                alert("Folderul deja extsia");
                return;
        }
    }
    
        createFolder(folderName.val());
    
}

    Notepad.save = save;
    function createTextFile(fileName, content) {
        gapi.client.load('drive', 'v3', function () {
            createTextFileOnDrive(fileName, content);
        });
    }
    function createTextFileOnDrive(fileName, content, callback) {
        var contentType = "text/plain";

        if(folderID != ""){
            var metadata = {
            'name': fileName,
            'mimeType': contentType,
             parents: [ folderID ]
            };
        }else{
            var metadata = {
            'name': fileName,
            'mimeType': contentType
        };
        }
        
        var base64Data = btoa(content);
        var multipartRequestBody = delimiter +
            'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: ' + contentType + '\r\n' +
            'Content-Transfer-Encoding: base64\r\n' +
            '\r\n' +
            base64Data +
            close_delim;
        var request = gapi.client.request({
            'path': '/upload/drive/v3/files',
            'method': 'POST',
            'params': { 'uploadType': 'multipart' },
            'headers': {
                'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
            },
            'body': multipartRequestBody
        });
        if (!callback) {
            callback = function (file) {
                console.log(file);


                alert("Fisierul a fost salvat.");
            };
        }
        request.execute(callback);
    }
})(Notepad || (Notepad = {}));
//# sourceMappingURL=notepad.js.map