class Sprite {
    constructor(spriteSheet, frameWidth, frameHeight, x = 0, speed = .5) { //coef = hệ số
        this.spriteSheet = spriteSheet;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.x = x;
        this.y = height - frameWidth;
        this.speed = speed; // how fast it moves to next frame
        this.coef = 1;

        this.width = spriteSheet.width;
        this.height = spriteSheet.height;
        this.columns = Math.floor(this.width / this.frameWidth);
        this.rows = Math.floor(this.height / this.frameHeight);

        this.index = 0;
        this.frames = this.getFramesArray();

        // moving vertically | horizontally
        this.velocity = 0;
        this.gravity = 3;
    }

    getFramesArray() {
        let arr = [];
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.columns; j++) {
                arr.push({
                    x: j * this.frameWidth,
                    y: i * this.frameHeight
                });
            }
        }

        return arr;
    }

    animate() {
        let index = Math.floor(this.index) % this.frames.length;
        image(this.spriteSheet, this.x, this.y, // img,[sx=0],[sy=0]
            this.frameWidth, this.frameHeight, // [sWidth=img.width],[sHeight=img.height]
            this.frames[index].x, this.frames[index].y, // [dx=0],[dy=0]
            this.frameWidth, this.frameHeight); // [dWidth],[dHeight]
        
        this.index += this.speed;
    }

    move() {
        // move
        this.x += 30;
        if(this.x >= width + this.frameWidth)
            this.x = -this.frameWidth;
    }

    changeVelocity(acceleration) {
        if (this.y == height - this.frameWidth) {
            this.velocity += acceleration;
            this.y -= this.velocity;
            this.velocity = constrain(this.velocity, 0, acceleration);
        }
    }

    jump() {
        this.y += this.gravity;
        this.y = constrain(this.y, 0, height - this.frameWidth);
    }
}