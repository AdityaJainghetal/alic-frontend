import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User } from 'react-feather';
import DataTable from 'react-data-table-component';

const BlogDisplay = ({ tableView = false }) => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (tableView) {
          const response = await axios.get('http://localhost:8000/blog/display');
          setBlogs(response.data);
        } else {
          const response = await axios.get(`http://localhost:8000/blog/display`);
          setBlog(response.data);
        }
      } catch (err) {
        setError('Failed to fetch blog data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, tableView]);

  const formatDate = (dateString) => {
    if (!dateString) return 'No date specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

//   const handleDelete = async (blogId) => {
//     try {
//       await axios.delete(`http://localhost:8000/blog/${blogId}`);
//       setBlogs(blogs.filter((b) => b._id !== blogId));
//     } catch (err) {
//       console.error('Delete failed:', err);
//     }
//   };

  // DataTable columns
  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
      cell: row => <Link to={`/blog/${row._id}`} className="text-blue-600 hover:underline">{row.title}</Link>
    },
    {
      name: 'Author',
      selector: row => row.author,
      sortable: true
    },
    {
      name: 'Date',
      selector: row => row.LastDate,
      format: row => formatDate(row.LastDate),
      sortable: true
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex space-x-3">
          <Link to={`/blog/${row._id}`} className="text-blue-600 hover:underline">View</Link>
          <button
            className="text-red-600 hover:underline"
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  if (tableView) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <Link to="/blog/new" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add New Blog
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={blogs}
          pagination
          highlightOnHover
          striped
          responsive
        />
      </div>
    );
  }

  if (!blog) return <div className="text-center py-8">Blog post not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        {blog.images && blog.images.length > 0 && (
          <div className="h-64 md:h-96 overflow-hidden">
            <img
              src={blog.images[0]}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center">
              <User className="mr-2" size={16} />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2" size={16} />
              <span>{formatDate(blog.LastDate)}</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="text-lg text-gray-700 mb-6 italic">{blog.excerpt}</p>
          )}

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.Blog }}
          />
        </div>
      </article>
    </div>
  );
};

export default BlogDisplay;
