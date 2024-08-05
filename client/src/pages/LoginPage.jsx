import axios from 'axios';
import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import { MdWarningAmber } from 'react-icons/md';

const LoginPage = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post('/api/auth/login', {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE' });
      setError(true);
    }
  };

  return (
    <section className="grid h-screen place-items-center">
      <form
        className="card flex w-96 flex-col gap-y-4 bg-base-100 p-8 shadow-lg"
        onSubmit={handleSubmit}
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <input
          type="text"
          name="username"
          className="input input-bordered"
          placeholder="Enter your username"
          ref={userRef}
        />
        <input
          type="password"
          name="password"
          className="input input-bordered"
          placeholder="Enter your password"
          ref={passwordRef}
        />
        <button
          type="submit"
          className="btn btn-secondary btn-block"
          disabled={isFetching}
        >
          Login
        </button>
        <p className="text-center">
          Not a member yet?{' '}
          <Link
            to="/register"
            className="link-hover link link-primary ml-2 capitalize"
          >
            register
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

export default LoginPage;
