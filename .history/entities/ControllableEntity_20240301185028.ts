export interface ControllableEntity {
  evaluateFitness(): number;
  predict(inputs?: number[]): [];
}
