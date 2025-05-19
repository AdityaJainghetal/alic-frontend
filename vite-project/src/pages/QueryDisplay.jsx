import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QueryDisplay = () => {
  const [courses, setCourses] = useState([]);
  const api = 'http://localhost:8000/query/display';

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(api);
        setCourses(response.data);
      } catch (error) {
        toast.error('Failed to fetch course data');
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourses();
  }, []);

  const delcourse = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this course?');
    if (!confirmDelete) return;

    const deleteApi = `http://localhost:8000/query/allquerydelete/${id}`;

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
    { name: 'Name', selector: row => row.Name, sortable: true },
    { name: 'Phone', selector: row => row.Phone },
    { name: 'State', selector: row => row.State },
    { name: 'Medium', selector: row => row.Medium },
    { name: 'Message', selector: row => row.message },
    {
      name: 'Actions',
      cell: row => (
        <button
          onClick={() => delcourse(row._id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Course Queries</h2>
      <DataTable
        columns={columns}
        data={courses}
        pagination
        highlightOnHover
        striped
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default QueryDisplay;
