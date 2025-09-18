import { Button, Card } from "react-bootstrap";

const Ticket = (props) => {
    return <Card style={{margin: "0.25rem"}}>
        <h2 style={{fontSize: "1.25rem"}}>{props.name}</h2>
        <sub>{props.author}</sub>
        <br/>
        <p>{props.description}</p>
    </Card>
}

export default Ticket;