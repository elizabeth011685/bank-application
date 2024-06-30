import {UserContext} from "../contexts/UserContext";
import {useFormik} from "formik";
import Card from "../components/card";
import {useContext, useState} from "react";
const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
let validado = 0;

const cardStyle = {
    width: 400+'px'
};
function CreateAccount() {

    const [enviado, setEnviado] = useState(false);
    const { setUser } = useContext(UserContext);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        onSubmit: values => {
            setUser({name:values.name, email:values.email, password:values.password, balance:50});
            setEnviado(true);
        },
        validate: values => {
            validado = 1;
            let errors = {};
            if (!values.name) errors.name = "Field required";
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
                    <div className="mb-3">
                        <input name="name" id="nameField" type="text" onChange={formik.handleChange}
                               value={formik.values.name}
                               className="form-control" placeholder="Name" aria-label="Name"
                               readOnly={enviado}
                               aria-describedby="addon-wrapping"/>
                        {formik.errors.name ?
                            <div style={{color: 'red'}} id="nameError">{formik.errors.name}</div> : null}
                    </div>

                    <div className="mb-3">
                        <input name="email" id="emailField" type="text" onChange={formik.handleChange}
                               value={formik.values.email}
                               readOnly={enviado}
                               className="form-control" placeholder="E-mail" aria-label="EMail"
                               aria-describedby="addon-wrapping"/>
                        {formik.errors.email ?
                            <div style={{color: 'red'}} id="emailError">{formik.errors.email}</div> : null}
                    </div>

                    <div className="mb-3">
                        <input name="password" id="pswField" type="text" onChange={formik.handleChange}
                               value={formik.values.password}
                               readOnly={enviado}
                               className="form-control" placeholder="Password" aria-label="Password"
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
                            Create Account
                        </button>
                        <button className="btn btn-secondary ml-1" onClick={handleClearForm}>Clear Form</button>
                        </>
                )}

            {enviado && (
                <button className="btn btn-primary" onClick={handleCreateNew}>Create Another Account</button>
                        )}

                    </>
                )
            }
        />
    );
}

export default CreateAccount;