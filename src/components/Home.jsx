import React from 'react'
import List from './list/List';
import Chat from './chat/Chat';
import Detail from './detail/Detail';
import { useUserStore } from './firebase/userStore';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import Login from './Login'

function Home() {

  const { currentUser, fetchUserInfo } = useUserStore()

  // useEffect(() => {

  //   return () => {
  //     second
  //   }
  // }, [third])


  return (
    <div className='container'>
      {currentUser ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>) : (
        <Login />
      )}

    </div>
  )
}

export default Home