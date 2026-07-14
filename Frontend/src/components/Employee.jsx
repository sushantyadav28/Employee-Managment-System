import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} from "../services/api";

const Employee = () => {
  const [employee, setEmployee] = useState({
    employeeName: "",
    email: "",
    mobileNumber: "",
    employeeId: "",
    designation: "",
    age: "",
  });
  const [employeeList, setEmployeeList] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployeeList(response.data.employees);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async () => {
    try {
      if (editId) {
        const response = await updateEmployee(editId, employee);
        alert(response.data.message);
      } else {
        const response = await createEmployee(employee);
        alert(response.data.message);
      }
      setEmployee({
        employeeName: "",
        email: "",
        mobileNumber: "",
        employeeId: "",
        designation: "",
        age: "",
      });
      setEditId(null);
      fetchEmployees();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleEdit = (emp) => {
    setEmployee({
      employeeName: emp.employeeName,
      email: emp.email,
      mobileNumber: emp.mobileNumber,
      employeeId: emp.employeeId,
      designation: emp.designation,
      age: emp.age,
    });
    setEditId(emp._id);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?",
    );
    if (!confirmDelete) return;
    try {
      const response = await deleteEmployee(id);
      alert(response.data.message);
      fetchEmployees();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };
  return (
    <div className="container">
      {/* Form */}
      <div className="form-container">
        <input
          type="text"
          name="employeeName"
          placeholder="Employee Name"
          value={employee.employeeName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={employee.mobileNumber}
          onChange={handleChange}
        />
        <input
          type="text"
          name="employeeId"
          placeholder="Employee ID"
          value={employee.employeeId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={employee.designation}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={employee.age}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>
          {editId ? "Update Employee" : "Add Employee"}
        </button>
      </div>

      {/* Table */}
      <div className="table-container">
        <h2>Employee List</h2>

        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Employee ID</th>
              <th>Designation</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeeList.length > 0 ? (
              employeeList.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.employeeName}</td>
                  <td>{emp.email}</td>
                  <td>{emp.mobileNumber}</td>
                  <td>{emp.employeeId}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.age}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(emp)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(emp._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No Employees Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
