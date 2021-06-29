import React from 'react';

import FormInput from '../form-input/form-input.component'

import CustomButton from '../custom-button/custom-button.component';

import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';

import './signup.styles.scss';
import { error } from 'loglevel';

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            email:"",
            displayName:"",
            password:"",
            confirmPassword:""
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state

        if(password != confirmPassword) {
            alert(`password don't match`);
            return
        }
        else {
            try {

                const {user} = await auth.createUserWithEmailAndPassword(email,password);

                await createUserProfileDocument(user,{displayName});

                this.setState({
                    email:"",
                    displayName:"",
                    password:"",
                    confirmPassword:""
                })

            } catch(error) {
                console.error(error);
            }
        }  
    };

    handleChange = event => {
        const {name,value} = event.target;
        this.setState({[name]:value});
    }



    render() {
        const {displayName, email, password, confirmPassword} = this.state
        return(
            <div className="sign-up">
                    <h2 className="title">I do not have account</h2>
                    <span className="subtitle">signup with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput 
                    type="text"
                    name="displayName"
                    value={displayName}
                    handleChange={this.handleChange}
                    label="Display Name"
                    required
                    />
                    <FormInput 
                    type="email"
                    name="email"
                    value={email}
                    handleChange={this.handleChange}
                    label="Email"
                    required
                    />
                    <FormInput 
                    type="password"
                    name="password"
                    value={password}
                    handleChange={this.handleChange}
                    label="Password"
                    required
                    />
                    <FormInput 
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    handleChange={this.handleChange}
                    label="Confirm Password"
                    required
                    />
                    <CustomButton type="submit">SIGN UP</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignUp;