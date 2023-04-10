
import {spawn} from 'child_process';



  const wc1 = spawn('wc', ['-l', 'helloworld.txt']);

  let wcOutput1 = '';
  wc1.stdout.on('data', (piece) => wcOutput1 += piece);

  wc1.on('close', () => {
    console.log(`File helloworld.txt has ${wcOutput1[0]} lines`);
  });

  
  const cat = spawn('cat', ['helloworld.txt']);
  const wc = spawn('wc', ['-l']);
  
  cat.stdout.pipe(wc.stdin);
  
  let wcOutput = '';
  wc.stdout.on('data', (piece) => {
    wcOutput += piece;
  });
  
  wc.on('close', () => {
    process.stdout.write(wcOutput);
  });