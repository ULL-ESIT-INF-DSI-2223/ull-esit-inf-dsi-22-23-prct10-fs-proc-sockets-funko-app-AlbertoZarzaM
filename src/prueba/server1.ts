import net from 'net';
const PORT = 60302;

const server = net.createServer();

server.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});


server.on('connection', (socket: net.Socket) => {
  let requestData = Buffer.from('');

  socket.on('data', (data: Buffer) => {
    // Acumula los datos recibidos en el búfer
    requestData = Buffer.concat([requestData, data]);

    // Busca el delimitador al final de la petición
    const delimiter = Buffer.from('\n');
    const delimiterIndex = requestData.indexOf(delimiter);

    if (delimiterIndex !== -1) {
      // Se encontró el delimitador, procesa la petición
      const request = requestData.slice(0, delimiterIndex).toString();
      const response = "Adios";

      // Emitir evento 'request' para indicar que se ha recibido una petición completa
      server.emit('request', request, response, socket);

      // Restablecer el búfer con los datos restantes
      requestData = requestData.slice(delimiterIndex + delimiter.length);
    }
  });
});

server.on('request', (request: string, response: string, socket: net.Socket) => {
  console.log(`Petición recibida: ${request}`);
  // Envia la respuesta al cliente
  socket.write(JSON.stringify({'type': 'watch', 'text': 'ADIOS'}) + '\n');
  
  // Cierra la conexión con el cliente
  socket.end();
});
