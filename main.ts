import { Neat } from "./neat/neat";
import * as tf from "@tensorflow/tfjs";

tf.setBackend("cpu");

const populationSize = 10;
const neat = new Neat(populationSize);

const inputNodes = 5;
const hiddenNodes = 2;
const outputNodes = 2;

neat.initializePopulation(inputNodes, hiddenNodes, outputNodes);
neat.setMutationRate(0.3);
const population = neat.getPopulation();
for (let i = population.length - 1; i >= 0; i--) {
  const player = population[i];
  neat.removePlayer(player);
}

neat.evolveNextGeneration();
