"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genome = void 0;
class Genome {
    constructor(brain) {
        this.fitnessScore = 0;
        this.brain = brain;
    }
    getBrain() {
        return this.brain;
    }
    getFitnessScore() {
        return this.fitnessScore;
    }
    predict(inputs) {
        return this.brain.predict(inputs).dataSync();
    }
    setFitnessScore(value) {
        this.fitnessScore = value;
    }
}
exports.Genome = Genome;
