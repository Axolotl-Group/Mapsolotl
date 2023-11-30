import React from 'react';
import Welcome from '../components/Welcome.jsx';

const Signup = () => {
  return (
    <div id='signupPage'>
      <Welcome />
      <div id='suText'>Signup</div>
      <form method='POST' action='users/signup'>
        <input name='userName' type='text' placeholder='username'></input>
        <input name='password' type='password' placeholder='password'></input>
        <input type='submit' value='create user'></input>
      </form>
    </div>
  );
};
export default Signup;
