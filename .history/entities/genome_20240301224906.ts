import { ControllableEntity } from "./controllableEntity";
import { NeuralNetwork } from "./neuralNetwork";

export class Genome<T extends ControllableEntity> {
  protected brain: NeuralNetwork;
  protected fitnessScore: number;

  constructor(brain: NeuralNetwork) {
    this.brain = brain;
    this.fitnessScore = 0;
  }

  public getBrain(): NeuralNetwork {
    return this.brain;
  }
  public setBrain(brain: NeuralNetwork) {
    this.brain = brain;
  }

  public getFitnessScore(): number {
    return this.fitnessScore;
  }

  public setFitnessScore(value: number) {
    this.fitnessScore = value;
  }

  public getPrediction(inputs: number[]) {
    return this.brain.predict(inputs).dataSync();
  }

  public evaluateFitness(): void {}
}
