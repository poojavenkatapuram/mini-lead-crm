const { createClient } = require('redis');

const client = createClient();

client.on('error', (err) => console.log('Redis Error', err));

const connectRedis = async () => {
  try {
    await client.connect();
    console.log(' Redis Connected');
  } catch (err) {
    console.log(' Redis not running (optional)');
  }
};

module.exports = { client, connectRedis };