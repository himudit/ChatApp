import React, { useEffect } from 'react';
import List from './list/List';
import Chat from './chat/Chat';
import Detail from './detail/Detail';
import { useUserStore } from '../firebase/userStore';
import Login from './Login';
import { onAuthStateChange } from '../firebase/auth';

function Home() {
  const { currentUser, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      if (user) {
        fetchUserInfo(user.uid); 
      } else {
        fetchUserInfo(null); 
      }
    });

    return () => unsubscribe();
  }, [fetchUserInfo]);

  console.log(currentUser);
  return (
    <div className='container'>
      {currentUser ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Home;
