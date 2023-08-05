// // Login.js
// // -----------
// import React, { useState, useEffect } from 'react'
// import { useNavigate,useLocation } from "react-router-dom";
// import "./login.css"
// const Login = () => {
//   const [show, setShow] = useState(false);
//   const [formData, setFormData] = useState({ email_username: '', password: '' })
//   const [error, setError] = useState({});
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const {state={}} = useLocation();

//   const handleChange = (e) => {
//     console.log("e.target.name", e.target.name, e.target.value)
//     setFormData(p => {
//       return { ...p, [e.target.name]: e.target.value }
//     })
//   }
//   const handleLogin = ()=>{
//     const signupEmail = localStorage.getItem("user_email");
//     const signupUsername = localStorage.getItem("user_name");
//     const signupPassword = localStorage.getItem("password");
//     // console.log(formData,formData.email_username, signupEmail, formData.email_username, signupUsername, formData.password , signupPassword );
//     if((formData.email_username === signupEmail || formData.email_username === signupUsername) && formData.password === signupPassword){
//       localStorage.setItem("login_username_email", formData.email);
//       localStorage.setItem("login_password", formData.password);
//       navigate('/');
//       window.location.reload();
//     }else{
//       setError({message: 'email/username or password is incorrect!'})
//     }
//   }
//   const handleCreate = ()=>{
//     navigate('/signup');
//   }
//   useEffect(() => {
//     console.log("effect triggered");
//     setFormData(p=>({...p, email_username: state && state.email, password: state && state.password}))
//   }, []);
//   return (
//     <div className="login">
//       <div className="login__container">
//         <h2 className='login__signin'>Login</h2>
//         <div className='login__label'>Email/Username</div>
//         <input type="text"  name='email_username' value={formData.email_username} onChange={handleChange} />
//         <div className='login_label login_password'>
//           <span>Password</span>
//           <span onClick={()=>setShow(p=>!p)}>{show ? 'hide': 'show'}</span>
//         </div>
//           <input type={show ? 'text' : 'password'}  name='password' value={formData.password} onChange={handleChange} />
//         <div className="login__error">{ error && error.message }</div>
//         <button onClick={handleLogin} disabled={loading}>{loading ? 'Logging': 'Login'}</button>
//         <button onClick={handleCreate} disabled={loading}>create account</button>

//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState, useEffect } from 'react'
import { useNavigate,useLocation } from "react-router-dom";
import "./login.css"
const Login = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {state={}} = useLocation();

  const handleChange = (e) => {
    setFormData(p => {
      return { ...p, [e.target.name]: e.target.value }
    })
  }
  const handleLogin = ()=>{
    const users = JSON.parse(window.localStorage.getItem('signupUsers')) || {};
    console.log("users", users);
    const currentUser = users[formData.email.toLocaleLowerCase()];
    if(currentUser){
      if(currentUser.password === formData.password){
        window.localStorage.setItem('loginUsers',JSON.stringify(currentUser));
        navigate('/');
        window.location.reload();
      }else{
        setError({message: 'Password is incorrect!'})
      }
    }else{
      setError({message: "Email doesn't exist!"})
    }
  }
  const handleCreate = ()=>{
    navigate('/signup');
  }
  useEffect(() => {
    setFormData(p=>({...p, email: state && state.email, password: state && state.password}))
  }, []);
  return (
    <div className="login">
      <div className="login__container">
        <h2 className='login__signin'>Login</h2>
        <div className='login__label'>Email/Username</div>
        <input type="text"  name='email' value={formData.email} onChange={handleChange} />
        <div className='login_label login_password'>
          <span>Password</span>
          <span onClick={()=>setShow(p=>!p)}>{show ? 'hide': 'show'}</span>
        </div>
          <input type={show ? 'text' : 'password'}  name='password' value={formData.password} onChange={handleChange} />
        <div className="login__error">{error && error.message}</div>
        <button onClick={handleLogin} disabled={loading}>{loading ? 'Logging': 'Login'}</button>
        <button onClick={handleCreate} disabled={loading}>create account</button>

      </div>
    </div>
  );
}

export default Login;