import React, { useContext, useState } from 'react';
import styles from "./style.module.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import api from '../../Functions/API_Calls/apiCalls';
// import MassageContext from '../../Context/MassageContext';


function Login() {

  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMassage] = useState(false)
  const navigate = useNavigate()
  // const { Message, setMassage } = useContext(MassageContext);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "/users/login"
      const data = { email, password }
      const result = await api.post(url, data)
      if (result.token) {
        localStorage.setItem(`token:${result.email}`, result.token);
        navigate('/');
      }
    }
    catch (error) {
      setMassage('Incorrect email or password')
      setTimeout(() => {
        setMassage(false)
      }, 10000)
    }

    // } else {

    //   return false;
    //   // alert('💥💥💥💥💥')
    // }

    // const url = "http://localhost:5001/api/users/login"
    // const data = {
    //   email: email,
    //   password: password
    // }
    // axios.post(url, data)
    //   .then(response => {
    //     console.log('Data added successfully', response.data)
    //     alert('🎊🎊🎊')
    //     Navigate('/home');
    //   })
    //   .catch(error => {
    //     console.log('Error adding data:', error);
    //     alert('💥💥💥💥💥')
    //     // setMassage('Incorrect email or password')
    //     // setTimeout(() => {
    //     //   setMassage(false)
    //     // }, 10000)
    //   });
  };

  return (
    <>
      <div className={styles.login_container}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.form_group}>
            <label htmlFor="email">email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.btn_login}>Log In</button>
        </form>

        <Link className={styles.Link} to="/Register">Don't have a user? Register here</Link>
        <div className={styles.message}>
          {message}
        </div>
        <button onClick={() => localStorage.removeItem('token')} className={styles.logout}>logOut</button>
      </div>
    </>

  );
};

export default Login;




