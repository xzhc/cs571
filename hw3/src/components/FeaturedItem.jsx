import { useState } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
export default function FeaturedItem(props) {
  const [toggleButton, setToggleButton] = useState(false);
  return (
    <div className="d-flex justify-content-center align-item">
      <Card style={{ maxWidth: "24rem" }} className="mx-auto W-100">
        <Card.Img variant="top" src={props.img} alt={props.description} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            <strong>${props.price}</strong>
          </Card.Text>
          <Card.Text>{props.description}</Card.Text>

          {toggleButton && (
            <>
              <Card.Text>Nutrition Facts</Card.Text>
              <Table className="w-100">
                <thead>
                  <tr>
                    <th>Calories</th>
                    <th>Fat</th>
                    <th>Carbohydrates</th>
                    <th>Protein</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{props.nutrition.calories}</td>
                    <td>
                      {props.nutrition.fat ? props.nutrition.faculty : "0g"}
                    </td>
                    <td>
                      {props.nutrition.carbohydrates
                        ? props.nutrition.carbohydrates
                        : "0g"}
                    </td>
                    <td>
                      {props.nutrition.protein ? props.nutrition.protein : "0g"}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </>
          )}

          <Button
            className="w-100"
            variant="secondary"
            onClick={() => setToggleButton(!toggleButton)}
          >
            {toggleButton ? "Hide Nutrition Facts" : "Show Nutrition Facts"}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
