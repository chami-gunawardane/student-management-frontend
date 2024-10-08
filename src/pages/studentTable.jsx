import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axios";

function StudentTable() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axiosInstance.get(
          "/student-management-service/students"
        );
        setStudents(response.data);
        setFilteredStudents(response.data);
      } catch (error) {
        console.error("There was an error fetching the students!", error);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const results = students.filter(
      (student) =>
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.nic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.age.toString().includes(searchTerm) ||
        student.tel.toString().includes(searchTerm) ||
        student.id.toString().includes(searchTerm)
    );
    setFilteredStudents(results);
  }, [searchTerm, students]);

  const openDeleteModal = (id) => {
    setStudentToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setStudentToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(
        `/student-management-service/students/${studentToDelete}`
      );
      setStudents(students.filter((student) => student.id !== studentToDelete));
      setShowSuccess(true);
      closeDeleteModal();

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("There was an error deleting the student!", error);
    }
  };

  return (
    <>
      <div className="mt-[5px] text-[50px]">Student Management System</div>

      <div className="flex justify-center items-center ml-[200px] mt-[10px] mb-[20px] pl-[100px] pr-[100px] w-[1100px]">
        <input
          type="text"
          placeholder="Search students..."
          className="border-2 border-blue-500 rounded px-4 py-2 w-full mr-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        <button className="border px-4 py--1  w-[150px] h-[47px] ml-[1160px] bg-blue-500 hover:bg-blue-600 text-white rounded">
          <Link to="/addStudent">Add Student</Link>
        </button>
      </div>

      {showSuccess && (
        <div className="fixed top-[150px] left-1/2 transform -translate-x-1/2 bg-[#0ea5e9] text-white py-2 px-4 rounded shadow-lg z-50">
          Student deleted successfully!
        </div>
      )}

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 w-full pl-[100px]">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-4">
                      NAME
                    </th>
                    <th scope="col" className="px-6 py-4">
                      AGE
                    </th>
                    <th scope="col" className="px-6 py-4">
                      NIC
                    </th>
                    <th scope="col" className="px-6 py-4">
                      PHONE
                    </th>
                    <th scope="col" className="px-6 py-4">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-300"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {student.id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {student.firstName}{" "}
                        {student.middleName ? student.middleName + " " : ""}
                        {student.lastName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {student.age}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {student.nic}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {student.tel}
                      </td>
                      <td>
                        <button className="px-6 py-4 mt-[12px] mr-[10px] pt-[2px] pb-[2px] bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ">
                          <Link to={`/editStudent/${student.id}`}>EDIT</Link>
                        </button>
                        <button
                          className="px-6 py-4 mt-[12px] pt-[2px] pb-[2px] border bg-red-500 hover:bg-red-600 text-white font-semibold rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                          onClick={() => openDeleteModal(student.id)}
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Delete Confirmation</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this record?
            </p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default StudentTable;
