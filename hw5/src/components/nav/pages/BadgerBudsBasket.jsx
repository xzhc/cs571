import { useContext } from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import { Row, Col, Card, ButtonGroup, Button } from "react-bootstrap";

export default function BadgerBudsBasket() {
  const buds = useContext(BadgerBudsDataContext);
  const saveCatIdsStr = sessionStorage.getItem("saveCatIds");
  const saveCatIds = saveCatIdsStr ? JSON.parse(saveCatIdsStr) : [];

  const adoptCatIdsStr = sessionStorage.getItem("adoptCatIds");
  const adoptCatIds = adoptCatIdsStr ? JSON.parse(adoptCatIdsStr) : [];

  //   console.log(saveCatIds);
  const saveCat = buds.filter(
    (bud) => saveCatIds.includes(bud.id) && !adoptCatIds.includes(bud.id)
  );

  const handleRemove = (catId, catName) => {
    const newSaveIds = saveCatIds.filter((id) => id !== catId);
    console.log(newSaveIds);
    sessionStorage.setItem("saveCatIds", JSON.stringify(newSaveIds));

    alert(`${catName} has been removed from your basket!`);

    window.location.reload();
  };

  const handleAdopt = (catId, catName) => {
    const newAdoptCatIds = [...adoptCatIds, catId];

    sessionStorage.setItem("adoptCatIds", JSON.stringify(newAdoptCatIds));

    alert(`${catName} has been adopted!`);

    window.location.reload();
  };
  return (
    <div>
      <h1>Badger Buds Basket</h1>
      <p>These cute cats could be all yours!</p>
      {saveCat.length > 0 ? (
        <Row>
          {saveCat.map((cat) => (
            <Col xs={12} sm={6} md={4} lg={3} key={cat.id}>
              <Card
                style={{
                  width: "18rem",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                }}
              >
                <Card.Img
                  variant="top"
                  src={` https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/${cat.imgIds[0]}`}
                  alt={`a picture of ${cat.name}`}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    marginBottom: "10px",
                    borderRadius: "10px 10px 0 0",
                  }}
                />
                <Card.Title
                  className="text-center"
                  style={{ fontSize: "1.25rem", fontWeight: "bold" }}
                >
                  {cat.name}
                </Card.Title>
                <ButtonGroup
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                    margin: "10px 20px",
                  }}
                >
                  <Button
                    variant="primary"
                    style={{ width: "45%" }}
                    onClick={() => handleRemove(cat.id, cat.name)}
                  >
                    Unselect
                  </Button>
                  <Button
                    variant="secondary"
                    style={{ width: "45%" }}
                    onClick={() => handleAdopt(cat.id, cat.name)}
                  >
                    💕Adopt
                  </Button>
                </ButtonGroup>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>You have no buds in your basket!</p>
      )}
    </div>
  );
}
