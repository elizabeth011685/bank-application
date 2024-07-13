import Card from "../components/card";
import Table from "../components/table";
import {users} from "../data";

const cardStyle = {
    width: 600+'px'
};

function Alldata() {


    return (
        <Card title="All data"
              cardStyle={cardStyle}
            body={(
                <Table columns={["Name", "Email", "Password"]} data={users} />


            )}/>
    );
}

export default Alldata;