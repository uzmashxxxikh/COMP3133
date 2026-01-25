const fs = require('fs');
const path = require('path');
const crypto = require('crypto'); //
const { Transform } = require('stream'); //

// Define the file paths
const fileInputPath = path.join(__dirname, 'input_stream.txt'); //
const fileOutputPath = path.join(__dirname, 'out_stream.txt'); //

// Create Read and Write Streams
const readStream = fs.createReadStream(fileInputPath); //
const writeStream = fs.createWriteStream(fileOutputPath); //

// Crypto Configuration
const algorithm = 'aes-256-cbc'; //
const password = 'password123456789012345678901234'; // 32 bytes for aes-256
const iv = crypto.randomBytes(16); //

const encryptStream = crypto.createCipheriv(algorithm, Buffer.from(password), iv); //
const decryptStream = crypto.createDecipheriv(algorithm, Buffer.from(password), iv); //

// Custom Transform Stream
const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    // Example transformation: convert chunk to uppercase
    const transformedChunk = chunk.toString().toUpperCase(); //
    callback(null, transformedChunk); //
  }
});

// Pipe readStream through transformStream and then to writeStream
readStream
  .pipe(transformStream) //
  .pipe(encryptStream)   //
  .pipe(decryptStream)   //
  .pipe(writeStream);    //

// Event Handlers
writeStream.on('finish', () => {
  console.log('Data has been transformed, encrypted, decrypted, and written to the output file.'); //
});

writeStream.on('error', (err) => {
  console.error('Error with the write stream:', err); //
});

readStream.on('error', (err) => {
  console.error('Error with the read stream:', err); //
});