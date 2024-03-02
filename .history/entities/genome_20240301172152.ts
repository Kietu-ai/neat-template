import { NeuralNetwork } from "./neuralNetwork";

export class Genome {
  protected brain: NeuralNetwork;
  protected fitnessScore: number;

  constructor(brain: NeuralNetwork) {
    this.brain = brain;
    this.fitnessScore = 0;
  }
}
