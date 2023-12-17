import { Request, Response } from 'express';
import axios from 'axios';

import {
  getTodayChoice,
  createChoice,
  updateUserChoice,
} from '../model/choice.model';
import { Bar, BarResponseWithIndex, Brewery } from '../type/place';

const BASE_URL = {
  bar: process.env.BAR_BASE_URL,
  brewery: process.env.BREWERY_BASE_URL,
};

const getTodayBeerOption = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const todayChoice = await getTodayChoice(userId);

    if (!todayChoice) {
      throw "Can not find today's choice";
    }

    const { url, type } = todayChoice;
    const result = await axios.get(url);
    const info = result.data as Bar | Brewery;

    res.status(200).send({ type, info });
    return;
  } catch (error) {
    res.status(400).send(error);
    return;
  }
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

    // get random
    let composedUrl = '';
    const url = BASE_URL[type];
    const randomUrl = `${url}/random`;
    const response = await axios.get(randomUrl);

    if (type === 'bar') {
      // ? Is it necessary to get complete data here? Seems a bit of waste. Or just the index?
      const randomBar = response.data as BarResponseWithIndex;
      const { index } = randomBar;
      composedUrl = `${url}/${index}`;
    }
    if (type === 'brewery') {
      const randomBrewery = (response.data as Brewery[])[0];
      const { id } = randomBrewery;
      composedUrl = `${url}/${id}`;
    }

    // save random to database
    const choice = await createChoice(userId, type, composedUrl);
    const choiceId = choice.id;
    await updateUserChoice(userId, choiceId);

    res.status(201).end();
    return;
  } catch (error) {
    res.status(400).send(error);
    return;
  }
};

export { getTodayBeerOption, postBeerOption };
