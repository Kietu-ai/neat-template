import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Obstacle } from "./entities/obstacle";
import * as tf from "@tensorflow/tfjs";
import { Neat } from "../neat/neat";
import {
  DINO_SIZE,
  ENTITIES_INIT_Y_POS,
  MAX_OBSTACLES,
  MIN_SPACE,
  SPAWN_INTERVAL,
} from "./constants";

tf.setBackend("cpu");

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
  -window.innerWidth / 100,
  window.innerWidth / 100,
  window.innerHeight / 100,
  -window.innerHeight / 100,
  0.1,
  1000
);
camera.position.set(0, 0, 10);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const populationSize = 20;
const neat = new Neat(populationSize);

const inputNodes = 5;
const hiddenNodes = 2;
const outputNodes = 2;
neat.initializePopulation(inputNodes, hiddenNodes, outputNodes);

// Create Ground
const groundHeight = 2;
const groundGeometry = new THREE.PlaneGeometry(30, groundHeight);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.position.set(0, -8, 0);
scene.add(ground);

const playerMeshes: THREE.Mesh[] = [];
let population = neat.getPopulation();
const obstacleMeshes: THREE.Mesh[] = [];
const obstacles: Obstacle[] = [];
let frameCounter = 0;

restartGame();

function restartGame() {
  for (const mesh of playerMeshes) {
    scene.remove(mesh);
  }
  playerMeshes.length = 0;

  for (const mesh of obstacleMeshes) {
    scene.remove(mesh);
  }
  obstacleMeshes.length = 0;
  obstacles.length = 0;

  population = neat.getPopulation();
  for (const player of population) {
    const dinoMesh = new THREE.Mesh(
      new THREE.BoxGeometry(DINO_SIZE, DINO_SIZE, DINO_SIZE),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    playerMeshes.push(dinoMesh);
    dinoMesh.position.set(player.position.x, ENTITIES_INIT_Y_POS, 0);
    scene.add(dinoMesh);
  }
}

function spawnObstacle() {
  const obstacle = new Obstacle();
  const obstacleMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  );

  const newYPos = Math.random() < 0.3 ? 0 : ENTITIES_INIT_Y_POS;
  obstacle.position.y = newYPos;
  obstacleMesh.position.set(
    obstacle.position.x + MIN_SPACE * Math.random() * 100,
    obstacle.position.x,
    obstacle.position.z
  );

  obstacles.push(obstacle);
  obstacleMeshes.push(obstacleMesh);
  scene.add(obstacleMesh);
}

function animate() {
  requestAnimationFrame(animate);
  frameCounter++;

  document.getElementById("generation")!.textContent = neat
    .getGeneration()
    .toString();
  document.getElementById("population")!.textContent =
    population.length.toString();

  //think
  for (let i = 0; i < population.length; i++) {
    const dino = population[i];
    dino.think(obstacles);
  }
  //take action
  for (let i = 0; i < population.length; i++) {
    const dino = population[i];
    const dinoMesh = playerMeshes[i];
    dino.update();
    dinoMesh.position.set(dino.position.x, dino.position.y, dino.position.z);
  }

  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    const obstacleMesh = obstacleMeshes[i];
    obstacle.update(0.12);
    obstacleMesh.position.set(
      obstacle.position.x,
      obstacle.position.y,
      obstacle.position.z
    );

    // Remove obstacles that move out of bounds
    if (obstacle.position.x < -30) {
      scene.remove(obstacleMesh);
      obstacles.splice(i, 1);
      obstacleMeshes.splice(i, 1);
    }
  }

  if (
    frameCounter % SPAWN_INTERVAL === 0 &&
    obstacles.length < MAX_OBSTACLES &&
    population.length > 0
  ) {
    spawnObstacle();
  }

  for (let i = population.length - 1; i >= 0; i--) {
    const dino = population[i];

    for (const obstacle of obstacles) {
      if (dino.hit(obstacle)) {
        scene.remove(playerMeshes[i]);
        playerMeshes.splice(i, 1);
        neat.removePlayer(dino);
      }
    }
  }

  neat.evolveNextGeneration();

  if (population.length === 0) {
    restartGame();
  }
  renderer.render(scene, camera);
}

animate();
