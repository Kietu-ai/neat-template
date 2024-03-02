import { Bird } from "./entities/bird";
import { Neat } from "./entities/neat";
import * as tf from "@tensorflow/tfjs";

tf.setBackend("cpu");

const populationSize = 10;
const neat = new Neat<Bird>(populationSize);

const inputNodes = 3;
const hiddenNodes = 2;
const outputNodes = 2;

neat.initializePopulation(inputNodes, hiddenNodes, outputNodes);

for (let genome of neat.getPopulation()) {
  const bird = new Bird(genome);
  genome.setEntity(bird);
}

for (let i = 0; i < 10; i++) {
  if (neat.getPopulation().length <= 0) {
  }

  for (let genome of neat.getPopulation()) {
    genome.getEntity().update();
  }

  neat.evolveNextGeneration();
}

console.log(neat.getPopulation()[0]);
