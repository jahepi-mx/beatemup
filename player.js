class Player {
    
    constructor() {
        this.moves = [[0,0], [0,1], [1,0], [-1,0], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]];
        this.length = 10;
        this.position = new Vector((1 * tileLength + tileLength / 2), (1 * tileLength + tileLength / 2));
        this.velocity = new Vector(100, 100);
        this.velocityTmp = new Vector(0, 0);
        this.gravity = new Vector(0, -100);
        this.up = this.down = this.left = this.right = false;
        this.friction = 0.98;
        this.friction2 = 0.90;
        this.isJumping = false;
        this.isFalling = false;
        this.lastJumpPosition = new Vector(0, 0);
    }
    
    update(dt) {
        
        if (this.isFalling) {
            this.position = this.position.add(this.velocityTmp.mul(dt));
            this.velocityTmp = this.velocityTmp.add(this.gravity.mul(dt));
            this.velocityTmp = this.velocityTmp.mul(this.friction);
            return;
        }
        
        var currX = parseInt(this.position.x / tileLength);
        var currY = parseInt(this.position.y / tileLength);
        
        if (!this.isJumping) {
            
            if (this.left) {
                this.velocityTmp.x = -Math.abs(this.velocity.x);
            }

            if (this.right) {
                this.velocityTmp.x = Math.abs(this.velocity.x);
            }

            if (this.up) {
                this.velocityTmp.y = Math.abs(this.velocity.x);
            }

            if (this.down) {
                this.velocityTmp.y = -Math.abs(this.velocity.x);
            }
        }
        
        for (let move of this.moves) {
            var newX = currX + move[0];
            var newY = currY + move[1];
            if (newX >= 0 && newX < map.width && newY >= 0 && newY < map.height 
                    && map.tiles[newY * map.width + newX].type === PIT_TILE) {
                var tile = map.tiles[newY * map.width + newX];
                var diffX = Math.abs(tile.position.x - this.position.x);
                var diffY = Math.abs(tile.position.y - this.position.y);
                var length = tile.length / 2 + this.length / 2;
                if (diffX <= length && diffY <= length) {
                    this.isFalling = true;
                    this.velocityTmp = this.velocityTmp.normalize().mul(100);
                    return;
                }
            }
        }

        var tmpX = this.position.x;
        this.position.x += this.velocityTmp.x * dt;
        var collided = false;
        for (let move of this.moves) {
            var newX = currX + move[0];
            var newY = currY + move[1];
            if (newX >= 0 && newX < map.width && newY >= 0 && newY < map.height 
                    && ((!this.isJumping && !map.tiles[newY * map.width + newX].walkable)
                    || (this.isJumping && !map.tiles[newY * map.width + newX].walkable && map.tiles[newY * map.width + newX].type !== JUMPABLE_TILE))) {
                var tile = map.tiles[newY * map.width + newX];
                var diffX = Math.abs(tile.position.x - this.position.x);
                var diffY = Math.abs(tile.position.y - this.position.y);
                var length = tile.length / 2 + this.length / 2;
                if (diffX <= length && diffY <= length) {
                    collided = true;
                    break;
                }
            }
        }
        if (collided) {
            this.position.x = tmpX;
        }
        
        var tmpY = this.position.y;
        this.position.y += this.velocityTmp.y * dt;
        collided = false;
        for (let move of this.moves) {
            var newX = currX + move[0];
            var newY = currY + move[1];
            if (newX >= 0 && newX < map.width && newY >= 0 && newY < map.height 
                    && ((!this.isJumping && !map.tiles[newY * map.width + newX].walkable)
                    || (this.isJumping && !map.tiles[newY * map.width + newX].walkable && map.tiles[newY * map.width + newX].type !== JUMPABLE_TILE))) {
                var tile = map.tiles[newY * map.width + newX];
                var diffX = Math.abs(tile.position.x - this.position.x);
                var diffY = Math.abs(tile.position.y - this.position.y);
                var length = tile.length / 2 + this.length / 2;
                if (diffX <= length && diffY <= length) {
                    collided = true;
                    if (map.tiles[newY * map.width + newX].type === 1) {
                        console.log("x");
                        this.isJumping = false;
                        this.velocityTmp.y = 0;
                    }
                    break;
                }
            }
        }
        if (collided) {
            this.position.y = tmpY;
        }
        
        if (this.isJumping) {
            if (this.position.y <= this.lastJumpPosition.y) {
                this.velocityTmp.y = 0;
                this.position.y = this.lastJumpPosition.y;
                this.isJumping = false;
            } else {
                this.velocityTmp = this.velocityTmp.add(this.gravity.mul(dt));
            }
        } else {
        
            this.velocityTmp = this.velocityTmp.mul(this.friction2);
        }
    }
    
    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.velocityTmp.y = 80;
            this.lastJumpPosition.x = this.position.x;
            this.lastJumpPosition.y = this.position.y;
        }
    }
    
    render(context) {
        context.fillStyle = "#000";
        context.fillRect(origX + ((this.position.x - this.length / 2) + camera.position.x), origY - ((this.position.y + this.length / 2) + camera.position.y), this.length, this.length);
    }
}


