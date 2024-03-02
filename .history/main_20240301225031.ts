import { PLayer } from "./entities/bird";
import { Neat } from "./entities/neat";
import * as tf from "@tensorflow/tfjs";

tf.setBackend("cpu");

const populationSize = 10;
const neat = new Neat<PLayer>(populationSize);

const inputNodes = 3;
const hiddenNodes = 2;
const outputNodes = 2;

neat.initializePopulation(inputNodes, hiddenNodes, outputNodes);
