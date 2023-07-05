import React, { useState } from 'react';
import styles from "./style.module.css";
import axios from 'axios';
import api from '../../Functions/API_Calls/apiCalls';
import { useNavigate } from 'react-router-dom'



function Registration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [message, setMassage] = useState(false)
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmpassword === password) {
      try{
        const url = "/users/register"
        const data = {
          name: username,
          email: email,
          password: password,
        }
        const result = await api.post(url, data)
        if (result) {
          // localStorage.setItem('token', result.token);
          navigate('/login');
        }}
        catch (error) {
          setMassage('This email address already exists...')
          setTimeout(() => {
            setMassage(false)
          }, 10000)
        }}
    else{
      setMassage('Invalid password verification')
          setTimeout(() => {
            setMassage(false)
          }, 10000)
    }



    // if(confirmpassword === password){
    // const url = "http://localhost:5001/api/users/register"
    // const data = {
    //   name: username,
    //   email: email,
    //   password: password,
    // }
    // axios.post(url, data)
    //   .then(response => {
    //     console.log('Data added successfully', response.data);

    //   })
    //   .catch(error => {
    //     console.error('Error adding data:', error);
    //   })}
  };

  return (
    <div className={styles.registration_container}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_group}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="ConfirmPassword">Confirm Password</label>
          <input
            type="password"
            id="ConfirmPassword"
            name="ConfirmPassword"
            placeholder="Enter password again"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.btn_register}>Register</button>
      </form>
      <div className={styles.message}>
          {message}
        </div>
    </div>
  );
};

export default Registration








