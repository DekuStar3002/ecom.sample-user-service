const { User } = require('../../database/models');
const { passwordUtil, redisUtil, CustomError } = require('../utils');
const jwt = require('jsonwebtoken');

const createAdmin = async ({ name, email, password }) => {
  const hashedPassword = await passwordUtil.hashPassword(password);
  return User.create({
    name,
    email,
    type: 'admin',
    password: hashedPassword,
  });
};

const loginAdmin = async ({ email, password }) => {
  const user = await User.findOne({ where: { email: email } });
  if(user) {
    const checkPassword = await passwordUtil.comparePassword(password, user.password);
    if(checkPassword) {
      const token = jwt.sign({ id: user.id, name: user.name, email: user.email, type: 'admin' }, process.env.JWT_SECRET);
      await redisUtil.setToRedisStore(user.id, 'admin', token);
      return { token: `Bearer ${token}` };
    } else {
      throw new Error('Wrong password entered');
    }
  } else {
    throw new Error(`No user found with email ${email}`);
  }
};

const validateAdmin = async (token) => {
  const userData = await jwt.verify(token, process.env.JWT_SECRET);

  if(!userData) {
    throw new CustomError(400, 'Unauthorized User(token error)');
  }

  const redisToken = await redisUtil.getFromRedisStore(userData.id, userData.type);

  if(redisToken !== token) {
    throw new CustomError(400, 'Unauthorized User(token invalid)');
  }

  return userData;
}

module.exports = { createAdmin, loginAdmin, validateAdmin };