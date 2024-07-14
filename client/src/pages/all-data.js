import axios from 'axios';
import Card from "../components/card";
import Table from "../components/table";
import {ApiUrlContext} from "../contexts/Context";
import {useContext, useState, useEffect} from "react";
import firebase from "../firebase";
import {useNavigate} from "react-router-dom";

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


const cardStyle = {
    width: 1000+'px'
};

function AllData() {
    const [users, setUsers] = useState(null);
    const apiURL = useContext(ApiUrlContext);
    let navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () =>{
            const response = await axios.get(`${apiURL}/account/all`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then().catch(e => console.log(e));
            if(response && response.status === 200){
                const data = await response.data;
                setUsers(data)
            }

        }
        fetchData();
    },[]);

    return (<>{
            users && (<Card title="All data"
            cardStyle={cardStyle}
            body={(
                <Table columns={["Name", "Email", "Password", "Account Number", "Balance"]} data={users} />
            )}/>)
        }
        {
            firebase.auth().currentUser && !users && (<Card title="All data"
             cardStyle={cardStyle}
             body={(
                 <div className="alert alert-info" role="alert">
                     No data found.
                 </div>
             )}/>)
        }
        {
            !firebase.auth().currentUser && (<div className="alert alert-danger" role="alert">
                Unauthorized area
            </div>)
        }
        </>
    );
}

export default AllData;