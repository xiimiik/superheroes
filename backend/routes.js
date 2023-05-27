import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { heroesController } from "./controllers/heroesController.js";
import { loadNewHeroes } from "./helpers.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: path.join(__dirname, "images"),
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".");
    cb(null, `${file.fieldname}-${Date.now()}.${ext[ext.length - 1]}`);
  },
});
const upload = multer({ storage });

loadNewHeroes();

router.get("/superheroes", heroesController.getAllSuperheroes);
router.get("/superheroes/:heroId", heroesController.getSuperheroById);
router.put("/superheroes/:heroId", upload.single("image"), heroesController.updateSuperhero);
router.post("/superheroes", upload.single("image"), heroesController.createSuperhero);
router.delete("/superheroes/:heroId", heroesController.deleteSuperhero);

router.get("/images/:image", heroesController.getImage);

export default router;
