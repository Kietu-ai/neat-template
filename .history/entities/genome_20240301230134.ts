import { NeuralNetwork } from "./neuralNetwork";

abstract class Genome {
  protected fitnessScore: number;
  protected brain: NeuralNetwork;

  constructor(brain: NeuralNetwork) {
    this.fitnessScore = 0;
    this.brain = brain;
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
