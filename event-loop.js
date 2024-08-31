import fs from 'fs';
import crypto from 'crypto';

const start = Date.now(); // curent date in milliseconds
process.env.UV_THREADPOOL_SIZE = 1; // the default threadpool size of libuv is 4. we are limiting it to 1 thread only

function convertToHumanReadableTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const readableHours = hours % 24;
  const readableMinutes = minutes % 60;
  const readableSeconds = seconds % 60;
  const readableMilliSeconds = ms % 1000; // Corrected to show only the remaining milliseconds

  return `TIME ELAPSED: ${readableHours}hr ${readableMinutes}min ${readableSeconds}sec ${readableMilliSeconds}ms //`;
}

setTimeout(
  () =>
    console.log(
      convertToHumanReadableTime(Date.now() - start),
      '1st setTimeout()'
    ),
  0
); // 3
setImmediate(() =>
  console.log(
    convertToHumanReadableTime(Date.now() - start),
    '1st setImmediate()'
  )
); // 2

// node event
fs.readFile('./test-file.txt', 'utf8', () => {
  console.log(convertToHumanReadableTime(Date.now() - start), ' I/O finished ');
  console.log('-------------------------');

  setTimeout(() => console.log('2nd setTimeout()'), 0);
  setTimeout(() =>
    console.log(
      convertToHumanReadableTime(Date.now() - start, '2nd setTimeout()'),
      3000
    )
  );
  setImmediate(() =>
    console.log(
      convertToHumanReadableTime(Date.now() - start),
      'setImmediate() ii'
    )
  ); // 2

  process.nextTick(() =>
    console.log(
      convertToHumanReadableTime(Date.now() - start),
      'Process.nextTick() '
    )
  );

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
  //                           async version                       //
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
  // crypto.pbkdf2('password', 'salat', 100000, 1024, 'sha512', () =>
  //   console.log(
  //     convertToHumanReadableTime(Date.now() - start),
  //     'password: encrypted'
  //   )
  // );
  // crypto.pbkdf2('password', 'salat', 100000, 1024, 'sha512', () =>
  //   console.log(
  //     convertToHumanReadableTime(Date.now() - start),
  //     'password: encrypted'
  //   )
  // );
  // crypto.pbkdf2('password', 'salat', 100000, 1024, 'sha512', () =>
  //   console.log(
  //     convertToHumanReadableTime(Date.now() - start),
  //     'password: encrypted'
  //   )
  // );
  // crypto.pbkdf2('password', 'salat', 100000, 1024, 'sha512', () =>
  //   console.log(
  //     convertToHumanReadableTime(Date.now() - start),
  //     'password: encrypted'
  //   )
  // );

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
  //                           sync version                        //
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
  crypto.pbkdf2Sync('password', 'salat', 100000, 1024, 'sha512');
  console.log(
    convertToHumanReadableTime(Date.now() - start),
    'password: encrypted'
  );
  crypto.pbkdf2Sync('password', 'salat', 100000, 1024, 'sha512');
  console.log(
    convertToHumanReadableTime(Date.now() - start),
    'password: encrypted'
  );
  crypto.pbkdf2Sync('password', 'salat', 100000, 1024, 'sha512');
  console.log(
    convertToHumanReadableTime(Date.now() - start),
    'password: encrypted'
  );
  crypto.pbkdf2Sync('password', 'salat', 100000, 1024, 'sha512');
  console.log(
    convertToHumanReadableTime(Date.now() - start),
    'password: encrypted'
  );
}); // 4

console.log(
  convertToHumanReadableTime(Date.now() - start),
  'Hello from top-level code'
); // 1

// human readable time: https://chatgpt.com/share/bf1bc2ca-2628-492b-99fe-fcf1e0c6d137
