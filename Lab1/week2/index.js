const fs = require('fs');
const path = require('path');

// Define the file path
const filePath = path.join(__dirname, 'input.txt');

console.log("--- START ---")
// Read asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
    if(err) {
        console.error('Error reading file:', err);
        return;
    }

    console.log(data)
})

// Read asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
    if(err) {
        console.error('Error reading file:', err);
        return;
    }

    console.log(data)
})
console.log("--- END ---")

