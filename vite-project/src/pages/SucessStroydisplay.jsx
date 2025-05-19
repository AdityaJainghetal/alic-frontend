import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';

const SuccessStoryDisplay = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = 'http://localhost:8000/success/display';

  const deleteStory = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this success story?');
    if (!confirmDelete) return;

    const deleteApi = `http://localhost:8000/success/${id}`;

    try {
      await axios.delete(deleteApi);
      toast.success('Success story deleted successfully');
      setStories(prev => prev.filter(story => story._id !== id));
    } catch (error) {
      toast.error('Error deleting success story');
      console.error('Error deleting success story:', error);
    }
  };

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(api);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setStories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const columns = [
    {
      name: 'Student Name',
      selector: row => row.StudentName,
      sortable: true,
    },
    {
      name: 'Judicial',
      selector: row => row.Judicial,
      sortable: true,
    },
    {
      name: 'Images',
      cell: row => (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {row.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${row.StudentName}-${i}`}
              style={{
                width: '60px',
                height: '60px',
                objectFit: 'cover',
                margin: '3px',
                borderRadius: '4px'
              }}
            />
          ))}
        </div>
      ),
    },
    {
      name: 'Actions',
      cell: row => (
        <button
          onClick={() => deleteStory(row._id)}
          style={{
            padding: '6px 10px',
            backgroundColor: '#e74c3c',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Delete
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Success Stories</h1>
      <DataTable
        columns={columns}
        data={stories}
        pagination
        highlightOnHover
        striped
        responsive
        persistTableHead
      />
    </div>
  );
};

export default SuccessStoryDisplay;
