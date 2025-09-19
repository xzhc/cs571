import { Col, Row } from "react-bootstrap";
import Ticket from "./Ticket";
import { useContext } from "react";
import TicketContext from "../contexts/TicketContext";

const TicketLane = ({ status }) => {
  const [ticketLanes] = useContext(TicketContext);
  const tickets = ticketLanes[status];
  return (
    <div>
      <Row>
        <h2>{status} tickets</h2>
        {tickets.length === 0 ? (
          <p>There are no tickets here yet!</p>
        ) : (
          tickets.map((tick) => {
            return (
              <Col xs={6} md={4} lg={3} xxl={2} key={tick.id}>
                <Ticket {...tick} status={status} />
              </Col>
            );
          })
        )}
      </Row>
      <br />
    </div>
  );
};

export default TicketLane;
