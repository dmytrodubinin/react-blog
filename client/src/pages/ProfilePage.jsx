import { useContext, useState } from 'react';
import { Context } from '../context/Context';
import axios from 'axios';
import { FaInfoCircle, FaUserCircle } from 'react-icons/fa';

const ProfilePage = () => {
  const { user, dispatch } = useContext(Context);

  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [success, setSuccess] = useState(false);
  const PF = 'http://localhost:5000/images/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_START' });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      updatedUser.profilePic = filename;
      try {
        await axios.post('/api/upload', data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.put('/api/users/' + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'UPDATE_FAILURE' });
    }
  };
  return (
    <section className="w-full">
      <div className="my-4 flex justify-between">
        <h1 className="text-3xl">Update Your Account</h1>
        <span className="btn btn-error btn-sm">Delete Account</span>
      </div>
      <form className="w-full max-w-96" onSubmit={handleSubmit}>
        <label>Profile Picture</label>
        <div className="flex items-end gap-5">
          <img
            src={file ? URL.createObjectURL(file) : PF + user.profilePic}
            alt=""
            className="h-24 w-24 rounded-full object-cover"
          />
          <label htmlFor="fileInput">
            <FaUserCircle className="h-5 w-5 cursor-pointer" />
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <label className="input input-bordered flex items-center gap-2">
          Username:
          <input
            type="text"
            className="grow"
            placeholder={user.username}
            defaultValue={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Email:
          <input
            type="email"
            className="grow"
            placeholder={user.email}
            defaultValue={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Password:
          <input
            type="password"
            className="grow"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="btn btn-primary" type="submit">
          Update
        </button>
        {success && (
          <div role="alert" className="alert alert-info">
            <FaInfoCircle className="h-6 w-6" />
            <span className="text-lg">Profile has been updated...</span>
          </div>
        )}
      </form>
    </section>
  );
};

export default ProfilePage;
