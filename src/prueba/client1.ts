import net from 'net';

const client = net.createConnection({ port: 60302 }, () => {
  console.log('Conexión establecida con el servidor');
  
  // Envia la petición al servidor, con un delimitador al final
  client.write(JSON.stringify({'type': 'watch', 'text': 'HOLA'}) + '\n');
});

client.on('data', (dataJSON) => {
  // Procesa la respuesta recibida
  const response = JSON.parse(dataJSON.toString());
  console.log(`Respuesta recibida: `);
  console.log(response.text);
});

client.on('end', () => {
  console.log('Conexión cerrada con el servidor');
});