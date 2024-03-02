export interface ControllableEntity {
  evaluateFitness(): number;
  think(): void;
}
