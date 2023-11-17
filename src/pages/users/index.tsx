import { errorSlice, store } from '../_app';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
  };
};

export const getServerSideProps = async () => {
  const resAllUsers = await fetch('https://jsonplaceholder.typicode.com/users/');
  const allUsers = resAllUsers.json() as unknown as User[];
  const { setError } = errorSlice.actions;

  const idList = allUsers.map((user) => user.id);
  const fetchUserOne = async () =>
    fetch(`https://jsonplaceholder.typicode.com/users/${idList[0]}`)
      .then((res) => res.json())
      .catch((e) => {
        console.log(e);
        store.dispatch(setError(e));
      });
  const resUserOne = await fetchUserOne();

  return {
    props: { resUserOne },
  };
};

export default function Users({ resUserOne }: { resUserOne: User }) {
  return (
    <div>
      <h1>Users</h1>
      <p>{resUserOne.id}</p>
    </div>
  );
}
