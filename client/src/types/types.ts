export interface Todo {
  _id?: string;
  content: string;
  user?: string;
  status?: string;
  date?: Date;
}

export interface Config {
  userId: string;
  time: string;
  homePage: string;
  choice: Choice;
}

export interface User {
  _id: string;
  username: string;
  config: Config;
  todo?: Todo[];
  choice?: Choice[];
}

export interface Choice {
  type: string;
  choiceId: string;
  date?: string;
  id?: string;
  _id?: string;
}
