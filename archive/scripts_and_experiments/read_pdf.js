const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('GitHub-Profile-Setup-Guide.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(err => {
    console.log("Error reading GitHub-Profile-Setup-Guide.pdf", err);
});

let dataBuffer2 = fs.readFileSync('GitHub-Profile-Master-Prompt.pdf');
pdf(dataBuffer2).then(function(data) {
    console.log("------------------\nMASTER PROMPT PDF:\n------------------");
    console.log(data.text);
}).catch(err => {
    console.log("Error reading GitHub-Profile-Master-Prompt.pdf", err);
});
