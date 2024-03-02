import { Genome } from "./genome";
import { NeuralNetwork } from "./neuralNetwork";
import * as tf from "@tensorflow/tfjs";

export class Neat {
  private population: Genome[];
  private generation: number;
  private populationSize: number;
  private mutationRate: number;
  private savedOrganisms: Genome[];

  constructor(populationSize: number) {
    this.populationSize = populationSize;
    this.generation = 1;
    this.population = [];
    this.populationSize = populationSize;
    this.mutationRate = 0.4;
    this.savedOrganisms = [];
  }

  public getPopulation(): Genome[] {
    return this.population;
  }

  public getGeneration(): number {
    return this.generation;
  }
  public getMutationRate(): number {
    return this.mutationRate;
  }

  public setMutationRate(rate: number): void {
    this.mutationRate = rate;
  }

  initializePopulation(
    inputNodes: number,
    hiddenNodes: number,
    outputNodes: number
  ) {
    for (let i = 0; i < this.populationSize; i++) {
      const genome = new Genome(
        new NeuralNetwork(inputNodes, hiddenNodes, outputNodes)
      );
      this.population.push(genome);
    }
  }

  public evaluateFitness(): void {
    for (const genome of this.population) {
      genome.evaluateFitness();
    }
  }

  private selectParents(): { parent1: Genome; parent2: Genome } {
    const sortedPopulation = this.savedOrganisms
      .slice()
      .sort((a, b) => b.getFitnessScore() - a.getFitnessScore());
    const selectedParents = sortedPopulation.slice(0, 2);

    return {
      parent1: selectedParents[0],
      parent2: selectedParents[1],
    };
  }

  private performCrossover(parent1: Genome, parent2: Genome) {
    const newPopulation: Genome[] = [];

    tf.tidy(() => {
      const parent1HiddenWeights = parent1
        .getBrain()
        .getModel()
        .getWeights()[0];
      const parent1OutputBias = parent1.getBrain().getModel().getWeights()[3];

      const parent2HiddenBias = parent2.getBrain().getModel().getWeights()[1];
      const parent2OutputWeights = parent2
        .getBrain()
        .getModel()
        .getWeights()[2];

      const parentInputNodes = parent1.getBrain().getInputNodes();
      const parentHiddenNodes = parent1.getBrain().getHiddenNodes();
      const parentOutputNodes = parent1.getBrain().getOutputNodes();

      const newWeights: tf.Tensor[] = [
        parent1HiddenWeights,
        parent2HiddenBias,
        parent2OutputWeights,
        parent1OutputBias,
      ];

      for (let i = 0; i < this.populationSize; i++) {
        const childBrain = new NeuralNetwork(
          parentInputNodes,
          parentHiddenNodes,
          parentOutputNodes
        );
        childBrain.getModel().setWeights(newWeights);

        const child = new Genome(childBrain);
        newPopulation.push(child);
      }
    });
    return newPopulation;
  }

  private mutate(child: Genome): Genome {
    const model = child.getBrain().getModel();
    const weightMatrices = model.getWeights();

    tf.tidy(() => {
      for (let i = 0; i < weightMatrices.length; i++) {
        const currentMatrix = weightMatrices[i];
        const matrixValues: tf.Tensor<tf.Rank> = currentMatrix.clone();

        const mutableValues = matrixValues.arraySync() as number[][];
        for (const element of mutableValues) {
          for (let j = 0; j < element.length; j++) {
            if (Math.random() < this.mutationRate) {
              const offset = Math.random() * 2 - 1;

              element[j] = element[j] += offset;
            }
          }
        }
        const mutatedMatrix = tf.tensor(mutableValues);
        weightMatrices[i] = mutatedMatrix;
      }

      child.getBrain().getModel().setWeights(weightMatrices);
    });

    return child;
  }

  public evolveNextGeneration(): void {
    if (this.population.length > 0) return;

    this.evaluateFitness();

    const { parent1, parent2 } = this.selectParents();

    const offspringPopulation = this.performCrossover(parent1, parent2);

    const mutatedPopulation: Genome[] = [];
    for (let organism of offspringPopulation) {
      const mutatedOrganism = this.mutate(organism);
      mutatedPopulation.push(mutatedOrganism);
    }

    this.population = mutatedPopulation;
    for (let organism of this.savedOrganisms) {
      organism.getBrain().getModel().dispose();
    }
    this.savedOrganisms = [];

    this.generation++;
  }

  public removeOrganism(organism: Genome): void {
    const index = this.population.indexOf(organism);
    if (index !== -1) {
      this.savedOrganisms.push(organism);
      this.population.splice(index, 1);
    }
  }
}
