import { useState, useContext } from "react";

import { UserContext } from "../../contexts/user.context";

import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailandPassword
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.style.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
      const {user} = await signInWithGooglePopup();
      await createUserDocumentFromAuth(user);
      console.log(user);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await signInAuthUserWithEmailandPassword(
        email, 
        password
      );
      setCurrentUser(user);

      resetFormFields();
    
    } catch (error) {
      switch(error.code) {
        case 'auth/wrong-password':
          alert('Wrong password!');
          break;
        case 'auth/user-not-found':
          alert('No user assosiated with this email');
          break;
        default:
          console.log(error);
      }
      
     console.log(error)
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className='buttons-container'>
          <Button type="submit">Sing In</Button>
          <Button type='button' buttonType="google" onClick={signInWithGoogle}>Google Signin</Button>
        </div>
        
      </form>
    </div>
  );
};

export default SignInForm;
