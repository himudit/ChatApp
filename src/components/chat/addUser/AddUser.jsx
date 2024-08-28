import React, { useState } from 'react'
import './adduser.css'
import { collection, getDoc, query, serverTimestamp, setDoc, where, doc } from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import { getDocs } from 'firebase/firestore/lite';

function AddUser() {
  const [user, setUser] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const username = formData.get('username');

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats")
    const userChatRef = collection(db, "userchats")
    try {
      const newChatRef = doc(chatRef)
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      })

      console.log(newChatRef.id)
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder='Username' name='username' />
        <button>Search</button>
      </form>
      {user && <div className="user">
        <div className="detail">
          <img src="./avatar.png" alt="" />
          <span>{user.username}</span>
        </div>
        <button onClick={handleAdd}>Add User</button>
      </div>}
    </div>
  )
}

export default AddUser