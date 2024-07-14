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
function Login() {

    const [enviado, setEnviado] = useState(false);
    const [error, setError] = useState(null);
    const { setUser } = useContext(UserContext);
    const apiURL = useContext(ApiUrlContext);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
         onSubmit: async values => {

             const auth = firebase.auth();
             const promise = auth.signInWithEmailAndPassword(
                 values.email,
                 values.password
             );
             promise.then(async (result) => {

                 let response = await axios.get(`${apiURL}/account/get/${values.email}`);
                 let user = response.data;
                 setUser({name:user.username, email:user.email, balance:user.balance, account_number: user.account_number});
                 setEnviado(true);
                 setError(null);

             })
                 .catch((e) => {
                     let message = e.message.substring(0, e.message.indexOf('.') );
                     setError(message);
                 });


        },
        validate: values => {
            validado = 1;
            let errors = {};
            if (!values.email) errors.email = "Field required";
            if (!values.password) errors.password = "Field required";
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
            balance: 0
        });

    }
    const handleClearForm = ()=>{
        formik.resetForm();
    }

    return (
        <Card
            title="Login"
            cardStyle={cardStyle}
            formik={formik}
            body={
                (<>
                    {enviado && (
                        <div className="alert alert-success" role="alert">
                            Login successfully!
                        </div>
                    )}

                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    <div className="mb-3">
                        <input name="email" id="emailField" type="text" onChange={formik.handleChange}
                               value={formik.values.email}
                               readOnly={enviado}
                               className="form-control" placeholder="Email" aria-label="EMail"
                               autoComplete="off"
                               aria-describedby="addon-wrapping"/>
                        {formik.errors.email ?
                            <div style={{color: 'red'}} id="emailError">{formik.errors.email}</div> : null}
                    </div>

                    <div className="mb-3">
                        <input name="password" id="pswField" type="password" onChange={formik.handleChange}
                               value={formik.values.password}
                               readOnly={enviado}
                               className="form-control" placeholder="Password" aria-label="Password"
                               autoComplete="off"
                               aria-describedby="addon-wrapping"/>
                        {formik.errors.password ?
                            <div style={{color: 'red'}} id="pswError">{formik.errors.password}</div> : null}
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
                                    Login
                                </button>
                                <button type="button" className="btn btn-secondary ms-1" onClick={handleClearForm}>
                                    Clear Form
                                </button>
                                <Link to={"/src/pages/create-account"}>
                                <button type="button" className="btn btn-secondary ms-1">
                                    Create Account
                                </button>
                                </Link>
                            </>
                        )}
                    </>
                )
            }
        />
    );
}

export default Login;