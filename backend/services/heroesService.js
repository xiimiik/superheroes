import fs from "fs/promises";
import path from "path";
import { prisma } from "../prisma-client.js";
import { fileURLToPath } from "url";
import { parseImages } from "../helpers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const heroesService = {
  async getAllSuperheroes(take, skip) {
    const [data, totalLength] = await Promise.all([
      prisma.superhero.findMany({
        take,
        skip,
      }),
      prisma.superhero.count(),
    ]);

    return [data.map(parseImages), totalLength];
  },

  async getSuperheroById(heroId) {
    const superhero = await prisma.superhero.findUnique({
      where: { id: heroId },
    });

    return superhero ? parseImages(superhero) : null;
  },

  async updateSuperhero(heroId, data, filename) {
    const superhero = await prisma.superhero.findUnique({
      where: {
        id: heroId,
      },
    });

    let images = JSON.parse(superhero.images);

    if (data.markedImages.length > 0) {
      images = images.filter((image) => !data.markedImages.includes(image));
      data.markedImages.forEach(async (element) => {
        try {
          const imgPath = path.join(__dirname, "../images", element)

          await fs.access(imgPath);
          fs.rm(imgPath);
        } catch (e) {
          console.log(e)
        }
      });
    }

    if (filename) {
      images.push(filename);
    }

    const updatedSuperhero = await prisma.superhero.update({
      where: {
        id: heroId,
      },
      data: {
        nickname: data.nickname,
        real_name: data.real_name,
        superpowers: data.superpowers,
        origin_description: data.origin_description,
        catch_phrase: data.catch_phrase,
        images: JSON.stringify(images),
      },
    });

    return updatedSuperhero ? parseImages(updatedSuperhero) : null;
  },

  async createSuperhero(superhero, filename) {
    const createdSuperhero = await prisma.superhero.create({
      data: {
        ...superhero,
        images: JSON.stringify([filename]),
      },
    });

    return parseImages(createdSuperhero);
  },

  async deleteSuperhero(heroId) {
    const superhero = await prisma.superhero.findUnique({
      where: {
        id: heroId,
      },
      select: {
        images: true,
      },
    });

    const deletedSuperhero = await prisma.superhero.delete({
      where: { id: heroId },
    });

    JSON.parse(superhero.images).forEach(
      (element) => fs.rm(
        path.join(__dirname, "../images", element)
      )
    );

    return deletedSuperhero ? parseImages(deletedSuperhero) : null;
  },
};
