import fs from 'fs/promises';
import path from "path";
import { fileURLToPath } from "url";
import { heroesService } from "../services/heroesService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultImagePath = path.join(__dirname, "../images", "unknown.png");

export const heroesController = {
  async getAllSuperheroes(req, res) {
    try {
      const take = 5;
      const skip = take * (req.query.page - 1);

      const [superheroes, totalLength] = await heroesService.getAllSuperheroes(take, skip);

      res.send({
        superheroes,
        totalLength,
      });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },

  async getSuperheroById(req, res) {
    try {
      const heroId = Number(req.params.heroId);

      const superhero = await heroesService.getSuperheroById(heroId);

      if (!superhero) {
        res.sendStatus(404);
        return;
      }

      res.send(superhero);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },

  async updateSuperhero(req, res) {
    try {
      const heroId = Number(req.params.heroId);
      const filename = req?.file?.filename;
      const data = req.body;

      if (!data.markedImages) {
        data.markedImages = [];
      }

      const updatedSuperhero = await heroesService.updateSuperhero(heroId, data, filename);

      if (!updatedSuperhero) {
        res.sendStatus(404);
        return;
      }

      res.send(updatedSuperhero);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },

  async createSuperhero(req, res) {
    try {
      const superhero = req.body;
      const filename = req?.file?.filename;

      if (!superhero.images) {
        superhero.images = [];
      }

      const createdSuperhero = await heroesService.createSuperhero(superhero, filename);

      res.send(createdSuperhero);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },

  async deleteSuperhero(req, res) {
    try {
      const heroId = Number(req.params.heroId);

      const deletedSuperhero = await heroesService.deleteSuperhero(heroId);

      if (!deletedSuperhero) {
        res.sendStatus(404);
        return;
      }

      res.send(deletedSuperhero);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },

  async getImage(req, res) {
    try {
      const image = req.params.image;
      const imagePath = path.join(__dirname, "../images", image);

      await fs.access(imagePath);

      res.sendFile(imagePath);
    } catch (error) {
      res.sendFile(defaultImagePath);
    }
  },
};
