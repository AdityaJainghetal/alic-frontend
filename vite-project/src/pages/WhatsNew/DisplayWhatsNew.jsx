import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WhatsNewDisplay = () => {
  const [whatsNew, setWhatsNew] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    fetchWhatsNew();
  }, []);

  const fetchWhatsNew = async () => {
    try {
      const response = await fetch('http://localhost:8000/whatsnew/alldisplay');
      if (!response.ok) {
        throw new Error('Failed to fetch WhatsNew entries');
      }

      const data = await response.json();
      console.log('Fetched WhatsNew:', data);

      const whatsNewArray = Array.isArray(data.data) ? data.data : [];
      setWhatsNew(whatsNewArray);
      toast.success('WhatsNew entries loaded successfully');
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error('Error fetching WhatsNew entries: ' + err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this WhatsNew entry?');
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:8000/whatsnew/delete/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete WhatsNew entry');
      }

      setWhatsNew(prev => prev.filter(item => item._id !== id));
      toast.success('WhatsNew entry deleted successfully');
    } catch (err) {
      setError(err.message);
      toast.error('Error deleting WhatsNew entry: ' + err.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const columns = [
    {
      name: 'Title',
      selector: row => row.Coursename || row._id, // Use title if available, else _id
      sortable: true,
    },
    {
      name: 'Description',
      selector: row => row.CourseDescription ,
      sortable: true,
    },
    {
      name: 'Category',
      selector: row => row.category?.name || 'N/A',
      sortable: true,
    },
    {
      name: 'Images',
      selector: row => row.images,
      cell: row => (
        <div>
          {row.images ? (
            <a href={row.images} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              View Image
            </a>
          ) : (
            'None'
          )}
        </div>
      ),
    },
    {
      name: 'PDF Brochure',
      selector: row => row.PDFbrochure,
      cell: row => (
        <div>
          {row.PDFbrochure ? (
            <a href={row.PDFbrochure} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              View PDF
            </a>
          ) : (
            'None'
          )}
        </div>
      ),
    },
    {
      name: 'Created At',
      selector: row => row.createdAt,
      sortable: true,
      cell: row => <div>{formatDate(row.createdAt)}</div>,
    },
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

  const filteredWhatsNew = Array.isArray(whatsNew)
    ? whatsNew.filter(
        item =>
          (item.title?.toLowerCase().includes(filterText.toLowerCase()) || item._id.toLowerCase().includes(filterText.toLowerCase())) ||
          item.category?.name?.toLowerCase().includes(filterText.toLowerCase())
      )
    : [];

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-gray-700">Loading WhatsNew entries...</p>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">WhatsNew Entries</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Title or Category..."
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200"
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
          />
        </div>

        <DataTable
          columns={columns}
          data={filteredWhatsNew}
          pagination
          highlightOnHover
          striped
          responsive
          noDataComponent="No WhatsNew entries found."
        />
      </div>
    </div>
  );
};

export default WhatsNewDisplay;