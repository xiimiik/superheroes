import axios from "axios";

const BASE_URL = "http://localhost:8080/superheroes";

export const getHeroes = async ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");

  return fetch(BASE_URL + `?page=${page || 1}`);
};

export const getHero = async ({ params }) => {
  const heroId = params.heroId;

  return fetch(BASE_URL + `/${heroId}`);
};

export const createHero = async (superhero) => {
  return await axios.post(BASE_URL, superhero, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
};

export const updateHero = async (updatedSuperhero) => {
  return await axios.put(BASE_URL + `/${updatedSuperhero.id}`, updatedSuperhero, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
};

export const deleteHero = async (heroId) => {
  return await axios.delete(BASE_URL + `/${heroId}`);
};
