"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const genome_1 = require("./genome");
class Player extends genome_1.Genome {
    constructor(brain) {
        super(brain);
        this.score = 0;
    }
    getScore() {
        return this.score;
    }
    evaluateFitness() {
        this.fitnessScore = this.score * this.score;
    }
    think() {
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
exports.Player = Player;
