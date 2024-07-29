import { Sidebar } from '../components';

const PostPage = () => {
  return (
    <>
      <div className="container mx-auto flex max-w-screen-2xl flex-col justify-between gap-8 py-4 md:flex-row">
        <section className="w-full">
          <figure>
            <img
              className="h-56 w-full rounded-lg object-cover"
              src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="title"
            />
          </figure>
          <h1 className="my-4 text-3xl font-bold">Post Title</h1>
          <p>
            Author: <strong>Dmytro</strong>
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
            officia architecto deserunt deleniti? Labore ipsum aspernatur magnam
            fugiat, reprehenderit praesentium blanditiis quos cupiditate ratione
            atque, exercitationem quibusdam, reiciendis odio laboriosam?
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
            officia architecto deserunt deleniti? Labore ipsum aspernatur magnam
            fugiat, reprehenderit praesentium blanditiis quos cupiditate ratione
            atque, exercitationem quibusdam, reiciendis odio laboriosam?
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
            officia architecto deserunt deleniti? Labore ipsum aspernatur magnam
            fugiat, reprehenderit praesentium blanditiis quos cupiditate ratione
            atque, exercitationem quibusdam, reiciendis odio laboriosam?
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
            officia architecto deserunt deleniti? Labore ipsum aspernatur magnam
            fugiat, reprehenderit praesentium blanditiis quos cupiditate ratione
            atque, exercitationem quibusdam, reiciendis odio laboriosam?
          </p>
          <figure>
            <img
              className="h-56 w-full rounded-lg object-cover"
              src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="title"
            />
          </figure>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
            officia architecto deserunt deleniti? Labore ipsum aspernatur magnam
            fugiat, reprehenderit praesentium blanditiis quos cupiditate ratione
            atque, exercitationem quibusdam, reiciendis odio laboriosam?
          </p>
        </section>
        <Sidebar />
      </div>
    </>
  );
};

export default PostPage;
