import { useRouter } from 'next/router';
import { errorSlice, store } from '../_app';
import { useState } from 'react';

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
  const allUsers = (await resAllUsers.json()) as unknown as User[];
  const { setError } = errorSlice.actions;

  const idList = allUsers.map((user) => user.id);
  const fetchUserOne = async () =>
    fetch(`https://jsonplaceholder.typicode.com/users/${idList[20]}`)
      .then((res) => {
        return res.json();
      })
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
  const router = useRouter();
  const [text, setText] = useState('');
  const error = store.getState().error.value;

  const handle1 = () => {
    setText('handle1');
  };
  const handle2 = () => {
    setText('handle2');
  };
  const handle3 = () => {
    setText('handle3');
  };

  return (
    <div>
      <h2>Users</h2>
      <div>{error}</div>
      <p>{resUserOne.id}</p>
      <p>{text}</p>
      <button onClick={handle1}>handle1</button>
      <button onClick={handle2}>handle2</button>
      <button onClick={handle3}>handle3</button>
      <button onClick={() => router.push('/')}>back home</button>
    </div>
  );
}
