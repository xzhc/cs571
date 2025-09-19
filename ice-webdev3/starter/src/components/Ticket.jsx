import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import TicketContext from "../contexts/TicketContext";

const Ticket = (props) => {
  const [ticketLanes, setTicketLanes] = useContext(TicketContext);

  const move = (tickedId, from, to) => {
    console.log(`Moving ${tickedId} from ${from} to ${to}`);
    if (from === to) {
      return;
    }

    setTicketLanes((oldLanes) => {
      let fromLane = oldLanes[from];
      let toLane = oldLanes[to];

      const ticketToMove = fromLane.find((ticket) => ticket.id === tickedId);

      const newLanes = { ...oldLanes };
      newLanes[from] = fromLane.filter((ticket) => ticket.id !== tickedId);
      newLanes[to] = [...toLane, ticketToMove];
      return newLanes;
    });
  };

  const markTodo = () => {
    move(props.id, props.status, "todo");
  };

  const markInProgress = () => {
    move(props.id, props.status, "inprogress");
  };
  const markDone = () => {
    move(props.id, props.status, "done");
  };

  return (
    <Card style={{ margin: "0.25rem" }}>
      <h2 style={{ fontSize: "1.25rem" }}>{props.name}</h2>
      <sub>{props.author}</sub>
      <br />
      <p>{props.description}</p>
      <Button variant="secondary" onClick={markTodo}>
        ToDo
      </Button>
      <Button variant="primary" onClick={markInProgress}>
        In Progress
      </Button>
      <Button variant="success" onClick={markDone}>
        Done
      </Button>
    </Card>
  );
};

export default Ticket;
