const Employee = require("../models/employeeModel");

// Create a new employee
const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create employee",
      error: error.message,
    });
  }
};

//Get All Employess
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch Employees",
      error: error.message,
    });
  }
};

//Update Employee
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update Employee",
      error: error.message,
    });
  }
};

//Delete Employee
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete Employee",
      error: error.message,
    });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
};
