import Card from "../components/card";
import {useFormik} from "formik";
import {useContext, useState} from "react";
import {UserContext} from "../contexts/UserContext";

const cardStyle = {
    width: 400+'px'
};

let validado = 0;

function Withdraw() {
    const [enviado, setEnviado] = useState(false);
    const [error, setError] = useState("");

    const { setUser, user } = useContext(UserContext);


    const formik = useFormik({
        initialValues: {
            deposit_value: "",
        },
        onSubmit: values => {
            if ( user.balance - parseFloat(values.deposit_value) < 0) {
                setError("Transaction Failed");
                return;
            }

            setError("");
            setEnviado(true);
            setUser({...user, balance: user.balance - parseFloat(values.deposit_value)});
        },
        validate: values => {
            validado = 1;
            let errors = {};
            if (!values.deposit_value) errors.deposit_value = "Field required";
            if ( isNaN(values.deposit_value)) errors.deposit_value = "Enter positive numbers only";
            if ( parseFloat(values.deposit_value) < 0) errors.deposit_value = "Enter positive numbers only";

            return errors;
        }
    });
    const handleClearForm = ()=>{
        formik.resetForm();
        setEnviado(false);
        setError("");
    }
    const handleCreateNew = ()=>{
        setEnviado(false);
        formik.resetForm();
    }
    return (

    <Card
            title="Withdraw"
            cardStyle={cardStyle}
            formik={formik}
            body={
                (<>
                    {error && !enviado && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    {enviado && (
                        <div className="alert alert-success" role="alert">
                            Withdraw created successfully!
                        </div>
                    )}

                    <div className="mb-3">
                        Current account balance: $ {user.balance.toLocaleString()}
                    </div>

                    <div className="mb-3">
                        <input name="deposit_value" id="depositField" type="text" onChange={formik.handleChange}
                               value={formik.values.deposit_value}
                               className="form-control" placeholder="Withdraw" aria-label="Withdraw"
                               readOnly={enviado}
                               aria-describedby="addon-wrapping"/>
                        {formik.errors.deposit_value ?
                            <div style={{color: 'red'}} id="nameError">{formik.errors.deposit_value}</div> : null}
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
                                    Withdraw
                                </button>
                                <button className="btn btn-secondary ml-1" type="button" onClick={handleClearForm}>Clear Form</button>
                            </>
                        )}

                        {enviado && (
                            <button type="button" className="btn btn-primary" onClick={handleCreateNew}>Create Another Withdraw</button>
                        )}

                    </>
                )
            }
        />
    );
}

export default Withdraw;