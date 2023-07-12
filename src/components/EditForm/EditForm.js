import React from "react";
import Input from "../Input/Input";
import styles from './EditForm.module.scss'
import { useForm } from "react-hook-form";
import { useSelector,useDispatch } from "react-redux";
import { selectUser,selectIsEditUserSuccess, selectServerErrors,selectIsLoading } from "../../redux/store/userSlice";

import { editAccount, clearIsEditUserSuccess } from "../../redux/store/userSlice";
import { useEffect } from "react";
import { Alert } from "antd";


export const EditForm = ()=>{


   const dispatch = useDispatch();
   const isEditUserSuccess = useSelector(selectIsEditUserSuccess);
   const serverErrors = useSelector(selectServerErrors);
  

   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      setError,
    } = useForm({
      mode: 'onBlur',
    });


    
  useEffect(() => {
   if (isEditUserSuccess) {
     setValue('newPassword', '');
     setTimeout(() => {
       dispatch(clearIsEditUserSuccess());
     }, 3000);
   }
 }, [isEditUserSuccess]);

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




 const onSubmit = (data) => {
   const newUserData = {
     username: data.username,
     email: data.email,
     image: data.imgUrl,
   };

   if (data.newPassword) {
     newUserData.password = data.newPassword;
   }
   dispatch(editAccount(newUserData));
 };
    

  const checkUrlImg = (url) =>
  new Promise((resolve) => {
    if (url.trim()) {
      const img = new Image();

      img.src = url.trim();
      img.onload = () => {
        resolve(true);
      };

      img.onerror = () => {
        resolve('URL is not an Image');
      };
    } else {
      resolve(true);
    }
  });


   return(<div className={styles['edit-profile']}>
      {isEditUserSuccess && (
         <Alert className={styles.success} message="Your profile has been updated" type="success" showIcon />
       )}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.wrap}>
         
         <h3 className={styles.title}>Edit Profile</h3>
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
        label="New Password"
        placeholder="New Password"
        type="password"
        error={errors.newPassword}
        options={register('newPassword', {
         
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
        label="Avatar image"
        placeholder="url"
        error={errors.imgUrl}
        options={register('imgUrl', {
          validate: (url) => checkUrlImg(url),
        })}
      />

      <div className={styles["button-wrap"]}>
        <button className={styles.button}>Save</button>
      </div>
   
     
      

      </form>
      </div>
   )
}