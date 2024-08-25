import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstanse from '../api/axios';

const NewStudentForm = () => {
  const [student, setStudent] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    age: "",
    nic: "",
    tel: "",
  });

  const [showSuccess, setShowSuccess] = useState(false); 

  const navigate = useNavigate();

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstanse.post('/student-management-service/students', {
        firstName: student.firstName,
        middleName: student.middleName,
        lastName: student.lastName,
        age: parseInt(student.age, 10),
        nic: student.nic,
        tel: student.tel,
      });

      setShowSuccess(true); 

      setStudent({
        firstName: "",
        middleName: "",
        lastName: "",
        age: "",
        nic: "",
        tel: "",
      });

      setTimeout(() => {
        navigate('/'); 
      }, 1000);

    } catch (error) {
      alert("There was an error submitting the student data.");
      console.error('There was an error!', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {showSuccess && (
        <div className="absolute top-10  bg-[#0ea5e9] text-white py-2 px-4 rounded shadow-lg">
          Successfully added student! Redirecting...
        </div>
      )}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
          Add New Student
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center">
            <label className="block text-left text-gray-600 font-medium w-1/3">First Name</label>
            <input
              type="text"
              name="firstName"
              value={student.firstName}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Student First Name"
            />
          </div>

          <div className="mb-4 flex items-center">
            <label className="block text-left text-gray-600 font-medium w-1/3">Middle Name</label>
            <input
              type="text"
              name="middleName"
              value={student.middleName}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Student Middle Name"
            />
          </div>

          <div className="mb-4 flex items-center">
            <label className="block text-left text-gray-600 font-medium w-1/3">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={student.lastName}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Student Last Name"
            />
          </div>

          <div className="mb-4 flex items-center">
            <label className="block text-left text-gray-600 font-medium w-1/3">Age</label>
            <input
              type="number"
              name="age"
              value={student.age}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Student Age"
            />
          </div>

          <div className="mb-4 flex items-center">
            <label className="block text-left text-gray-600 font-medium w-1/3">NIC</label>
            <input
              type="text"
              name="nic"
              value={student.nic}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Student NIC"
            />
          </div>

          <div className="mb-6 flex items-center">
            <label className="block text-left text-gray-600 font-medium w-1/3">Phone</label>
            <input
              type="text"
              name="tel"
              value={student.tel}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter Student Phone Number"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2"
            >
              Create Student
            </button>
            <button
              type="button"
              className="w-1/2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 ml-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewStudentForm;
