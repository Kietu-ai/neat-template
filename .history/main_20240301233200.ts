import { Neat } from "./entities/neat";
import * as tf from "@tensorflow/tfjs";

tf.setBackend("cpu");

const populationSize = 10;
const neat = new Neat(populationSize);

const inputNodes = 3;
const hiddenNodes = 2;
const outputNodes = 2;

neat.initializePopulation(inputNodes, hiddenNodes, outputNodes);

for (let player of neat.getPopulation()) {
  if (player.getScore() < 0) {
    neat.removePlayer(player);
  }
}

neat.evolveNextGeneration();
