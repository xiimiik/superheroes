import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { createHero } from "../api/fetchHeroes";

function AddEditForm({ setIsFormActive }) {
  const [superhero, setSuperhero] = useState({
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: "",
    catch_phrase: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSuperhero((prevSuperhero) => ({
      ...prevSuperhero,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSuperhero((prevSuperhero) => ({
      ...prevSuperhero,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createHero(superhero);
    setSuperhero({
      nickname: "",
      real_name: "",
      origin_description: "",
      superpowers: "",
      catch_phrase: "",
      image: null,
    });
    setIsFormActive(false);
  };

  return (
    <div className='container'>
      <Form onSubmit={handleSubmit} encType='multipart/form-data'>
        <FormGroup>
          <Label for='nickname'>Nickname</Label>
          <Input
            type='text'
            name='nickname'
            id='nickname'
            value={superhero.nickname}
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
            value={superhero.real_name}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for='superpowers'>Superpowers</Label>
          <Input
            type='text'
            name='superpowers'
            id='superpowers'
            value={superhero.superpowers}
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
            value={superhero.origin_description}
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
            value={superhero.catch_phrase}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for='image'>Image</Label>
          <Input type='file' name='image' id='image' accept='image/*' onChange={handleImageChange} required />
        </FormGroup>
        <Button type='submit' color='primary' className='mt-4'>
          Add Superhero
        </Button>
      </Form>
    </div>
  );
}

export default AddEditForm;
