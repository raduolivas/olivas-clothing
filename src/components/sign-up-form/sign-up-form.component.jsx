import { useState } from "react";

import { createAuthUserWithEmailandPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-up-form.style.scss';

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  console.log(formFields);

  const resetFormFields = () => {
      setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
        alert("passwords do not match");
        return;
    }

    try {
        const user = await createAuthUserWithEmailandPassword(
            email, 
            password
        );
        
        await createUserDocumentFromAuth(user, {displayName});
        resetFormFields();
    } catch(error) {
        if (error.code === 'auth/email-already-in-use') {
            alert('Cannot create user, email already in use')
        } else {
            console.log('user creation encountered an error', error);
        }
        
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don`t have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          name="displayName"
          onChange={handleChange}
          required
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          name="email"
          onChange={handleChange}
          required
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
          required
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          required
          value={confirmPassword}
        />
        <Button buttonType='' type="submit">Sing Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
