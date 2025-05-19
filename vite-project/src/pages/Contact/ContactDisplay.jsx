

import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactDisplay = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch('http://localhost:8000/contact/allcontact');
      if (!response.ok) throw new Error('Failed to fetch enquiries');

      const data = await response.json();
      const enquiriesArray = Array.isArray(data) ? data : data.data || [];
      setEnquiries(enquiriesArray);
      toast.success('Contact loaded successfully');
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error('Error fetching contact: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this contact?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8000/contact/alldelete/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete contact');

      setEnquiries(prev => prev.filter(enquiry => enquiry._id !== id));
      toast.success('Enquiry deleted successfully');
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error('Error deleting enquiry: ' + err.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const columns = [
    { name: 'Name', selector: row => row.name || '-', sortable: true },
    { name: 'Email', selector: row => row.email || '-', sortable: true },
    { name: 'Phone', selector: row => row.phone || '-' },
    { name: 'Message', selector: row => row.message|| '-' },
   
 
    {
      name: 'Actions',
      cell: (row) => (
        <button
          onClick={() => handleDelete(row._id)}
          className="text-red-500 hover:text-red-700"
          title="Delete"
        >
          <FaTrash />
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const filteredEnquiries = enquiries.filter(item =>
    [item.name, item.email, item.subject, item.productName]
      .some(field => field?.toLowerCase().includes(filterText.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-gray-700">Loading contact...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Name, Email, Subject or Product..."
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200"
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
          />
        </div>

        <DataTable
          columns={columns}
          data={filteredEnquiries}
          keyField="_id"
          pagination
          highlightOnHover
          striped
          responsive
          noDataComponent="No contact found."
        />
      </div>
    </div>
  );
};

export default ContactDisplay;
