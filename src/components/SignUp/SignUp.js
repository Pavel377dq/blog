import React from "react";
import styles from "./SignUp.module.scss"
import { Link } from "react-router-dom";
import {  useForm } from 'react-hook-form';
import Input from "../Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { selectServerErrors, clearServerErrors, createAccount } from "../../redux/store/userSlice";
import { useEffect } from "react";


export function SignUp()  {

  const dispatch = useDispatch();
  const serverErrors = useSelector(selectServerErrors);

  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    return () => {
      dispatch(clearServerErrors());
    };
  }, []);

  useEffect(() => {
    if (serverErrors) {
      Object.entries(serverErrors).forEach(([key, value]) => {
        if (key === 'username' || key === 'email') {
          const field = key;
          setError(field, { type: 'serverError', message: `${value}` });
        }
      });
    }
  }, [serverErrors]);

  console.log(errors.agree,errors.agree?.message,'errors.agree errors.agree.message')
  const onSubmit = (data) => {
    const newUser = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    dispatch(createAccount(newUser));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.wrap}>
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
          id='agree'
          className={styles["custom-checkbox"]}
          {...register('agree', {
            required: 'You should agree',
          })}
        />
        <label htmlFor='agree'>I agree to processing my personal information</label>
      </div>
      <div className={styles.errorAgree}>{errors.agree && errors.agree.message}</div>
      <div className={styles["button-wrap"]}>
        <button  type="submit" className={styles.button}>Create</button>
      </div>
      <div className={styles["small-text"]}>Already have an account? <Link to="/sign-in" className={styles.link}>Sign in</Link></div>
    </form>
  );
};
