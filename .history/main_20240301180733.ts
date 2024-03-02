import { Bird } from "./entities/bird";
import { Neat } from "./entities/neat";

const populationSize = 10;
const neat = new Neat<Bird>(populationSize);

const inputNodes = 3;
const hiddenNodes = 2;
const outputNodes = 2;

neat.initializePopulation(inputNodes, hiddenNodes, outputNodes);

const birds: Bird[] = [];

for (let organism of neat.getPopulation()) {
  const bird = new Bird();
  organism.setEntity(bird);
}

for (let i = 0; i < 10; i++) {}
