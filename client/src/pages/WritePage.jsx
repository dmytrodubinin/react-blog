import axios from 'axios';
import { FaPlusCircle } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';
import { MultiSelect } from '../components';

const WritePage = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { user } = useContext(Context);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(`/api/categories`);
        setCategories(res.data.map((category) => category.name));
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories: selectedCategories,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      newPost.photo = filename;
      const webpFilename = filename.replace(/\.[^/.]+$/, '.webp');
      newPost.webpPhoto = webpFilename;

      try {
        await axios.post('/api/upload', data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post('/api/posts', newPost);
      window.location.replace('/post/' + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-4 w-full">
      {file && (
        <img
          className="max-h-96 w-full object-cover"
          src={URL.createObjectURL(file)}
          alt=""
        />
      )}
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mb-4 flex w-full items-center gap-2 py-2">
          <label htmlFor="fileInput">
            <FaPlusCircle className="h-5 w-5 cursor-pointer" />
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full text-2xl"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Categories</span>
            </div>
            <MultiSelect
              options={categories}
              selectedOptions={selectedCategories}
              setSelectedOptions={setSelectedCategories}
            />
          </label>
        </div>
        <div className="w-full">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="textarea textarea-bordered w-full"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="btn btn-primary mt-4" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default WritePage;
