// Original code by Daniel Shiffman in November 2019, sourced from The Coding Train (https://thecodingtrain.com/TeachableMachine/1-teachable-machine.html)

// Modified by Arash Nouri in January 2022

// Bugs squashed with help from Megan Turnbull

// Video
let video;

let label = "waiting...";

let classifier;

let imageModelURL = "https://teachablemachine.withgoogle.com/models/IYR3t01Nn/";

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
  loadFont("assets/robotoMono.ttf");
}

function setup() {
  createCanvas(960, 720);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();

  // STEP 2: Start classifying
  classifyVideo();
}

// STEP 2 classify!
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);

  // Draw the video
  image(video, 0, 0, [960], [720]);

  // STEP 4: Draw the label
  textSize(48);
  textFont("robotoMono");
  textAlign(CENTER, CENTER);
  fill(255);
  strokeWeight(6);
  stroke(0);
  text("I think I see a..." + label, width / 2, height - 40);

  // Pick an emoji, the "default" is train
  let emoji = "🤔";
  if (label == "Lightbulb") {
    emoji = "💡";
  } else if (label == "Plant") {
    emoji = "🪴";
  } else if (label == "Frog") {
    emoji = "🐸";
  } else if (label == "Duck") {
    emoji = "🦆";
  } else if (label == "Watch") {
    emoji = "⏱️";
  } else if (label == "Monkey") {
    emoji = "🐒";
  } else if (label == "Phone") {
    emoji = "📱";
  }

  // Draw the emoji
  textSize(256);
  text(emoji, width - 180, height - 360);
}

// STEP 3: Get the classification!
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  classifyVideo();
}
