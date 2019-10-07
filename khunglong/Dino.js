class Dino {
    constructor(x, y, width) {
        this.x = x;
        this.y = y;
        this.beginY = y;
        this.width = width;
        this.speed = 0;
    }

    render() {
        background(0);
        fill(255);
        rect(this.x, this.y , this.width, this.width);
    }

    changeSpeed(speed) {
        this.speed += speed;
    }

    jump() {
        this.y -= this.speed;

        // how high it can jump
        if(this.y < height - this.width * 3)
        {
            this.changeSpeed(-10);
        }
        
        //
        if(this.y >= this.beginY)
        {
            this.changeSpeed(0);
            this.y = this.beginY;
        }
    }
}