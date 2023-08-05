import React from 'react'
import "./card.css";
import { useNavigate } from 'react-router-dom';

export default function Card({item, currentUser}) {
  const navigate = useNavigate();
  function formatDateToSimpleDate(ndate= new Date()) {
    const date = new Date(ndate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const postList =JSON.parse(window.localStorage.getItem('postList'));
  const currentPostLikes = postList[item.id].likes || [];
  const handleDelete = ()=>{
    const newPostList ={};
     Object.keys(postList).forEach((pid)=>{
      if(pid !== item.id){
        newPostList[pid] = postList[pid];
      }
    })
    window.localStorage.setItem('postList', JSON.stringify(newPostList))
    window.location.reload();
  }
  const handleEdit =()=>{
    navigate('/addPost',{state: { type: 'edit', data: item}} );
  }
  const handleLike=()=>{
    const currentPost = postList[item.id]
    

    let newLikes;
    if(currentPostLikes.includes(currentUser.email)){
       newLikes = currentPostLikes.filter(u=> u !== currentUser.email);
    }else{
      newLikes = [...currentPostLikes, currentUser.email];
    }
    currentPost.likes = newLikes;
    const newPostList = {...postList, [item.id]: currentPost};
    window.localStorage.setItem('postList', JSON.stringify(newPostList));
    window.location.reload();
  }
  return (
    <div className = "card">
        <div className="card-header">
        <p>{item.title}</p>
        </div>
        <div className="card-content">
        <p className='card_body'>{item.body}</p>
        <img src= {item.imageLink} alt='Not available '/>
        <p><span>Tags</span>: {item.tags} </p>
        </div>
        <div className="card-footer">
        <p><span>Author</span>: {item.author}</p>
        <p><span>like</span>: {currentPostLikes.length}</p>
        </div>
        <div className="card-footer">
        <p><span>Date</span>: {formatDateToSimpleDate(item.dateModified)}</p>
        <p><span>Reading time</span>: {item.reading_time}</p>
        </div>
        <div className="card-footer">
        {currentUser.email ? <button onClick={handleLike}>{currentPostLikes.includes(currentUser.email) ? 'Liked': 'Like'}</button>: null}
        {
          item.author && currentUser.email &&  item.author === currentUser.email ? <>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
          </>: null
        }
        </div>
    </div>
   
  )
}