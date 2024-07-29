import { Form, Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <section className="grid h-screen place-items-center">
      <Form
        method="post"
        className="card flex w-96 flex-col gap-y-4 bg-base-100 p-8 shadow-lg"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <input
          type="email"
          name="email"
          className="input input-bordered"
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          className="input input-bordered"
          placeholder="password"
        />
        {/* <div className="mt-4"> */}
        {/*   <button class="btn">submit</button> */}
        {/* </div> */}
        <button type="button" className="btn btn-secondary btn-block">
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
      </Form>
    </section>
  );
};

export default LoginPage;
