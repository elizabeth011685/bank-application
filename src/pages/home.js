import logo from "../logo.svg";
import Card from "../components/card";
const cardStyle = {
    width: 600+'px'
};
function Home() {

    return (
        <Card
            title="Welcome to Bad Bank"
            cardStyle={cardStyle}
            body={
                (<>
                    <img src={logo} alt="logo"/>
                </>)
            }
            footer={
                (
                   <> We are a insecure bank!!!</>
                )
            }
        />

    );
}

export default Home;

