import express from "express";
const router = express.Router();
import {
  POST_A_FIGHTER,
  DELETE_A_FIGHTER,
  UPDATE_A_FIGHTER,
  GET_A_FIGHTER,
  GET_ALL_FIGHTERS,
  SORT_BY_NUMBER_OF_FIGHTS,
  SORT_BY_WEIGHT,
  SORT_BY_HEIGHT,
  SORT_BY_LOSSES,
  SORT_BY_WINS,
  SORT_BY_AGE,
  GET_A_RANDOM_FIGHTER,
} from "../controller/fighter.js";
import auth from "../middleware/authorization.js";

router.post("/fighters", auth, POST_A_FIGHTER);
router.delete("/fighters/:id", auth, DELETE_A_FIGHTER);
router.put("/fighters/:id", auth, UPDATE_A_FIGHTER);
router.get("/fighters/:id", auth, GET_A_FIGHTER);
router.get("/fighters/", auth, GET_ALL_FIGHTERS);
router.get("/fightersNoF", auth, SORT_BY_NUMBER_OF_FIGHTS);
router.get("/fightersLs", auth, SORT_BY_LOSSES);
router.get("/fightersWs", auth, SORT_BY_WINS);
router.get("/fightersAge", auth, SORT_BY_AGE);
router.get("/fightersWgh", auth, SORT_BY_WEIGHT);
router.get("/fightersHgh", auth, SORT_BY_HEIGHT);
router.get("/fightersRan", auth, GET_A_RANDOM_FIGHTER);

export default router;
