import net from 'net';
import {watchFile} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, provide a filename.');
} else {
  const fileName = process.argv[2];

  net.createServer((connection) => {
    console.log('A client has connected.');

    //read client messages
    connection.on('data', (dataJSON) => {
      const message = JSON.parse(dataJSON.toString());

      if (message.type === 'watch') {
        console.log(`Connection established: watching file ${message.file}`);
      } else if (message.type === 'change') {
        console.log('File has been modified.');
        console.log(`Previous size: ${message.prevSize}`);
        console.log(`Current size: ${message.currSize}`);
      } else {
        console.log(`Message type ${message.type} is not valid`);
      }
    });

    connection.write(JSON.stringify({'type': 'watch', 'file': fileName}) +
      '\n');

    watchFile(fileName, (curr, prev) => {
      connection.write(JSON.stringify({
        'type': 'change', 'prevSize': prev.size, 'currSize': curr.size}) +
         '\n');
    });

    connection.on('close', () => {
      console.log('A client has disconnected.');
    });
  }).listen(60300, () => {
    console.log('Waiting for clients to connect.');
  });
}
