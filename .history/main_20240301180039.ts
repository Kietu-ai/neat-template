import { Bird } from "./entities/bird";
import { Neat } from "./entities/neat";

const populationSize = 10;
const neat = new Neat<Bird>(populationSize);

const inputNodes = 3;
const hiddenNodes = 2;
const outputNodes = 2;

const population = neat.initializePopulation(
  inputNodes,
  hiddenNodes,
  outputNodes
);
