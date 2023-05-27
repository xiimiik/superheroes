import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { deleteHero } from "../api/fetchHeroes";
import EditForm from "../components/EditForm";
import { routs } from "../routes/router";

function SuperheroPage() {
  const superhero = useLoaderData();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleDeleteClick = async () => {
    await deleteHero(superhero.id);

    navigate(routs.MAIN);
  };



  return (
    <div className='container'>
      <Card>
        <CardBody>
          {isEditMode ? (
            <EditForm superhero={superhero} setIsEditMode={setIsEditMode} />
          ) : (
            <>
              <CardTitle tag='h3'>{superhero.nickname}</CardTitle>
              <CardText>
                <strong>Real Name:</strong> {superhero.real_name}
              </CardText>
              <CardText>
                <strong>Origin Description:</strong> {superhero.origin_description}
              </CardText>
              <CardText>
                <strong>Superpowers:</strong> {superhero.superpowers}
              </CardText>
              <CardText>
                <strong>Catch Phrase:</strong> {superhero.catch_phrase}
              </CardText>
              <div className='d-flex flex-wrap gap-4 justify-content-center'>
                {superhero.images.map((image, i) => (
                  <CardImg
                    key={image}
                    src={`http://localhost:8080/images/${image}`}
                    alt={superhero.nickname}
                    style={{
                      height: "300px",
                      width: "240px",
                      objectFit: "contain",
                    }}
                  />
                ))}
              </div>
              <div className='mt-4'>
                <Button color='primary' className='me-3' onClick={handleEditClick}>
                  Edit
                </Button>
                <Button color='danger' onClick={handleDeleteClick}>
                  Delete
                </Button>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default SuperheroPage;
