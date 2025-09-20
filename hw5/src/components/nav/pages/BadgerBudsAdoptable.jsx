import { useContext } from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Carousel } from "react-bootstrap";
import { useState } from "react";
export default function BadgerBudsAdoptable() {
  const buds = useContext(BadgerBudsDataContext);

  const [isShow, setIsShow] = useState({});

  const toggleShow = (id) => {
    setIsShow((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const [saveCatIds, setSaveCatIds] = useState(() => {
    const saved = sessionStorage.getItem("saveCatIds");
    return saved ? JSON.parse(saved) : [];
  });

  const adoptCatIdsStr = sessionStorage.getItem("adoptCatIds");
  const adoptCatIds = adoptCatIdsStr ? JSON.parse(adoptCatIdsStr) : [];

  const availableBuds = buds.filter(
    (bud) => !saveCatIds.includes(bud.id) && !adoptCatIds.includes(bud.id)
  );

  const handleSave = (catId, catName) => {
    if (!saveCatIds.includes(catId)) {
      setSaveCatIds((prev) => {
        const newSaved = [...prev, catId];
        sessionStorage.setItem("saveCatIds", JSON.stringify(newSaved));
        return newSaved;
      });

      alert(`${catName} has been saved to your basket!`);
    }
  };

  return (
    <div>
      <h1>Available Badger Buds</h1>
      <p>The following cats are looking for a loving home! Could you help?</p>

      {buds.length > 0 ? (
        availableBuds.length > 0 ? (
          <Row className="g-4">
            {availableBuds.map((bud) => (
              <Col xs={12} sm={6} md={4} lg={3} key={bud.id}>
                <Card
                  style={{
                    width: "18rem",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "10px",
                  }}
                >
                  {isShow[bud.id] && bud.imgIds.length > 1 ? (
                    <Carousel
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    >
                      {bud.imgIds.map((imgId, index) => (
                        <Carousel.Item
                          key={index}
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                            marginBottom: "10px",
                            borderRadius: "10px 10px 0 0",
                          }}
                        >
                          <img
                            src={` https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/${imgId}`}
                            alt={`a picture of ${bud.name}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  ) : (
                    <Card.Img
                      variant="top"
                      src={` https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/${bud.imgIds[0]}`}
                      alt={`a picture of ${bud.name}`}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        marginBottom: "10px",
                        borderRadius: "10px 10px 0 0",
                      }}
                    />
                  )}
                  <Card.Title
                    className="text-center"
                    style={{ fontSize: "1.25rem", fontWeight: "bold" }}
                  >
                    {bud.name}
                  </Card.Title>
                  {isShow[bud.id] && (
                    <>
                      <Card.Text style={{ margin: "0 10px" }}>
                        {bud.gender}
                      </Card.Text>
                      <Card.Text style={{ margin: "0 10px" }}>
                        {bud.breed}
                      </Card.Text>
                      <Card.Text style={{ margin: "0 10px" }}>
                        {bud.age}
                      </Card.Text>
                      {bud.description && (
                        <Card.Text style={{ margin: "0 10px" }}>
                          {bud.description}
                        </Card.Text>
                      )}
                    </>
                  )}

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
                      onClick={() => toggleShow(bud.id)}
                    >
                      {isShow[bud.id] ? "show less" : "show more"}
                    </Button>
                    <Button
                      variant="secondary"
                      style={{ width: "45%" }}
                      onClick={() => handleSave(bud.id, bud.name)}
                    >
                      ❤️Save
                    </Button>
                  </ButtonGroup>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p>No buds are available for adoption!</p>
        )
      ) : (
        <p>The buds is loading!</p>
      )}
    </div>
  );
}
