import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Register() {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (e) => {
    const { email, password } = e;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigate = useNavigate();
  const loginPage = () => {
    navigate('/Login');
  }


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h3>Register</h3>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type='email'
        placeholder='email'
        {...register('email')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p>{errors.email?.message}</p>
      <input
        type='password'
        placeholder='password'
        {...register('password')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p>{errors.password?.message}</p>
      <button>Submit</button>
    </form>
    <button onClick={loginPage}>Login</button>
    </div>
  );
}

export default Register;