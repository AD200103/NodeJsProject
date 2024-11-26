import FighterModel from "../model/fighter.js";
import { v4 as uuidv4 } from "uuid";

const POST_A_FIGHTER = async (req, res) => {
  try {
    const newFighter = {
      id: uuidv4(),
      name: req.body.name,
      age: req.body.age,
      height: req.body.height,
      weight: req.body.weight,
      fights: req.body.fights,
      wins: req.body.wins,
      draws: req.body.draws,
      losses: req.body.fights - req.body.wins - req.body.draws,
      style: req.body.style,
      country: req.body.country,
      userId: req.body.userId,
    };
    const fighter = new FighterModel(newFighter);
    const response = await fighter.save();
    const fighters = await FighterModel.find({ userId: req.body.userId });

    if (response) {
      return res
        .status(201)
        .json({ message: "Fighter added successfully!", fighters: fighters });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
};

const DELETE_A_FIGHTER = async (req, res) => {
  try {
    const fighterId = await FighterModel.findOne({ id: req.params.id });
    if (fighterId.userId !== req.body.userId) {
      return res.status(403).json("You dont have access to this fighter!");
    }

    const fighter = await FighterModel.findOneAndDelete({ id: req.params.id });
    const fighters = await FighterModel.find({ userId: req.body.userId });
    if (fighter) {
      return res
        .status(200)
        .json({ message: "Fighter deleted successfully!", fighters: fighters });
    }
    return res.status(404).json("Such fighter does not exist!");
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
};

const UPDATE_A_FIGHTER = async (req, res) => {
  try {
    const fighterId = await FighterModel.findOne({ id: req.params.id });
    if (fighterId.userId !== req.body.userId) {
      return res.status(403).json("You dont have access to this fighter!");
    }

    const fighter = await FighterModel.findOneAndUpdate(
      { id: req.params.id },
      { ...req.body },
      { new: true }
    );
    if (fighter) {
      return res
        .status(200)
        .json({ message: "Fighter updated successfully!", fighter: fighter });
    }
    return res.status(404).json("Such fighter does not exist!");
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
};

const GET_A_FIGHTER = async (req, res) => {
  try {
    const fighterId = await FighterModel.findOne({ id: req.params.id });
    if (fighterId.userId !== req.body.userId) {
      return res.status(403).json("You dont have access to this fighter!");
    }

    const fighter = await FighterModel.findOne({ id: req.params.id });
    if (fighter) {
      return res.status(200).json(fighter);
    }
    return res.status(404).json("Such fighter does not exist!");
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
};

const GET_ALL_FIGHTERS = async (req, res) => {
  try {
    const fighters = await FighterModel.find({ userId: req.body.userId });
    return res.status(200).json(fighters);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
};

const SORT_BY_NUMBER_OF_FIGHTS = async (req, res) => {
  try {
    const fighters = await FighterModel.find({ userId: req.body.userId });
    const fightersSorted = fighters.sort((a, b) => b.fights - a.fights);
    if (fighters.length !== 0) {
      return res.status(200).json(fightersSorted);
    }
    return res.status(404).json({ message: "There are no fighters to sort!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
};

const SORT_BY_WEIGHT = async (req, res) => {
  try {
    const fighters = await FighterModel.find({ userId: req.body.userId });
    const fightersSorted = fighters.sort(
      (a, b) => parseFloat(b.weight) - parseFloat(a.weight)
    );
    if (fighters.length !== 0) {
      return res.status(200).json(fightersSorted);
    }
    return res.status(404).json({ message: "There are no fighters to sort!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
};

const SORT_BY_HEIGHT = async (req, res) => {
  try {
    const fighters = await FighterModel.find({ userId: req.body.userId });
    const fightersSorted = fighters.sort(
      (a, b) => parseFloat(b.height) - parseFloat(a.height)
    );
    if (fighters.length !== 0) {
      return res.status(200).json(fightersSorted);
    }
    return res.status(404).json({ message: "There are no fighters to sort!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
};

const SORT_BY_LOSSES = async (req, res) => {
  try {
    const fighters = await FighterModel.find({ userId: req.body.userId });
    const fightersSorted = fighters.sort((a, b) => b.losses - a.losses);
    if (fighters.length !== 0) {
      return res.status(200).json(fightersSorted);
    }
    return res.status(404).json({ message: "There are no fighters to sort!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
};

const SORT_BY_WINS = async (req, res) => {
  try {
    const fighters = await FighterModel.find({ userId: req.body.userId });
    const fightersSorted = fighters.sort((a, b) => b.wins - a.wins);
    if (fighters.length !== 0) {
      return res.status(200).json(fightersSorted);
    }
    return res.status(404).json({ message: "There are no fighters to sort!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
};

const SORT_BY_AGE = async (req, res) => {
  try {
    const fighters = await FighterModel.find({ userId: req.body.userId });
    const fightersSorted = fighters.sort(
      (a, b) => parseFloat(b.age) - parseFloat(a.age)
    );
    if (fighters.length !== 0) {
      return res.status(200).json(fightersSorted);
    }
    return res.status(404).json({ message: "There are no fighters to sort!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
};

const GET_A_RANDOM_FIGHTER = async (req, res) => {
  try {
    const fighters = await FighterModel.find({ userId: req.body.userId });
    const randIndex = Math.floor(Math.random() * fighters.length);
    if (fighters.length !== 0) {
      return res.status(200).json(fighters[randIndex]);
    }
    return res
      .status(404)
      .json({ message: "There are no fighters to choose from!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
};

export {
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
};
