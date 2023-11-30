import React, { useState } from 'react';
import '../styles.scss';
import { Link } from 'react-router-dom';
import LoginBG from '../components/LoginBG.jsx';

// Login page created with React Router

const Login = () => {
  return (
    <div id='loginPage'>
      <LoginBG />
      <div id='info'></div>
      <div id='loginText'>Login</div>
      <form method='POST' action='/users/login'>
        <input name='userName' type='text' placeholder='username'></input>
        <input name='password' type='password' placeholder='password'></input>
        <input type='submit' value='Login'></input>
      </form>
      <Link id='signupText' to='/signup'>
        Sign up
      </Link>
      <p id='discord'>Or, use Discord!</p>
      <Link
        id='idYou'
        to='https://discord.com/api/oauth2/authorize?client_id=1179167732873306262&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fusers%2Flogin&response_type=code&scope=identify'
      >
        Identify Yourself
      </Link>
    </div>
  );
};
export default Login;
