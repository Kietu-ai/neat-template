import { NeuralNetwork } from "./neuralNetwork";

abstract class Genome {
  protected fitnessScore: number;
  protected brain: NeuralNetwork;

  constructor() {
    this.fitnessScore = 0;
  }
  abstract getBrain(): NeuralNetwork;

  abstract evaluateFitness(): number;

  public getFitnessScore(): number {
    return this.fitnessScore;
  }

  public setFitnessScore(value: number) {
    this.fitnessScore = value;
  }
}
