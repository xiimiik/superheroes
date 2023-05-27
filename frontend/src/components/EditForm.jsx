import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, CardImg } from "reactstrap";
import { updateHero } from "../api/fetchHeroes";
import { useNavigate } from "react-router-dom";
import { routs } from "../routes/router";

function EditForm({ superhero, setIsEditMode }) {
  const navigate = useNavigate();
  const [updatedSuperhero, setUpdatedSuperhero] = useState({
    ...superhero,
  });
  const [markedImages, setMarkedImages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSuperhero((prevSuperhero) => ({
      ...prevSuperhero,
      [name]: value,
    }));
  };

  const handleImageToggle = (image) => {
    const isMarked = markedImages.includes(image);

    if (isMarked) {
      setMarkedImages((prevImages) => prevImages.filter((img) => img !== image));
    } else {
      setMarkedImages((prevImages) => [...prevImages, image]);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUpdatedSuperhero((prevSuperhero) => ({
      ...prevSuperhero,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...updatedSuperhero,
      markedImages,
    };

    await updateHero(data);

    setIsEditMode(false);
    setMarkedImages([]);
    navigate(routs.MAIN + superhero.id);
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
    setUpdatedSuperhero(superhero);
    setMarkedImages([]);
  };

  return (
    <Form onSubmit={handleSubmit} encType='multipart/form-data'>
      <FormGroup>
        <Label for='nickname'>Nickname</Label>
        <Input
          type='text'
          name='nickname'
          id='nickname'
          value={updatedSuperhero.nickname}
          onChange={handleInputChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for='real_name'>Real Name</Label>
        <Input
          type='text'
          name='real_name'
          id='real_name'
          value={updatedSuperhero.real_name}
          onChange={handleInputChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for='origin_description'>Origin Description</Label>
        <Input
          type='textarea'
          name='origin_description'
          id='origin_description'
          value={updatedSuperhero.origin_description}
          onChange={handleInputChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for='catch_phrase'>Catch Phrase</Label>
        <Input
          type='text'
          name='catch_phrase'
          id='catch_phrase'
          value={updatedSuperhero.catch_phrase}
          onChange={handleInputChange}
          required
        />
      </FormGroup>
      <p>Mark the image to delete: </p>
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
              border: markedImages.includes(image) ? "2px solid red" : "none",
            }}
            onClick={() => handleImageToggle(image)}
          />
        ))}
      </div>
      <FormGroup>
        <Label for='image'>Add new image</Label>
        <Input type='file' name='image' id='image' accept='image/*' onChange={handleImageChange} />
      </FormGroup>
      <div className='mt-4'>
        <Button type='submit' color='primary' className='me-3'>
          Save
        </Button>
        <Button color='secondary' onClick={handleCancelClick}>
          Cancel
        </Button>
      </div>
    </Form>
  );
}

export default EditForm;
