import { NeuralNetwork } from "./neuralNetwork";

export abstract class Genome {
  protected fitnessScore: number;
  protected brain: NeuralNetwork;

  constructor(brain: NeuralNetwork) {
    this.fitnessScore = 0;
    this.brain = brain;
  }
  getBrain(): NeuralNetwork {
    return this.brain;
  }

  abstract evaluateFitness(): void;
  abstract applyAction(): void;

  public getFitnessScore(): number {
    return this.fitnessScore;
  }

  public predict(inputs: []) {
    return this.brain.predict(inputs);
  }
  public setFitnessScore(value: number) {
    this.fitnessScore = value;
  }
}
