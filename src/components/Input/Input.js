//import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import s from './Input.module.scss';


export const Input = ({ label, placeholder, options, error, type = 'text', modeTextarea = false, autofocus = false }) =>{

   //const options= UseFormRegisterReturn();
   //const error =  FieldError | undefined;

  const inputClass = error ? `${s.input} ${s.inputError}` : s.input;



  return (
    <div className={s.wrapp}>
      {label && (
        <label className={s.label} htmlFor={label}>
          {label}
        </label>
      )}
      {modeTextarea ? (
        <textarea className={`${inputClass} ${s.textarea}`} id={label} placeholder={placeholder} {...options} />
      ) : (
        <input
          className={inputClass}
          id={label}
          placeholder={placeholder}
          type={type}
          {...options}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autofocus}
        />
      )}
      <div className={s.error}>{error ? error.message || 'Error' : ''}</div>
    </div>
  );
}

Input.defaultProps = {
  type: 'text',
  modeTextarea: false,
  label: '',
  autofocus: false,
};

export default Input;