class Camera {
    
    constructor() {
        this.position = new Vector(0, 0);
        this.startLimitX = width / 2;
        this.endLimitX = map.width * tileLength - width / 2;
        this.startLimitY = height / 2;
        this.endLimitY = map.height * tileLength - height / 2;
    }
    
    update(dt) {
        
        if (player.position.x > this.startLimitX) {
            this.position.x = this.startLimitX - player.position.x;
        }
        
        if (player.position.x > this.endLimitX) {
            this.position.x = this.startLimitX - this.endLimitX;
        }
        
        if (player.position.y > this.startLimitY) {
            this.position.y = this.startLimitY - player.position.y;
        }
        
        if (player.position.y > this.endLimitY) {
            this.position.y = this.startLimitY - this.endLimitY;
        }
    }
}

