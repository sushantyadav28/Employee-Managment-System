const express = require("express");
const {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const router = express.Router();

router.post("/createemployee", createEmployee);
router.get("/getallemployees", getAllEmployees);
router.put("/updateemployee/:id", updateEmployee);
router.delete("/deleteemployee/:id", deleteEmployee);

module.exports = router;
