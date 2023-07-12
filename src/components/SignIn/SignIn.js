import React from "react";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";
import styles from './SignIn.module.scss';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginAccount,clearServerErrors, selectServerErrors } from "../../redux/store/userSlice";
import { Alert } from "antd";

export const SignIn = ()=>{

const dispatch = useDispatch();
const serverErrors =useSelector(selectServerErrors)
   const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      mode: 'onBlur',
    });

     // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      dispatch(clearServerErrors());
    };
  }, []);

  const onSubmit= (data) => {
    dispatch(loginAccount(data));
  };


   return(
    <div className={styles.signIn}>
      {serverErrors && (
        <Alert className={styles.serverError} message="Error: email or password is invalid" type="error" showIcon />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.wrap}>
         <h3 className={styles.title}>Sign In</h3>
         <Input
        autofocus
        label="Email address"
        placeholder="Email address"
        type="email"
        error={errors.email}
        options={register('email', {
          required: 'The field must be filled in',
          pattern: {
            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
            message: 'The email must be valid',
          },
        })}
      />
      <Input
        label="Password"
        placeholder="Password"
        type="password"
        error={errors.password}
        options={register('password', {
          required: 'The field must be filled in',
        })}
      />
      <div className={styles["button-wrap"]}>
        <button className={styles.button}>Login</button>
      </div>
      <div className={styles["small-text"]}>Dont have an account? <Link to="/sign-up" className={styles.link}>Sign Up</Link></div>
   
      </form>
      </div>
   )
}