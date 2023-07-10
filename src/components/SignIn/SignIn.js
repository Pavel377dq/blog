import React from "react";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";
import styles from './SignIn.module.scss';
import { Link } from "react-router-dom";

export const SignIn = ()=>{


   const {
      register,
     // handleSubmit,
      formState: { errors },
    } = useForm({
      mode: 'onBlur',
    });


   return(
      <form className={styles.wrap}>
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
   )
}