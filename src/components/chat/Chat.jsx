import React, { useEffect, useState, useRef } from 'react'
import './chat.css'
import EmojiPicker from 'emoji-picker-react'
import { collection, getDoc, query, serverTimestamp, setDoc, where, doc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/firebase';
import { useChatStore } from '../../firebase/chatStore';

function Chat() {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState();
  const [text, setText] = useState("");

  
  const { chatId } = useChatStore();
  const endRef = useRef(null)
  useEffect(() => {
    endRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [])
  const handleEmoji = e => {
    setText(prev => prev + e.emoji);
    setOpen(false);
  }

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats",chatId), (res) => {
      setChat(res.data())
    })

    return () => {
      unSub();
    };
  }, [chatId]);

  console.log(chat);
  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Jane Doe</span>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>

      <div className="center">
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio facilis sequi quaerat maiores ex sed porro est odio natus et nesciunt vel velit nihil commodi deleniti in, culpa, eaque illum.</p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message own">
          {/* <img src="./avatar.png" alt="" /> */}
          <div className="texts">
            <img src="./avatar.png" alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio facilis sequi quaerat maiores ex sed porro est odio natus et nesciunt vel velit nihil commodi deleniti in, culpa, eaque illum.</p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio facilis sequi quaerat maiores ex sed porro est odio natus et nesciunt vel velit nihil commodi deleniti in, culpa, eaque illum.</p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message own">
          {/* <img src="./avatar.png" alt="" /> */}
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio facilis sequi quaerat maiores ex sed porro est odio natus et nesciunt vel velit nihil commodi deleniti in, culpa, eaque illum.</p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio facilis sequi quaerat maiores ex sed porro est odio natus et nesciunt vel velit nihil commodi deleniti in, culpa, eaque illum.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>

      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input type="text" placeholder="Type a message..."
          value={text} onChange={e => setText(e.target.value)} />
        <div className="emoji">
          <img src="./emoji.png" alt="" onClick={() => {
            setOpen(prev => !prev)
          }} />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className='sendButton'>
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat