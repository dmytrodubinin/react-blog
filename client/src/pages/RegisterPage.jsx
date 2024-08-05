import axios from 'axios';
import { useState } from 'react';
import { MdWarningAmber } from 'react-icons/md';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post('/api/auth/register', {
        username,
        email,
        password,
      });
      res.data && window.location.replace('/login');
    } catch (err) {
      setError(true);
    }
  };

  return (
    <section className="grid h-screen place-items-center">
      <form
        onSubmit={handleSubmit}
        className="card flex w-96 flex-col gap-y-4 bg-base-100 p-8 shadow-lg"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <input
          type="text"
          name="username"
          className="input input-bordered"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          name="email"
          className="input input-bordered"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          className="input input-bordered"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-secondary btn-block">
          Register
        </button>
        <p className="text-center">
          Already a member?{' '}
          <Link
            to="/login"
            className="link-hover link link-primary ml-2 capitalize"
          >
            Login
          </Link>
        </p>
        {error && (
          <div role="alert" className="alert alert-error">
            <MdWarningAmber className="text-xl" />
            <span>Something went wrong!</span>
          </div>
        )}
      </form>
    </section>
  );
};

export default RegisterPage;
