import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [first_name, setFirst_Name] = useState('');
  const [username, setUserName]= useState('')
  const [last_name, setLast_Name] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [accept_terms, setAccept_Terms] = useState(true);
  const [notification, setNotification] = useState(true);
  const [role, setRole] = useState('');
  const [image, setImage] = useState('');

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        first_name: first_name,
        password: password,
        last_name: last_name,
        email: email,
        birthday: birthday, 
        country: country, 
        accept_terms: accept_terms, 
        notification: notification, 
        role: role, 
        image: image, 
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
       <div>
        <label htmlFor="username">
         Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUserName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="first_name">
          First name:
          <input
            type="text"
            name="first_name"
            value={first_name}
            required
            onChange={(event) => setFirst_Name(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="last_name">
          Last Name: 
          <input
            type="text"
            name="last_name"
            value={last_name}
            required
            onChange={(event) => setLast_Name(event.target.value)}
          />
        </label>
      </div>
         <div>
        <label htmlFor="text">
          Email: 
          <input
            type="text"
            name="email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </div>
        <div>
        <label htmlFor="birthday">
          Birthday:  
          <input
            type="date"
            name="birthday"
            value={birthday}
            required
            onChange={(event) => setBirthday(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="country">
          Country: 
          <input
            type="text"
            name="country"
            value={country}
            required
            onChange={(event) => setCountry(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="text"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="accept_terms">
          Accept Terms:
          <input 
            type="checkbox"
            name="accept_terms"
            value={accept_terms}
            required
            onChange={(event) => setAccept_Terms(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="notification">
          Notification:
          <input
            type="checkbox"
            name="notification"
            value={notification}
            required
            onChange={(event) => setNotification(event.target.value)}
          />
        </label>
      </div>
       <div>
        <label htmlFor="role">
          Role:
          <input
            type="int"
            name="role"
            value={role}
            required
            onChange={(event) => setRole(event.target.value)}
          />
        </label>
      </div>
       <div>
        <label htmlFor="image">
          Image:
          <input
            type="text"
            name="image"
            value={image}
            required
            onChange={(event) => setImage(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
