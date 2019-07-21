import React ,{ComponentState} from 'react';
// @ts-ignore
import SignUp from '../../lib/registration/SignUp.tsx';
// @ts-ignore
import SignIn from '../../lib/registration/SignIn.tsx';
// @ts-ignore
import Confirm from '/Users/shutingyang/HappyCoding/2019winter_AC_carpool_program/src/main/frontend/src/lib/registration/Confirm.tsx';
// @ts-ignore
import Success from '/Users/shutingyang/HappyCoding/2019winter_AC_carpool_program/src/main/frontend/src/lib/registration/Success.tsx';
// @ts-ignore
import { BrowserRouter, Route} from "react-router-dom";


export interface UserFormProps {}

export interface UserFormBaseProps {}

export interface UserFormState {
    firstName: string;
    firstNameError: string;
    lastName: string;
    lastNameError: string;
    email:string;
    emailError: string;
    gender: string;
    genderError: string;
    postalCode: string;
    postalCodeError: string;
    phoneNumber: string;
    phoneNumberError: string;
    password: string;
    passwordError:string;
    userName: string;
}

export class UserForm extends React.PureComponent<
    UserFormProps & UserFormBaseProps,
    UserFormState
> {
    constructor(props: any){
        super(props);
        this.state = {
            firstName: '',
            firstNameError:'',
            lastName: '',
            lastNameError: '',
            email:'',
            emailError: '',
            gender: '',
            genderError: '',
            postalCode: '',
            postalCodeError: '',
            phoneNumber: '',
            phoneNumberError:'',
            password:'',
            passwordError:'',
            userName: '',
        }
    };

    validate = () => {
        let isError = false;
        const check = this.state
        const errors = {
            firstNameError:'',
            lastNameError: '',
            emailError: '',
            genderError: '',
            postalCodeError: '',
            phoneNumberError:'',
            passwordError:''
        };
        if(check.lastName.length===0){
            isError = true;
            errors.lastNameError= "Last name cannot be empaty"; 
        };

        if(check.firstName.length===0){
            isError = true;
            errors.firstNameError = "First name cannot be empaty"
        };

        if(check.email.indexOf("@")===-1){
            isError = true;
            errors.emailError = "Require an valid email"
        };

        if(check.phoneNumber.length===0){
            isError = true;
            errors.phoneNumberError = "Require an valid phone number"
        }

        if(check.postalCode.length===0){
            isError = true;
            errors.postalCodeError = "Require an valid postal code"
        }

        // if(check.gender===""){
        //     isError=true;
        //     errors.genderError = "Please select a gender"
        // }

        if(check.password===""){
            isError=true;
            errors.passwordError ="Please enter your password"
        }

        this.setState({
            ...this.state,
            ...errors
        });
        return isError;
    }

    //proceed to next step
    // nextStep = () => {
    //     const hasErr = this.validate();
    //     if(!hasErr){
    //           const {step} = this.state;
    //           this.setState({
    //               step: step + 1
    //           });
    //     };
    // };

    //go back to prev step
    // prevStep = () => {
    //     const {step} = this.state;
    //     this.setState({
    //         step: step - 1
    //     });
    // };

    //bug here: the program doesn't go into this func. why???
    //might be event problem???
    handleRadioGroupChange = (event: React.ChangeEvent<unknown>, value: string): void =>{
        this.setState({gender : value});
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {target: {name, value} } = event;
        this.setState({[name]: value} as ComponentState);
    }    

    render() {
        const {firstName, lastName, email, gender, postalCode, phoneNumber, firstNameError, lastNameError,genderError, emailError, phoneNumberError, postalCodeError} = this.state;
        const values = { firstName, lastName, email, gender, postalCode, phoneNumber, firstNameError, lastNameError, genderError, emailError, phoneNumberError, postalCodeError};

            return(
                <BrowserRouter>
                        <Route path="/signUp" 
                            render={()=> { 
                            return (<SignUp
                                values={values}
                                handleChange = {this.handleChange}/>) } }/>
                            

                        <Route path="/signIn" 
                            render={()=>
                            <SignIn
                                values={values}
                                handleChange = {this.handleChange}/> }/>

                        <Route path="/confirm" 
                            render= {()=>
                            <Confirm
                                values={values}
                                handleChange = {this.handleChange}/> }/>
                    
                        <Route path="/success" component={Success} />
                </BrowserRouter>

                );    
    }
}

export default UserForm