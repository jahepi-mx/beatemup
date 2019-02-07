class Enemy {
    constructor(x, y, size) {
        this.size = size;
        this.position = new Vector(x, y);
        this.velocity = new Vector(40, 40);
        this.velocityTmp = new Vector(20, 20);
        this.distanceFromPlayer = 80;
    }
    
    
    update(dt) {
        
        var sub = player.position.sub(this.position);
        
        var len = sub.len();

        if (len >= this.distanceFromPlayer) {
            if (sub.x < 0) {
                this.position.x += -this.velocityTmp.x * dt;
            } else {
                this.position.x += this.velocityTmp.x * dt;
            }

            if (sub.y < 0) {
                this.position.y += -this.velocityTmp.y * dt;
            } else {
                this.position.y += this.velocityTmp.y * dt;
            }
        } else {
            
            var newVector = sub.normalize().mul(this.distanceFromPlayer).mul(-1);
            var newSub = newVector.sub(this.position);
            if (newSub.x < 0) {
                this.position.x += -this.velocityTmp.x * dt;
            } else {
                this.position.x += this.velocityTmp.x * dt;
            }

            if (newSub.y < 0) {
                this.position.y += -this.velocityTmp.y * dt;
            } else {
                this.position.y += this.velocityTmp.y * dt;
            }
        }
        
    }
    
    render(context) {
        context.fillStyle = "#f0f0f0";
        context.fillRect(origX + (this.position.x - this.size / 2), origY - (this.position.y + this.size / 2), this.size, this.size);
    }
    
}


