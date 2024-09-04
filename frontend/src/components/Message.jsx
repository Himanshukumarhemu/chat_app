import React,{useRef,useEffect} from 'react'
import { useSelector } from 'react-redux';

const Message = ({message}) => {
  const scroll = useRef();
  const {authUser,selectedUser} =useSelector(store=>store.user);

  useEffect(()=>{
    scroll.current?.scrollIntoView({behaviour:"smooth"})
  },[message]);
  return (
    <div>
      <div ref={scroll} className={`chat ${authUser?._id===message?.senderId ? 'chat-end' : 'chat-start' }`}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src={message.senderId===authUser?._id? authUser?.profilephoto : selectedUser?.profilephoto} />
    </div>
  </div>
  <div className="chat-header ">
    <time className="text-xs opacity-50 text-white"></time>
  </div>
  <div className={`chat-bubble ${authUser?._id!==message?.senderId ? 'bg-cyan-500 text-white chat-end' : 'text-white chat-start' }`}>{message?.message}</div>
  
</div>
    </div>
  )
}

export default Message
