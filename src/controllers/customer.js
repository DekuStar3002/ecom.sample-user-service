const { customerService } = require("../services");
const { CustomError } = require("../utils");

const createCustomer = async (req, res) => { 
  try {
    const newUser = await customerService.createCustomer({ ...req.body });
    res.status(201).json({
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const loginCustomer = async (req, res) => {
  try {
    const token = await customerService.loginCustomer({ ...req.body });
    res.status(200).json({
      data: token
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const validateCustomer = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userData = await customerService.validateCustomer(token);
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
}

module.exports = { createCustomer, loginCustomer, validateCustomer };