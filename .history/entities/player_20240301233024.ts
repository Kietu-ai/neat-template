import { Genome } from "./genome";
import { NeuralNetwork } from "./neuralNetwork";

export class Player extends Genome {
  private score: number;
  constructor(brain: NeuralNetwork) {
    super(brain);
    this.score = 0;
  }

  getScore(): number {
    return this.score;
  }
  evaluateFitness() {
    this.fitnessScore = this.score * this.score;
  }
  think(): void {
    const outputs = this.predict([Math.random(), 0.3, 0.3]);
    const maxIndex = outputs.indexOf(Math.max(...outputs));
    switch (maxIndex) {
      case 0:
        break;
      case 1:
        break;
      default:
    }
  }
}
