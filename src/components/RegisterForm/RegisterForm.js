import React from "react";
import styles from "./RegisterForm.module.scss"
import { Link } from "react-router-dom";
import {  useForm } from 'react-hook-form';
import Input from "../Input/Input";

export const RegisterForm = () => {
  
  const {
    register,
    //handleSubmit,
    formState: { errors },
   // setError,
  } = useForm({
    mode: 'onBlur',
  });


  return (
    <form className={styles.wrap}>
      <h3 className={styles.title}>Create new account</h3>
      <Input
        autofocus
        label="Username"
        placeholder="Username"
        error={errors.username}
        options={register('username', {
          required: 'The field must be filled in',
          minLength: {
            value: 3,
            message: 'The user name needs to be at least 3 characters.',
          },
          maxLength: {
            value: 20,
            message: 'The user name must contain no more than 20 characters.',
          },
        })}
      />
      <Input
        label="Email address"
        placeholder="Email address"
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
          minLength: {
            value: 6,
            message: 'Your password needs to be at least 6 characters.',
          },
          maxLength: {
            value: 40,
            message: 'Your password must contain no more than 40 characters.',
          },
        })}
      />
      <Input
        label="Repeat Password"
        placeholder="Password"
        type="password"
        error={errors.repeatPassword}
        options={register('repeatPassword', {
          required: 'The field must be filled in',
          validate: (val, formValues) => formValues.password === val || 'Your passwords do no match',
        })}
      />
      <div className={styles["checkbox-wrap"]}>
        <input
          type="checkbox"
         
          className={styles["custom-checkbox"]}
          id="1"
          name="IsAgree"
          value=""
        />
        <label htmlFor="1">I agree to processing my personal information</label>
      </div>
      <div className={styles["button-wrap"]}>
        <button className={styles.button}>Create</button>
      </div>
      <div className={styles["small-text"]}>Already have an account? <Link className={styles.link}>Sign in</Link></div>
    </form>
  );
};
