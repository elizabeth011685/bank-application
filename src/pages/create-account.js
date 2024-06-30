import {useFormik} from "formik";
const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
let validado = 0;

const cardStyle = {
    width: 400+'px'
};
function CreateAccount() {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {

            alert("Success");
        },
        validate: values => {
            validado = 1;
            let errors = {};
            if (!values.name) errors.name = "Field required";
            if (!values.email) errors.email = "Field required";
            if (!values.password) errors.password = "Field required";
            if (values.email && !regex.test(String(values.email).toLowerCase())) errors.email = "Username should be an email";
            return errors;
        }
    })
    return (
        <>
            <div className="d-flex justify-content-center mt-5">
                <form onSubmit={formik.handleSubmit}>
                    <div className="card" style={cardStyle}>
                        <div className="card-header">
                            <h3>Create Account</h3>
                        </div>
                        <div className="card-body">

                            <div className="mb-3">
                                <input name="name" id="nameField" type="text" onChange={formik.handleChange}
                                       className="form-control" placeholder="Name" aria-label="Name"
                                       aria-describedby="addon-wrapping"/>
                                {formik.errors.name ?
                                    <div style={{color: 'red'}} id="nameError">{formik.errors.name}</div> : null}
                            </div>

                            <div className="mb-3">
                                <input name="email" id="emailField" type="text" onChange={formik.handleChange}
                                       className="form-control" placeholder="E-mail" aria-label="EMail"
                                       aria-describedby="addon-wrapping"/>
                                {formik.errors.email ?
                                    <div style={{color: 'red'}} id="emailError">{formik.errors.email}</div> : null}
                            </div>

                            <div className="mb-3">

                                <input name="password" id="pswField" type="text" onChange={formik.handleChange}
                                       className="form-control" placeholder="Password" aria-label="Password"
                                       aria-describedby="addon-wrapping"/>
                                {formik.errors.password ?
                                    <div style={{color: 'red'}} id="pswError">{formik.errors.password}</div> : null}
                            </div>
                        </div>
                        <div className="card-footer">
                            <button disabled={validado == 0 || Object.keys(formik.errors).length > 0} type="submit" id="submitBtn" className="btn btn-primary">Create Account</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateAccount;