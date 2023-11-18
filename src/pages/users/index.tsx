import { store } from '@/contexts/store';
import { setError } from '@/features/error/errorSlice';
import { useRouter } from 'next/router';
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

  const idList = allUsers.map((user) => user.id);
  const fetchUserOne = async () =>
    fetch(`https://jsonplaceholder.typicode.com/users/${idList[0]}`)
      .then((res) => {
        store.dispatch(setError('エラー発生テスト'));
        return res.json();
      })
      .catch((e) => {
        console.log(e);
        store.dispatch(setError('エラー発生'));
      });
  const resUserOne = await fetchUserOne();
  /** propsにエラー情報を含めるバージョン */
  // const error = store.getState().error.value;

  return {
    /** propsにエラー情報を含めるバージョン */
    // props: { error, resUserOne },
    props: { resUserOne },
  };
};

export default function Users({ error, resUserOne }: { error: string; resUserOne: User }) {
  const router = useRouter();
  const [text, setText] = useState('');
  const err = store.getState().error.value;

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
      <div>{error || err}</div>
      <p>{resUserOne.id}</p>
      <p>{text}</p>
      <button onClick={handle1}>handle1</button>
      <button onClick={handle2}>handle2</button>
      <button onClick={handle3}>handle3</button>
      <button onClick={() => router.push('/')}>back home</button>
    </div>
  );
}
