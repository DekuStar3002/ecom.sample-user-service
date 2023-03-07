const { adminService } = require('../services');

const createAdmin = async (req, res) => { 
  try {
    const newUser = await adminService.createAdmin({ ...req.body });
    res.status(201).json({
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message
    });
  }
}

const loginAdmin = async (req, res) => {
  try {
    const token = await adminService.loginAdmin({ ...req.body });
    res.status(200).json({
      data: token
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

const validateAdmin = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userData = await adminService.validateAdmin(token);
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

module.exports = { createAdmin, loginAdmin, validateAdmin };