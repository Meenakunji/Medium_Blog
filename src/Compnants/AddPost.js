/* eslint-disable jsx-a11y/role-supports-aria-props */
import React, {useEffect, useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useLocation } from 'react-router-dom'
import "./addPost.css"
const AddPost = () => {
    const loginUsers = JSON.parse(window.localStorage.getItem('loginUsers')) || {};
    const [formData, setFormData] = useState({ title: '', body: '', imageLink:'', author: loginUsers.email, tags:'' })
    const navigate = useNavigate();
    const {state={}} = useLocation();
    const handleChange = (e) => {
        setFormData(p => {
          return { ...p, [e.target.name]: e.target.value }
        })
      }
    const handleCreate = ()=>{
        const postList = window.localStorage.getItem('postList');
        const newPostId = uuidv4();
        const newPostList = {...(JSON.parse(postList) ||{}), [newPostId]: {...formData, dateModified: new Date(), id: newPostId}}
        window.localStorage.setItem('postList', JSON.stringify(newPostList));
        navigate('/');
        window.location.reload();
    }

    useEffect(()=>{
        if(state && state.type === 'edit'){
            setFormData(state.data)
        }
    }, [])
  return (
    <div className="addPost">
      <div className="addPost__container">
        <h2 className='addPost_create'>Add a New Post</h2>
        <div className='addPost__label'><h3>Title</h3></div>
        <input type="text"  name='title' value={formData.title} onChange={handleChange} />
        <div className='addPost__label'><h3>Body</h3></div>
        <textarea type='textarea' row = "3" className='inputTextArea'  name='body' value={formData.body} onChange={handleChange} />
        <div className='addPost__label'><h3>Tags</h3></div>
        <input type="text"  name='tags' value={formData.tags} onChange={handleChange} />
        <div className='addPost__label'><h3> imageLink</h3></div>
        <input type="text"  name='imageLink' value={formData.imageLink} onChange={handleChange} />
        <button onClick={handleCreate}>{state && state.type === 'edit' ? 'Modify Post' : 'Add Post'}</button>

      </div>
    </div>
  )
}

export default AddPost;