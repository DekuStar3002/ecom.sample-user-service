const { User } = require('../../database/models');
const { passwordUtil, redisUtil } = require('../utils');
const jwt = require('jsonwebtoken');

const createCustomer = async ({ name, email, password }) => {
  const hashedPassword = await passwordUtil.hashPassword(password);
  return User.create({
    name,
    email,
    type: 'customer',
    password: hashedPassword,
  });
}

const loginCustomer = async ({ email, password }) => {
  const user = await User.findOne({ where: { email: email } });
  if(user) {
    const checkPassword = await passwordUtil.comparePassword(password, user.password);
    if(checkPassword) {
      const token = jwt.sign({ id: user.id, name: user.name, email: user.email, type: 'customer' }, process.env.JWT_SECRET);
      await redisUtil.setToRedisStore(user.id, 'customer', token);
      return { token: `Bearer ${token}` };
    } else {
      throw new Error('Wrong password entered');
    }
  } else {
    throw new Error(`No user found with email ${email}`);
  }
}

module.exports = { createCustomer, loginCustomer };