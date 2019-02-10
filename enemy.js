class Enemy {
    constructor(x, y, length) {
        this.moves = [[0,0], [0,1], [1,0], [-1,0], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]];
        this.length = length;
        this.position = new Vector((x * tileLength + tileLength / 2), (y * tileLength + tileLength / 2));
        this.velocity = new Vector(40, 40);
        this.velocityTmp = new Vector(20, 20);
        this.distanceFromPlayer = 10;
    }
    
    
    update(dt) {
        
        var sub = player.position.sub(this.position);
        
        var len = sub.length();

        if (len >= this.distanceFromPlayer) {
            var oldPos = this.position.clone();
            if (sub.x < 0) {
                this.position.x += -this.velocityTmp.x * dt;
            } else {
                this.position.x += this.velocityTmp.x * dt;
            }
            this.checkCollisionX(oldPos, this.position);
            
            var oldPos = this.position.clone();
            if (sub.y < 0) {
                this.position.y += -this.velocityTmp.y * dt;
            } else {
                this.position.y += this.velocityTmp.y * dt;
            }
            this.checkCollisionY(oldPos, this.position);
            
        } else {
            
            var newVector = sub.normalize().mul(this.distanceFromPlayer).mul(-1);
            var newSub = newVector.sub(this.position);
            
            var oldPos = this.position.clone();
            if (newSub.x < 0) {
                this.position.x += -this.velocityTmp.x * dt;
            } else {
                this.position.x += this.velocityTmp.x * dt;
            }
            this.checkCollisionX(oldPos, this.position);

            var oldPos = this.position.clone();
            if (newSub.y < 0) {
                this.position.y += -this.velocityTmp.y * dt;
            } else {
                this.position.y += this.velocityTmp.y * dt;
            }
            this.checkCollisionY(oldPos, this.position);
        }
        
    }
    
    checkCollisionX(oldPosition, newPosition) {
        var currX = parseInt(oldPosition.x / tileLength);
        var currY = parseInt(oldPosition.y / tileLength);
        var tmpX = oldPosition.x;
        var collided = false;
        for (let move of this.moves) {
            var newX = currX + move[0];
            var newY = currY + move[1];
            if (newX >= 0 && newX < map.width && newY >= 0 && newY < map.height 
                    && (!map.tiles[newY * map.width + newX].walkable || map.tiles[newY * map.width + newX].type === PIT_TILE)) {
                var tile = map.tiles[newY * map.width + newX];
                var diffX = Math.abs(tile.position.x - newPosition.x);
                var diffY = Math.abs(tile.position.y - newPosition.y);
                var length = tile.length / 2 + this.length / 2;
                if (diffX <= length && diffY <= length) {
                    collided = true;
                    break;
                }
            }
        }
        if (collided) {
            newPosition.x = tmpX;
        }
    }
    
    checkCollisionY(oldPosition, newPosition) {
        var currX = parseInt(oldPosition.x / tileLength);
        var currY = parseInt(oldPosition.y / tileLength);
        var tmpY = oldPosition.y;
        var collided = false;
        for (let move of this.moves) {
            var newX = currX + move[0];
            var newY = currY + move[1];
            if (newX >= 0 && newX < map.width && newY >= 0 && newY < map.height 
                    && (!map.tiles[newY * map.width + newX].walkable || map.tiles[newY * map.width + newX].type === PIT_TILE)) {
                var tile = map.tiles[newY * map.width + newX];
                var diffX = Math.abs(tile.position.x - newPosition.x);
                var diffY = Math.abs(tile.position.y - newPosition.y);
                var length = tile.length / 2 + this.length / 2;
                if (diffX <= length && diffY <= length) {
                    collided = true;
                    break;
                }
            }
        }
        if (collided) {
            newPosition.y = tmpY;
        }
    }
    
    render(context) {
        context.fillStyle = "#f0f0f0";
        context.fillRect(origX + ((this.position.x - this.length / 2) + camera.position.x), origY - ((this.position.y + this.length / 2) + camera.position.y), this.length, this.length);
    }
    
}


