import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axios";

function StudentTable() {
  const [students, setStudents] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axiosInstance.get(
          "/student-management-service/students"
        );
        setStudents(response.data);
      } catch (error) {
        console.error("There was an error fetching the students!", error);
      }
    };

    fetchStudents();
  }, []);

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
      closeDeleteModal();
    } catch (error) {
      console.error("There was an error deleting the student!", error);
    }
  };

  return (
    <>
      <div className="mt-[5px] text-[50px]">Student Management System</div>

      <button className="mt-[10px] mb-[20px] ml-[1100px] border px-4 py-2 border-neutral-500 hover:bg-neutral-300">
        <Link to="/addStudent"> Add Student </Link>
      </button>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 w-full pl-[100px]">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">ID</th>
                    <th scope="col" className="px-6 py-4">NAME</th>
                    <th scope="col" className="px-6 py-4">AGE</th>
                    <th scope="col" className="px-6 py-4">NIC</th>
                    <th scope="col" className="px-6 py-4">PHONE</th>
                    <th scope="col" className="px-6 py-4">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
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
                        <button className="px-6 py-4 mt-[12px] mr-[10px] pt-[2px] pb-[2px] bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ">
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
