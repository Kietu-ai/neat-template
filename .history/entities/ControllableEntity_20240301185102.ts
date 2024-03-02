export interface ControllableEntity {
  evaluateFitness(): number;
  predict(genome: Genome, inputs?: number[]): void;
}
