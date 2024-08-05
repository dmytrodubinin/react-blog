import { useContext, useState } from 'react';
import { Context } from '../context/Context';
import axios from 'axios';
import { FaPlusCircle } from 'react-icons/fa';

const WritePage = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      newPost.photo = filename;
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
            <FaPlusCircle className="h-5 w-5" />
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
            className="w-full text-2xl"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="w-full">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="w-full"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="btn btn-primary" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default WritePage;
