import { Genome } from "./genome";
import { NeuralNetwork } from "./neuralNetwork";

export class Player extends Genome {
 
  private score: number;
  constructor(brain: NeuralNetwork) {
    super(brain);
    this.score = 0;
  }
  evaluateFitness() {
    this.fitnessScore = this.score * this.score;
  }
  think(): void {
    const outputs = 
  }
}
