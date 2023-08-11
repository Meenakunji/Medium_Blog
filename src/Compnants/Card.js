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
        <p className='para'>{item.author}</p>
        <p>{formatDateToSimpleDate(item.dateModified)}</p>
        </div>
        <div className="card-content">
          <div className='card-contentbox'>
            <h3>{item.title}</h3>
            <p className='card_body'>{item.body}</p>
          </div>
        
        <img src= {item.imageLink} alt='Not available '/>
        
        </div>
        <div className="card-footer">
        <p><span>Tags</span>: {item.tags} </p>
        <p><span>Reading time</span>: {item.reading_time}</p>
        <p><span>Save</span></p>
        {/* <p><span>Author</span>: {item.author}</p> */}
        <p><span>like</span>: {currentPostLikes.length}</p>
        </div>
        <div className="card-footer">
        {/* <p><span>Date</span>: {formatDateToSimpleDate(item.dateModified)}</p> */}
        
        </div>
        <div className="card-footer">
        {currentUser.email ? <button onClick={handleLike}>{currentPostLikes.includes(currentUser.email) ? 'Liked': 'Like'}</button>: null}
        {
          item.author && currentUser.email &&  item.author === currentUser.email ? <>
          <p onClick={handleEdit}><img src= {"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_I9caPBAuNr4GF81_FW4vFJHHP3TsTEsI-tylqrXBdw&s"} alt='Not available '/></p>
          <p onClick={handleDelete}><img src= {"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeXQg4iHSGd2nkOK7SFxFIZtDXNPxny7yNd_uFjlQ&s"} alt='Not available '/></p>
          </>: null
        }
        </div>
    </div>

 )
}