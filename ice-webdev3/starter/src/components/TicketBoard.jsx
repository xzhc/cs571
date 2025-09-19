import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import TicketLane from "./TicketLane";

const TicketBoard = (props) => {
  const [ticketLanes, setTicketLanes] = useState({
    todo: [],
    inprogress: [],
    done: [],
  });

  useEffect(() => {
    fetch("https://cs571.org/rest/s25/ice/tickets", {
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
      },
    })
      .then((res) => res.json())
      .then((ticketData) => {
        console.log(ticketData);
        setTicketLanes({
          todo: ticketData,
          inprogress: [],
          done: [],
        });
      });
  }, []);

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

  return (
    <div>
      <h1>Ticket Board</h1>
      <Container fluid>
        {Object.keys(ticketLanes).map((laneName) => {
          return (
            <TicketLane
              move={move}
              key={laneName}
              status={laneName}
              tickets={ticketLanes[laneName]}
            />
          );
        })}
      </Container>
    </div>
  );
};

export default TicketBoard;
