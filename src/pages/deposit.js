import Card from "../components/card";
import {useFormik} from "formik";
import {useContext, useState} from "react";
import {UserContext} from "../contexts/UserContext";

const cardStyle = {
    width: 400+'px'
};

let validado = 0;

function Deposit() {
    const [enviado, setEnviado] = useState(false);
    const { setUser, user } = useContext(UserContext);

    const formik = useFormik({
        initialValues: {
            deposit_value: "",
        },
        onSubmit: values => {
            setEnviado(true);
            setUser({...user, balance: user.balance + parseFloat(values.deposit_value)});
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
    }
    const handleCreateNew = ()=>{
        setEnviado(false);
        formik.resetForm();
    }
    return (
        <Card
            title="Deposit"
            cardStyle={cardStyle}
            formik={formik}
            body={
                (<>
                    {enviado && (
                        <div className="alert alert-success" role="alert">
                            Deposit created successfully!
                        </div>
                    )}

                    <div className="mb-3">
                         Current account balance: $ {user.balance.toLocaleString()}
                    </div>

                    <div className="mb-3">
                        <input name="deposit_value" id="depositField" type="text" onChange={formik.handleChange}
                               value={formik.values.deposit_value}
                               className="form-control" placeholder="Deposit" aria-label="Deposit"
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
                                    Deposit
                                </button>
                                <button className="btn btn-secondary ms-1" type="button" onClick={handleClearForm}>Clear Form</button>
                            </>
                        )}

                        {enviado && (
                            <button type="button" className="btn btn-primary" onClick={handleCreateNew}>Create Another Deposit</button>
                        )}

                    </>
                )
            }
        />
    );
}

export default Deposit;