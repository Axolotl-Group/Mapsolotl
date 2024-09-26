import React from 'react';
const Signup = () => {
  return (
    <div>
      Signup
      <form method='POST' action='users/signup'>
        <input name='userName' type='text' placeholder='username'></input>
        <input name='password' type='password'></input>
        <input type='submit' value='create user'></input>
      </form>
    </div>
  );
};
export default Signup;
