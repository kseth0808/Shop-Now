import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';  

function Login() {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (e) => {
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/")
      })
      .catch((error)=>{
        console.log(error)
      })
  };

  const navigate = useNavigate();
  const registerPage = () => {
    navigate('/Register');
  };

  const signInWithGoogle = ()=>{
    signInWithPopup(auth, provider).then((result)=>{
      localStorage.setItem("isAuth", true);
      navigate("/")
    })
  }
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h3>Login</h3>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='email' placeholder='email' {...register('email')} value={email} onChange={(e) => setEmail(e.target.value)} />
      <p>{errors.email?.message}</p>
      <input type='password' placeholder='password' {...register('password')} value={password} onChange={(e) => setPassword(e.target.value)} />
      <p>{errors.password?.message}</p>
      <button>Submit</button>
      <button onClick={signInWithGoogle}>Sigin with Google</button>
    </form>
    <button onClick={registerPage}>Register</button>
    </div>
  );
}

export default Login;
