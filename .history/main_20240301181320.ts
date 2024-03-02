import { Bird } from "./entities/bird";
import { Genome } from "./entities/genome";
import { Neat } from "./entities/neat";

const populationSize = 10;
const neat = new Neat<Bird>(populationSize);

const inputNodes = 3;
const hiddenNodes = 2;
const outputNodes = 2;

neat.initializePopulation(inputNodes, hiddenNodes, outputNodes);

let genomes: Genome<Bird>[] = neat.getPopulation();
const birds: Bird[] = [];

for (let genome of genomes) {
  const bird = new Bird();
  birds.push(bird);
  genome.setEntity(bird);
}
