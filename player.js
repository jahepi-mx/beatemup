class Player {
    
    constructor() {
        this.moves = [[0,0], [0,1], [1,0], [-1,0], [0,-1]];
        this.length = 10;
        this.position = new Vector((1 * tileLength + tileLength / 2), (1 * tileLength + tileLength / 2));
        this.velocity = new Vector(100, 100);
        this.velocityTmp = new Vector(0, 0);
        this.gravity = new Vector(0, -20);
        this.up = this.down = this.left = this.right = false;
        this.friction = 0.95;
    }
    
    update(dt) {
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

        var currX = parseInt(this.position.x / tileLength);
        var currY = parseInt(this.position.y / tileLength);
        
        
        var tmpX = this.position.x;
        this.position.x += this.velocityTmp.x * dt;
        var collided = false;
        for (let move of this.moves) {
            var newX = currX + move[0];
            var newY = currY + move[1];
            if (newX >= 0 && newX < map.width && newY >= 0 && newY < map.height && !map.tiles[newY * map.width + newX].walkable) {
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
            if (newX >= 0 && newX < map.width && newY >= 0 && newY < map.height && !map.tiles[newY * map.width + newX].walkable) {
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
            this.position.y = tmpY;
        }
        
        this.velocityTmp = this.velocityTmp.mul(this.friction);
    }
    
    render(context) {
        context.fillStyle = "#f0f0f0";
        context.fillRect(origX + ((this.position.x - this.length / 2) + camera.position.x), origY - ((this.position.y + this.length / 2) + camera.position.y), this.length, this.length);
    }
}


