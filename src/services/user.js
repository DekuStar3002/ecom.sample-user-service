const jwt = require('jsonwebtoken');
const { redisUtil } = require('../utils');
const { CustomError } = require('../utils');

const validateUser = async (token) => {
  const userData = await jwt.verify(token, process.env.JWT_SECRET);

  if(!userData) {
    throw new CustomError(400, 'Unauthorized User(token error)');
  }

  const redisToken = await redisUtil.getFromRedisStore(userData.id, userData.type);

  if(redisToken !== token) {
    throw new CustomError(400, 'Unauthorized User(token invalid)');
  }
  console.log(userData);
  return userData;
}

module.exports = validateUser;