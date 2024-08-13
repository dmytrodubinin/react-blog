import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const SettingsPage = () => {
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(`/api/categories`);
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const handleInputChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/categories', { name: newCategory });
      setCategories([...categories, res.data]);
      setNewCategory('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      setCategories(categories.filter((category) => category._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category._id);
    setEditingCategoryName(category.name);
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/categories/${editingCategory}`, {
        name: editingCategoryName,
      });
      setCategories(
        categories.map((category) =>
          category._id === editingCategory ? res.data : category,
        ),
      );
      setEditingCategory(null);
      setEditingCategoryName('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="mb-4 text-4xl">Settings</h1>
      <div>
        <h2 className="mb-4 text-2xl">Categories</h2>
        <div className="flex flex-wrap gap-8">
          <form
            className="w-full max-w-lg"
            onSubmit={
              editingCategory ? handleUpdateCategory : handleAddCategory
            }
          >
            <div className="flex gap-2">
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                placeholder="Add or edit category"
                value={editingCategory ? editingCategoryName : newCategory}
                onChange={(e) =>
                  editingCategory
                    ? setEditingCategoryName(e.target.value)
                    : handleInputChange(e)
                }
              />
              <div className="flex gap-2">
                <button className="btn btn-primary" type="submit">
                  {editingCategory ? 'Update' : 'Add'}
                </button>
                {editingCategory && (
                  <button
                    className="btn btn-error"
                    type="button"
                    onClick={() => {
                      setEditingCategory(null);
                      setEditingCategoryName('');
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
          <div className="w-full overflow-x-auto">
            <table className="table table-zebra table-xs">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td className="text-lg font-bold">{category.name}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEditCategory(category)}
                      >
                        <FaEdit />
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-error"
                        onClick={() => handleDeleteCategory(category._id)}
                      >
                        <MdDelete />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
