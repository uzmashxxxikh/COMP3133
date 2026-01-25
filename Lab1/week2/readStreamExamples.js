const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'input_stream.txt');
const readStream = fs.createReadStream(filePath);

readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.toString());
});

readStream.on('end', () => {
  console.log('No more data to read.');
});

readStream.on('error', (err) => {
  console.error('Error reading the stream:', err);
});

// readStream.pause();
// readStream.resume();