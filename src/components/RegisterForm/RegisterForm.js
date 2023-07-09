import React from "react";
import styles from "./RegisterForm.module.scss"
import { Link } from "react-router-dom";
export const RegisterForm = () => {
   const passwordWrap = [styles["wrap-input"]];
   const repPasswordStyle = [styles["wrap-input"]]
   let isLenOk = false;
   let BeforeInputPassword = true;
   const handlerPassword = (evt) =>{
      if(BeforeInputPassword){
         BeforeInputPassword = false;
      }

      if(evt.target.value.length < 6){
         console.log(evt.target.value.length ,'evt.target.value.length ')
         isLenOk = false;
      }
      else{
         isLenOk = true;
      }

      if(!BeforeInputPassword && !isLenOk){
         console.log(passwordWrap,'passwordWrap')
         passwordWrap.push(styles["warning-password"]);
      }

   }

   
  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>Create new account</h3>
      <div className={styles["wrap-input"]}>
        <label className={styles.designation} for="name">Username</label>
        <input className={styles.input} name="name" id="name" placeholder="Username" />
      </div>
      <div className={styles["wrap-input"]}>
        <label className={styles.designation} for="adress">Email address</label>
        <input className={styles.input} name="adress" id="adress" placeholder="Email address" />
      </div>
      <div className={passwordWrap.join(' ')}>
        <label className={styles.designation} for="password">Password</label>
        <input onChange={handlerPassword}  type="password" className={styles.input} name="password" id="password" placeholder="Password" />
      </div>
      <div className={styles["wrap-input"]}>
        <label className={styles.designation} for="repeat-password">Repeat Passowrd</label>
        <input className={styles.input}
        type="password"
          name="repeat-password"
          id="repeat-password"
          placeholder="Repeat Passowrd"
        />
      </div>
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
    </div>
  );
};
