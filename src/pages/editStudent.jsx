import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstanse from '../api/axios'; // Ensure the import path matches your project's structure

const EditStudent = () => {
  const [student, setStudent] = useState({
    id: "",
    firstName: "",
    middleName: "",
    lastName: "",
    age: "",
    nic: "",
    tel: "",
  });
  
  const { id } = useParams(); // Get the student id from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axiosInstanse.get(`/student-management-service/students/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
    
    if (id) {
      fetchStudent();
    }
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedAge = student.age ? parseInt(student.age, 10) : null;

    if (isNaN(formattedAge) && student.age !== "") {
      alert("Please enter a valid age.");
      return;
    }

    try {
      await axiosInstanse.put(`/student-management-service/students/${id}`, {
        firstName: student.firstName || '',
        middleName: student.middleName || '',
        lastName: student.lastName || '',
        age: formattedAge,
        nic: student.nic || '',
        tel: student.tel || '',
      });

      alert("Student data updated successfully!");
      navigate('/');
    } catch (error) {
      alert("There was an error updating the student data.");
      console.error('There was an error!', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
          Update Student
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
              Update Student
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

export default EditStudent;
