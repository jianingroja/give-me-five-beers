import { Request, Response } from 'express';
import axios from 'axios';

import {
  getTodayChoice,
  createChoice,
  updateUserChoice,
} from '../model/choice.model';
import { BarResponseWithIndex, Brewery } from '../type/place';

const BASE_URL = {
  bar: process.env.BAR_BASE_URL,
  brewery: process.env.BREWERY_BASE_URL,
};

const postBeerOption = async (req: Request, res: Response) => {
  try {
    const {
      params: { type },
      body: { userId },
    } = req;

    if (type !== 'bar' && type !== 'brewery') {
      throw 'not the right type of drink';
    }

    // prevent multiple choices
    const hasTodayChoice = await getTodayChoice(userId);
    console.log(hasTodayChoice);
    if (hasTodayChoice) {
      throw 'only one drink per day';
    }

    // get random and send to client
    const url = BASE_URL[type];
    const randomUrl = `${url}/random`;
    let composedUrl = '';

    const response = await axios.get(randomUrl);
    if (type === 'bar') {
      const randomBar = response.data as BarResponseWithIndex;
      const { bar, index } = randomBar;
      composedUrl = `${url}/${index}`;

      res.status(201).send({ info: bar });
    }
    if (type === 'brewery') {
      const randomBrewery = (response.data as Brewery[])[0];
      const { id } = randomBrewery;
      composedUrl = `${url}/${id}`;

      res.status(201).send({ info: randomBrewery });
    }

    // save random to database
    const choice = await createChoice(userId, type, composedUrl);
    const choiceId = choice.id;
    await updateUserChoice(userId, choiceId);

    return;
  } catch (error) {
    res.status(400).send(error);
  }
};

export { postBeerOption };
