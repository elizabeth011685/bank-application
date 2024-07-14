import axios from 'axios';
import firebase from "../firebase";
import {UserContext} from "../contexts/UserContext";
import {useFormik} from "formik";
import Card from "../components/card";
import {useContext, useState} from "react";
import {ApiUrlContext} from "../contexts/Context";
import {Link} from "react-router-dom";
const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
let validado = 0;

const cardStyle = {
    width: 400+'px'
};

function CreateAccount() {

    const [enviado, setEnviado] = useState(false);
    const [error, setError] = useState(null);
    const { user, setUser } = useContext(UserContext);
    const apiURL = useContext(ApiUrlContext);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirm_password: ''
        },
         onSubmit:  values => {

             const auth = firebase.auth();
             const promise = auth.createUserWithEmailAndPassword(
                 values.email,
                 values.password
             );
             promise.then(async (result) => {
                 console.log(result);
                 setError(null);

                 let user = await axios.get(`${apiURL}/account/create/${values.name}/${values.email}/${values.password}`);
                 console.log(user.data);
                 setUser({
                     name: values.name,
                     email: values.email,
                     password: values.password,
                     balance: 0,
                     account_number: user.data.account_number
                 });
                 setEnviado(true);

             }).catch( async (e) => {
                 let message = e.message.substring(0, e.message.indexOf('.') );
                     setError(message);
                 }
             );

        },
        validate: values => {
            validado = 1;
            let errors = {};
            if (!values.name) errors.name = "Field required";
            if (!values.email) errors.email = "Field required";
            if (!values.password) errors.password = "Field required";
            if (values.password && values.password.length < 6) errors.password = "Password must have at least 6 characters";
            if (!values.confirm_password) errors.confirm_password = "Field required";
            if (values.password && values.confirm_password && values.password !== values.confirm_password ) errors.confirm_password = "Password not match";

            if (values.email && !regex.test(String(values.email).toLowerCase())) errors.email = "Field should be a valid email";
            return errors;
        }
    });

    const handleCreateNew = ()=>{
        setEnviado(false);
        formik.resetForm();
        setUser({
            name: 'Guest',
            email: '',
            password: '',
            balance: 0,
            account_number:''
        });

    }
    const handleClearForm = ()=>{
        formik.resetForm();
        setError(null);
    }

    return (
        <Card
            title="Create Account"
            cardStyle={cardStyle}
            formik={formik}
            body={
                (<>
                    {enviado && (
                        <div className="alert alert-success" role="alert">
                            Account created successfully!
                        </div>
                    )}
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    <div className="mb-3">
                        <input name="name" id="nameField" type="text" onChange={formik.handleChange}
                               value={formik.values.name}
                               className="form-control" placeholder="Name" aria-label="Name"
                               hidden={enviado}
                               autoComplete="off"
                               aria-describedby="addon-wrapping"/>
                        {formik.errors.name ?
                            <div style={{color: 'red'}} id="nameError">{formik.errors.name}</div> : null}
                    </div>

                    <div className="mb-3">
                    <input name="email" id="emailField" type="text" onChange={formik.handleChange}
                               value={formik.values.email}
                               hidden={enviado}
                               className="form-control" placeholder="Email" aria-label="Email"
                               autoComplete="off"
                               aria-describedby="addon-wrapping"/>
                        {formik.errors.email ?
                            <div style={{color: 'red'}} id="emailError">{formik.errors.email}</div> : null}
                    </div>

                    <div className="mb-3">
                        <input name="password" id="pswField" type="password" onChange={formik.handleChange}
                               value={formik.values.password}
                               hidden={enviado}
                               className="form-control" placeholder="Password" aria-label="Password"
                               autoComplete="off"
                               aria-describedby="addon-wrapping"/>
                        {formik.errors.password ?
                            <div style={{color: 'red'}} id="pswError">{formik.errors.password}</div> : null}
                    </div>

                    <div className="mb-3">
                        <input name="confirm_password" id="pswFieldConfirm" type="password"
                               onChange={formik.handleChange}
                               value={formik.values.confirm_password}
                               hidden={enviado}
                               className="form-control" placeholder="Confirm Password" aria-label="Confirm Password"
                               autoComplete="off"
                               aria-describedby="addon-wrapping"/>
                        {formik.errors.confirm_password ?
                            <div style={{color: 'red'}}
                                 id="pswConfirmError">{formik.errors.confirm_password}</div> : null}
                    </div>

                    <div className="mb-3">
                        <label hidden={!user.account_number} className="form-label">Account Number:</label>
                        <div><strong>{user.account_number}</strong></div>
                    </div>
                </>)
            }
            footer={
                (
                    <>
                        {!enviado && (
                            <>
                                <button disabled={validado === 0 || Object.keys(formik.errors).length > 0} type="submit"
                                        id="submitBtn" className="btn btn-primary">
                                    Create Account
                                </button>
                                <button type="button" className="btn btn-secondary ms-1" onClick={handleClearForm}>Clear
                                    Form
                                </button>
                            </>
                        )}

                        {enviado && (
                            <button type="button" className="btn btn-primary" onClick={handleCreateNew}>Create Another Account</button>
                        )}

                        {error && (

                            <Link to={"/src/pages/login"}>
                                <button type="button" className="btn btn-secondary ms-1">
                                    Login
                                </button>
                            </Link>

                        )}

                    </>
                )
            }
        />
    );
}

export default CreateAccount;