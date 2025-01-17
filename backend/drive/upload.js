const fs = require('fs');
const { google }= require('googleapis');
const path = require("path");
const apikeys = require('./apikeys.json');
const SCOPE = ['https://www.googleapis.com/auth/drive'];

// A Function that can provide access to google drive api
async function authorize(){
    const jwtClient = new google.auth.JWT(
        apikeys.client_email,
        null,
        apikeys.private_key,
        SCOPE
    );

    await jwtClient.authorize();

    return jwtClient;
}

// A Function that will upload the desired file to google drive folder
async function uploadFile(authClient){
    return new Promise((resolve,rejected)=>{
        const drive = google.drive({version:'v3',auth:authClient}); 

        var fileMetaData = {
            name:'20240507-8000-Classes-UG.pdf',    
            parents:['1hXVnRabWaqfNyhFU2H_B2ikEoTuMmkfw'] // A folder ID to which file will get uploaded
        }

        drive.files.create({
            resource:fileMetaData,
            media:{
                body: fs.createReadStream('mydrivetext.txt'), // files that will get uploaded
                mimeType: 'application/pdf'
            },
            fields: 'id'
        }, function(error, file) {
            if(error){
                return rejected(error)
            }
            resolve(file);
        })
    });
}

authorize().then(uploadFile).catch("error",console.error()); // function call