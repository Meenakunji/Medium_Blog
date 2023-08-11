import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "./Navbar.css";

const Navbar = ({setData}) => {
  const [formData,setFormData] = useState({search: '', sortBy:''});
  const isLoggedIn = window.localStorage.getItem('loginUsers'); 
  const loginUser = JSON.parse(isLoggedIn) || {};
  const postList = JSON.parse(window.localStorage.getItem('postList')) || {};
  const postListArray = Object.keys(postList).map((postKey)=>{
      return postList[postKey];
    })


  const handleChange = (e) => {
    setFormData(p => {
      return { ...p, [e.target.name]: e.target.value }
    })
  }
  const handleLogout =()=>{
    window.localStorage.removeItem('loginUsers');
    window.location.reload();
  }
  const  handleSort= ()=>{
    setData(()=>{
      const newArray = [...postListArray]
      newArray.sort((a,b)=>{
        if (formData.sortBy === 'likes') {
          return b.likes.length - a.likes.length;
        }
        if (formData.sortBy === 'author') {
          return a.author.localeCompare(b.author);
        }
        return 0; 
      });
      return newArray;
    })

  }

  const handleSearch = ()=>{
    const searchValue = formData.search
    setData(()=>{
      const filterVAlue=  postListArray.filter((post)=> post.title.includes(searchValue) || post.author.includes(searchValue));
      return filterVAlue;
    })
  }
  return (
    <nav className="navbar">
       <Link to="/"> <div className="logo">
        <img src="https://cdn-icons-png.flaticon.com/512/3959/3959420.png" alt="Logo" />
      </div></Link>
     
      <div className="navbar-right">
        <ul>
          {
            isLoggedIn ? <span onClick={handleLogout}>Logout</span> : <><li><Link to="/signup">SignUp</Link></li>
            <li><Link to="/login">Login</Link></li></>
          }

          <li>
          <div className="filter-box">

              <select name='sortBy' value={formData.sortBy} onChange={handleChange}>
                <option value={'likes'}>
                  Likes
                </option>
                <option value={'author'}>
                  author
                </option>
              </select>
              <button onClick={handleSort}>Sort By</button>
            </div>
          </li>
          { isLoggedIn ? (<>
            <li>
            <div className="search-box">
              <input type="text" name = "search" placeholder="Search"  value = {formData.search} onChange={handleChange}/>
              <button onClick={handleSearch}>Search</button>
            </div>
          </li>
            <li><button><img src="https://png.pngitem.com/pimgs/s/146-1468281_profile-icon-png-transparent-profile-picture-icon-png.png" alt="Profile" /></button></li>
            <li>{loginUser.fullName}</li>
          </>) : null}
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;