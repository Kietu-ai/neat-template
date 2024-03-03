import { Neat } from "./entities/neat";
import * as tf from "@tensorflow/tfjs";

tf.setBackend("cpu");

const populationSize = 10;
const neat = new Neat(populationSize);

const inputNodes = 3;
const hiddenNodes = 2;
const outputNodes = 2;

neat.initializePopulation(inputNodes, hiddenNodes, outputNodes);

const population = neat.getPopulation();
//for (let i = population.length - 1; i >= 0; i--) {
//const player = population[i];
//neat.removePlayer(player);
//}

console.log("hi");
neat.evolveNextGeneration();
