import { ControllableEntity } from "./controllableEntity";
import { NeuralNetwork } from "./neuralNetwork";

export class Genome<T extends ControllableEntity> {
  protected brain: NeuralNetwork;
  protected fitnessScore: number;
  private entity: T | null;

  constructor(brain: NeuralNetwork) {
    this.brain = brain;
    this.fitnessScore = 0;
    this.entity = null;
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

  public getEntity(): T {
    return this.entity;
  }
  public setEntity(entity: T) {
    this.entity = entity;
  }
  public getPrediction(inputs: number[]) {
    return this.brain.predict(inputs).dataSync();
  }

  public evaluateFitness(): void {
    if (!this.entity) return;
    this.entity.evaluateFitness();
  }
}
