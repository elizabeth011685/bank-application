import axios from 'axios';
import Card from "../components/card";
import Table from "../components/table";
import {ApiUrlContext} from "../contexts/Context";
import {useContext, useState, useEffect} from "react";


const cardStyle = {
    width: 600+'px'
};

function AllData() {
    const [users, setUsers] = useState(null);
    const apiURL = useContext(ApiUrlContext);

    useEffect(() => {
        const fetchData = async () =>{
            const response = await axios.get(`${apiURL}/account/all`);
            const data = await response.data;

            await setUsers(data)
        }
        fetchData();
    },[]);

    return (<>{
        users && (<Card title="All data"
                    cardStyle={cardStyle}
                    body={(
                        <Table columns={["Name", "Email", "Password"]} data={users} />
                    )}/>)
    }
        </>
    );
}

export default AllData;