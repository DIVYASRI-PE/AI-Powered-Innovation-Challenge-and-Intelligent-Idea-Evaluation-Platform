import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import challengeService from '../../services/challengeService';
import Navbar from '../../components/Navbar/Navbar';

const ManageChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    rules: '',
    deadline: '',
    prizeDetails: '',
    status: 'DRAFT'
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadChallenges();
    loadCategories();
  }, []);

  const loadChallenges = async () => {
    try {
      const data = await challengeService.getAllChallenges();
      setChallenges(data);
    } catch (error) {
      console.error('Error loading challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await challengeService.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingChallenge) {
        await challengeService.updateChallenge(editingChallenge.id, formData);
      } else {
        await challengeService.createChallenge(formData);
      }
      setShowModal(false);
      setEditingChallenge(null);
      setFormData({
        title: '',
        description: '',
        categoryId: '',
        rules: '',
        deadline: '',
        prizeDetails: '',
        status: 'DRAFT'
      });
      loadChallenges();
    } catch (error) {
      console.error('Error saving challenge:', error);
      alert('Error saving challenge');
    }
  };

  const handleEdit = (challenge) => {
    setEditingChallenge(challenge);
    setFormData({
      title: challenge.title,
      description: challenge.description,
      categoryId: challenge.categoryId,
      rules: challenge.rules,
      deadline: challenge.deadline ? challenge.deadline.substring(0, 16) : '',
      prizeDetails: challenge.prizeDetails,
      status: challenge.status
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this challenge?')) {
      try {
        await challengeService.deleteChallenge(id);
        loadChallenges();
      } catch (error) {
        console.error('Error deleting challenge:', error);
        alert('Error deleting challenge');
      }
    }
  };

  const handlePublish = async (id) => {
    try {
      await challengeService.updateChallenge(id, { status: 'PUBLISHED' });
      loadChallenges();
    } catch (error) {
      console.error('Error publishing challenge:', error);
      alert('Error publishing challenge');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="flex justify-between items-center mb-6">
          <div>
            <button onClick={() => navigate('/admin/dashboard')} className="text-blue-600 hover:text-blue-800 mb-2 text-sm">← Back to Admin</button>
            <h1 className="text-3xl font-bold text-gray-800">Manage Challenges</h1>
          </div>
          <button
            onClick={() => {
              setEditingChallenge(null);
              setFormData({
                title: '',
                description: '',
                categoryId: '',
                rules: '',
                deadline: '',
                prizeDetails: '',
                status: 'DRAFT'
              });
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create Challenge
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deadline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {challenges.map((challenge) => (
                <tr key={challenge.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{challenge.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{challenge.categoryName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      challenge.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' :
                      challenge.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {challenge.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {challenge.deadline ? new Date(challenge.deadline).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(challenge)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    {challenge.status === 'DRAFT' && (
                      <button
                        onClick={() => handlePublish(challenge.id)}
                        className="text-green-600 hover:text-green-900 mr-4"
                      >
                        Publish
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(challenge.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingChallenge ? 'Edit Challenge' : 'Create Challenge'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                    <select
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Rules</label>
                    <textarea
                      name="rules"
                      value={formData.rules}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Deadline</label>
                    <input
                      type="datetime-local"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Prize Details</label>
                    <textarea
                      name="prizeDetails"
                      value={formData.prizeDetails}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="DRAFT">Draft</option>
                      <option value="PUBLISHED">Published</option>
                      <option value="CLOSED">Closed</option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      {editingChallenge ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageChallenges;
