let dino;
let spriteSheet;
let featureExtractor;
let classifier;
let video;
let loss;
let jumpImages;
let isStarted = false;

const SPRITE_WIDTH = 144;

function preload() {
    spriteSheet = loadImage('pig.png');
}

function setup() {
    createCanvas(windowWidth - 15, 500);

    // setup for video and MobileNet model
    video = createCapture(VIDEO);
    video.parent('videoContainer');
    featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
    classifier = featureExtractor.classification(video, videoReady);


    // Dino
    let x = SPRITE_WIDTH / 2;
    let y = height - SPRITE_WIDTH;
    dino = new Sprite(spriteSheet, SPRITE_WIDTH, SPRITE_WIDTH, x, .4);
    setupButtons();
}

function modelReady() {
    console.log('Model ready!');
}

function videoReady() {
    console.log('video ready!');
}

function classify() {
    classifier.classify(gotResults);
}

function gotResults(err, results) {
    // Display any error
    if (err) {
      console.error(err);
    }
    if (results && results[0]) {
        const result = results[0].label;
        const confidence = results[0].confidence * 100;
        console.log(`result: ${result} | confidence: ${confidence} %`);
        select('#result').html(result);
        classify();
    }
}

function setupButtons() {
    let recordBtn = select('#recordBtn');
    recordBtn.mousePressed(() => {
        classifier.addImage('jump');
        console.log('alo alo');
    });

    let moveBtn = select('#moveBtn');
    moveBtn.mousePressed(() => {
        classifier.addImage('move');
    });

    let trainBtn = select('#trainBtn');
    trainBtn.mousePressed(() => {
        classifier.train(lossValue => {
          if (lossValue) {
            loss = lossValue;
            console.log(`loss: ${loss}`);
          } else
            console.log('Done');
        });
      });

    let startBtn = select('#startBtn');
    startBtn.mousePressed(() => {
        isStarted = !isStarted;
        classify();
    });
}

// game loop
function draw() {
    background(0);
    dino.animate();
    dino.jump();
    
    if(isStarted) {
        if(select('#result').elt.innerText == 'jump')
        {
            dino.changeVelocity(90);
        }
        if(select('#result').elt.innerText == 'move')
        {
            dino.move();
        }
    }
    
}


