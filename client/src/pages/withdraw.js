import Card from "../components/card";
import {useFormik} from "formik";
import {useContext, useState} from "react";
import {UserContext} from "../contexts/UserContext";
import axios from "axios";
import {ApiUrlContext} from "../contexts/Context";
import firebase from "../firebase";

const cardStyle = {
    width: 400+'px'
};

let validado = 0;

var token = null;

firebase.auth().onAuthStateChanged(async (firebaseUser) => {
    if(firebaseUser){
        firebase.auth().currentUser.getIdToken()
            .then(idToken => {
                token = idToken;
            }).catch(e => console.log('e:', e));
    }
    else{
        console.log('User is not logged in');
    }
});

function Withdraw() {
    const [enviado, setEnviado] = useState(false);
    const [error, setError] = useState("");
    const apiURL = useContext(ApiUrlContext);


    const { setUser, user } = useContext(UserContext);


    const formik = useFormik({
        initialValues: {
            withdraw_value: "",
        },
        onSubmit: values => {
            if ( user.balance - parseFloat(values.withdraw_value) < 0) {
                setError("Transaction Failed");
                return;
            }

            axios.post(`${apiURL}/account/${user.id}/withdraw`,
                {
                    withdraw_value: values.withdraw_value,
                    user_id: user.id,
                },{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }})
                .then(response => {
                    console.log(response.data);
                    setEnviado(true);
                    setError("");
                    setUser({...user, balance: response.data.balance});
                })
                .catch(error => {
                    console.log(error);
                });

            
        },
        validate: values => {
            validado = 1;
            let errors = {};
            if (!values.withdraw_value) errors.withdraw_value = "Field required";
            if ( isNaN(values.withdraw_value)) errors.withdraw_value = "Enter positive numbers only";
            if ( parseFloat(values.withdraw_value) < 0) errors.withdraw_value = "Enter positive numbers only";

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
    return firebase.auth().currentUser ? (

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
                        <input name="withdraw_value" id="depositField" type="text" onChange={formik.handleChange}
                               value={formik.values.withdraw_value}
                               className="form-control" placeholder="Withdraw" aria-label="Withdraw"
                               readOnly={enviado}
                               aria-describedby="addon-wrapping"/>
                        {formik.errors.withdraw_value ?
                            <div style={{color: 'red'}} id="nameError">{formik.errors.withdraw_value}</div> : null}
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
                                <button className="btn btn-secondary ms-1" type="button" onClick={handleClearForm}>Clear Form</button>
                            </>
                        )}

                        {enviado && (
                            <button type="button" className="btn btn-primary" onClick={handleCreateNew}>Create Another Withdraw</button>
                        )}

                    </>
                )
            }
        />
    ) :
        (<div className="alert alert-danger" role="alert">
            Unauthorized area
        </div>);
}

export default Withdraw;