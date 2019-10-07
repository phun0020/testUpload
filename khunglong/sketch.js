let dino;
let spriteSheet;
let classifier;
let video;

const SPRITE_WIDTH = 144;
const OBJECT_ARR = ['coffee mug', 'key', 'microphone', "notebook, notebook computer"];

function preload() {
    spriteSheet = loadImage('pig.png');
}

function setup() {
    createCanvas(windowWidth - 15, 500);
    let classifyBtn = select('#classifyBtn');

    // setup for video and MobileNet model
    video = createCapture(VIDEO);
    video.parent('videoContainer');
    classifier = ml5.imageClassifier('MobileNet', video, () => {
        classifyBtn.removeAttribute('disabled');
        console.log('Model ready!');
    });

    classifyBtn.mousePressed(() => {
        classifyBtn.attribute('disabled', ''); //disable after clicked
        classify();
    });

    // Dino
    let x = SPRITE_WIDTH / 2;
    dino = new Sprite(spriteSheet, SPRITE_WIDTH, SPRITE_WIDTH, x, .4);

    // change goal every 3 seconds
    setInterval(moveToNextObject, 3000);
}

function moveToNextObject() {
    var obj = OBJECT_ARR[Math.floor(Math.random() * OBJECT_ARR.length)];
    select('#object').html(obj);
}

function classify() {
    classifier.classify(gotResult);
}

function gotResult(err, results) {
    if (err)
      console.error(err);
    
    if (results && results[0]) {
        const result = results[0].label;
        //const confidence = results[0].confidence * 100;

        select('#result').html(result);
        // select('#confidence').html(`${confidence}%`);

        classify();
    }
}

// game loop
function draw() {
    background(0);
    dino.animate();
    dino.jump();

    if(select('#result').elt.innerText == select('#object').elt.innerText)
    {
        dino.move();
        moveToNextObject();
    }
}