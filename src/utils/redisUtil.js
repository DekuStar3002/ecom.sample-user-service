const redis = require('redis');

const redisClient = redis.createClient();

redisClient.on("error", (error) => console.error(`Error : ${error}`));

const setToRedisStore = async (id, typeOfUser, token) => {
  redisClient.connect();
  await redisClient.set(`token@${typeOfUser}#${id}`, token);
  redisClient.disconnect();
};

const getFromRedisStore = async (id, typeOfUser) => {
  redisClient.connect();
  const token = await redisClient.get(`token@${typeOfUser}#${id}`);
  redisClient.disconnect();
  return token;
};

module.exports = { setToRedisStore, getFromRedisStore };