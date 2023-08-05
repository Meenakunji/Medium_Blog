import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "./Card.js"

import "./card.css";

export default function Dashboard({data, setData }) {
  const isLoggedIn = window.localStorage.getItem('loginUsers'); 
  const currentUser = JSON.parse(isLoggedIn) || {};
  const navigate = useNavigate();
  const handleAddPost = () =>{
    navigate('/addPost');
  }

  const handleMyPost =(action)=>{
    const postList = JSON.parse(window.localStorage.getItem('postList')) || {};
    const postListArray = Object.keys(postList).map((postKey)=>{
      return postList[postKey];
    })
    let posts;
    if(action === 'myPost'){
      posts = postListArray.filter((post)=>{
        return post.author === currentUser.email
      })
    }else if (action === 'allPost'){
      posts = [...postListArray]
    }
     
    setData(posts);
  }
  const arr = data.map((item, index)=> (<Card  item = {item} currentUser={currentUser}/>));  
  return (<div>
    {isLoggedIn ? <div>
    <button onClick={()=>{handleMyPost('allPost')}}>All Post</button> 
    <button onClick={handleAddPost}>Add Post</button> 
    <button onClick={()=>{handleMyPost('myPost')}}>My Post</button> 
    </div>: null}
    
    <div className = "cardbox">{arr}</div>
  </div>);
}