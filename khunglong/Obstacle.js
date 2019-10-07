class Obstacle {
    constructor(img, x, y, width, height, speed) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height
        this.speed = speed;
    }

    render() {
        background(0);
        image(this.img, this.x, this.y, this.width, this.height)
    }

    move(speed) {
        this.speed += speed;
    }
}