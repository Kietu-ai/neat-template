import * as tf from "@tensorflow/tfjs";
import { ActivationIdentifier } from "../types";

export class NeuralNetwork {
  private model: tf.Sequential;
  private inputNodes: number;
  private hiddenNodes: number;
  private outputNodes: number;
  private hiddenActivatinFunction: ActivationIdentifier | undefined;
  private outputActivatinFunction: ActivationIdentifier | undefined;

  constructor(
    inputNodes: number,
    hiddenNodes: number,
    outputNodes: number,
    hiddenActivatinFunction?: ActivationIdentifier | undefined,
    outputActivatinFunction?: ActivationIdentifier | undefined
  ) {
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;
    this.hiddenActivatinFunction = hiddenActivatinFunction || "relu";
    this.outputActivatinFunction = outputActivatinFunction || "softmax";
    this.model = this.createModel();
  }

  createModel() {
    const model = tf.sequential();
    model.add(
      tf.layers.dense({
        units: this.hiddenNodes,
        activation: this.hiddenActivatinFunction,
        inputShape: [this.inputNodes],
      })
    );
    model.add(
      tf.layers.dense({
        units: this.outputNodes,
        activation: this.outputActivatinFunction,
      })
    );
    model.compile({ optimizer: "sgd", loss: "meanSquaredError" });
    return model;
  }

  public predict(inputs: number[]): tf.Tensor {
    return tf.tidy(() => {
      const inputTensor = tf.tensor2d([inputs]);
      const outputs = this.model.predict(inputTensor) as tf.Tensor;
      return outputs.clone();
    });
  }

  public getModel(): tf.Sequential {
    return this.model;
  }

  public getInputNodes(): number {
    return this.inputNodes;
  }

  public getHiddenNodes(): number {
    return this.hiddenNodes;
  }

  public getOutputNodes(): number {
    return this.outputNodes;
  }
  public async saveWeights(path: string): Promise<void> {
    await this.model.save(`file://${path}`);
  }

  public async loadWeights(path: string): Promise<void> {
    this.model = (await tf.loadLayersModel(`file://${path}`)) as tf.Sequential;
  }
}
