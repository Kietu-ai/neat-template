export type ActivationIdentifier =
  | "elu"
  | "hardSigmoid"
  | "linear"
  | "relu"
  | "relu6"
  | "selu"
  | "sigmoid"
  | "softmax"
  | "softplus"
  | "softsign"
  | "tanh"
  | "swish"
  | "mish";

export type CrossoverIdentifier = "weightandbiascombination" | "probabilistic";
