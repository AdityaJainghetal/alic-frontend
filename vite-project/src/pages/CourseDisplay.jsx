import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseDisplay = () => {
  const [courses, setCourses] = useState([]);
  const [filterText, setFilterText] = useState('');

  const api = 'http://localhost:8000/api/allcourse';

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(api);
        setCourses(response.data);
      } catch (error) {
        toast.error('Error fetching course data');
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourses();
  }, []);

  const delcourse = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this course?');
    if (!confirmDelete) return;

    const deleteApi = `http://localhost:8000/api/coursedelte/${id}`;

    try {
      await axios.delete(deleteApi);
      toast.success('Course deleted successfully');
      setCourses(prev => prev.filter(course => course._id !== id));
    } catch (error) {
      toast.error('Error deleting course');
      console.log('Error deleting course:', error);
    }
  };

  const columns = [
    {
      name: 'Course Image',
      cell: row => (
        <img
          src={Array.isArray(row.images) ? row.images[0] : row.images}
          alt={row.Coursename}
          className="h-12 w-12 object-cover rounded"
        />
      ),
    },
    {
      name: 'Course Name',
      selector: row => row.Coursename,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Instructor',
      selector: row => row.Instructor,
      sortable: true,
    },
    {
      name: 'Price',
      selector: row => `₹${row.Price}`,
      sortable: true,
    },
    {
      name: 'Duration',
      selector: row => row.Durations,
    },
    {
      name: 'Language',
      selector: row => row.language,
    },
    {
      name: 'Certification',
      selector: row => row.Certification,
    },
    {
      name: 'Students',
      selector: row => row.TotalStudent,
    },
    {
      name: 'Last Date',
      selector: row =>
        row.LastDate ? new Date(row.LastDate).toLocaleDateString() : 'N/A',
    },
    {
      name: 'Actions',
      cell: row => (
        <button
          onClick={() => delcourse(row._id)}
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-1 px-3 rounded shadow transition duration-200"
        >
          Delete
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const filteredCourses = courses.filter(
    course =>
      course.Coursename?.toLowerCase().includes(filterText.toLowerCase()) ||
      course.Instructor?.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Course List
      </h1>

      <input
        type="text"
        placeholder="Search by Course Name or Instructor"
        className="mb-4 p-2 border border-gray-300 rounded-md w-full max-w-md mx-auto block"
        value={filterText}
        onChange={e => setFilterText(e.target.value)}
      />

      <DataTable
        columns={columns}
        data={filteredCourses}
        pagination
        highlightOnHover
        striped
        responsive
        dense
        customStyles={{
          rows: {
            style: {
              minHeight: '60px',
            },
          },
          headCells: {
            style: {
              fontWeight: 'bold',
              fontSize: '14px',
            },
          },
        }}
      />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CourseDisplay;
