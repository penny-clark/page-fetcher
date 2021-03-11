const fs = require('fs');
const request = require('request');
const URL = process.argv[2];
const filePath = process.argv[3];

const fetcher = function(URL, filePath, callback) {
  request(URL, (error, response, body) => {
    console.log('error:', error); // Print the error if one occurred
    //uncomment below 2 lines if extra info is desired at this stage
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body); // Print the HTML for the Google homepage.
    if (!error) callback(filePath, body);
  });
};

const downloadFile = function(filePath, sourceText) {
  fs.writeFile(filePath, sourceText, (err, data) => {
    if (err) return console.log(err);
    //guidance on finding byte size from https://stackoverflow.com/questions/42363140/how-to-find-the-size-of-the-file-in-node-js
    const stats = fs.statSync(filePath);
    const fileSizeInBytes = stats.size;
    console.log(data);
    console.log(`Success! Downloaded and saved ${fileSizeInBytes} Bytes to ${filePath}`);
  });
};


fetcher(URL, filePath, downloadFile);