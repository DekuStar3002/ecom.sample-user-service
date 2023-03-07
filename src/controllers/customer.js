const { customerService } = require("../services");

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

module.exports = { createCustomer, loginCustomer };