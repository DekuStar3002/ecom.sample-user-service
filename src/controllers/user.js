const { userService } = require('../services');

const validateUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userData = await userService(token);
    console.log(userData);
    res.status(200).json({
      data: userData
    });
  } catch (error) {
    if(error instanceof CustomError){
      res.status(error.status).json({
        error: error.message
      });
      return;
    }
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = { validateUser };