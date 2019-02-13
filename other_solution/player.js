class Player {
    
    constructor() {
        this.moves = [[0,0], [0,1], [1,0], [-1,0], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]];
        this.length = 10;
        this.position = new Vector((1 * tileLength + tileLength / 2), 0, (1 * tileLength + tileLength / 2));
        this.velocity = new Vector(100, 0, 100);
        this.velocityTmp = new Vector(0, 0, 0);
        this.gravity = new Vector(0, -100, 0);
        this.up = this.down = this.left = this.right = false;
        this.friction = 0.9;
        this.isJumping = false;
    }
    
    update(dt) {
        
        if (!this.isJumping) {
            if (this.left) {
                this.velocityTmp.x = -Math.abs(this.velocity.x);
            }

            if (this.right) {
                this.velocityTmp.x = Math.abs(this.velocity.x);
            }

            if (this.up) {
                this.velocityTmp.z = Math.abs(this.velocity.z);
            }

            if (this.down) {
                this.velocityTmp.z = -Math.abs(this.velocity.z);
            }
        }

        var currX = parseInt(this.position.x / tileLength);
        var currZ = parseInt(this.position.z / tileLength);        
        
        var tmpX = this.position.x;
        this.position.x += this.velocityTmp.x * dt;
        var collided = false;
        for (let move of this.moves) {
            var newX = currX + move[0];
            var newZ = currZ + move[1];
            if (newX >= 0 && newX < map.width && newZ >= 0 && newZ < map.height && !map.tiles[newZ * map.width + newX].walkable) {
                var tile = map.tiles[newZ * map.width + newX];
                var diffX = Math.abs(tile.position.x - this.position.x);
                var diffZ = Math.abs(tile.position.z - this.position.z);
                var diffY = Math.abs(tile.height / 2 - this.position.y);
                var length = tile.width / 2 + this.length / 2;
                var lengthY = tile.height / 2 + this.length / 2;
                if (diffX <= length && diffZ <= length && diffY <= lengthY) {
                    collided = true;
                    break;
                }
            }
        }
        if (collided) {
            this.position.x = tmpX;
        }
        
        var tmpZ = this.position.z;
        this.position.z += this.velocityTmp.z * dt;
        collided = false;
        for (let move of this.moves) {
            var newX = currX + move[0];
            var newZ = currZ + move[1];
            if (newX >= 0 && newX < map.width && newZ >= 0 && newZ < map.height && !map.tiles[newZ * map.width + newX].walkable) {
                var tile = map.tiles[newZ * map.width + newX];
                var diffX = Math.abs(tile.position.x - this.position.x);
                var diffZ = Math.abs(tile.position.z - this.position.z);
                var diffY = Math.abs(tile.height / 2 - this.position.y);
                var length = tile.width / 2 + this.length / 2;
                var lengthY = tile.height / 2 + this.length / 2;
                if (diffX <= length && diffZ <= length && diffY <= lengthY) {
                    collided = true;
                    break;
                }
            }
        }
        if (collided) {
            this.position.z = tmpZ;
        }
        
        var tmpY = this.position.y;
        this.position.y += this.velocityTmp.y * dt;
        collided = false;
        for (let move of this.moves) {
            var newX = currX + move[0];
            var newZ = currZ + move[1];
            if (newX >= 0 && newX < map.width && newZ >= 0 && newZ < map.height && !map.tiles[newZ * map.width + newX].walkable) {
                var tile = map.tiles[newZ * map.width + newX];
                var diffX = Math.abs(tile.position.x - this.position.x);
                var diffZ = Math.abs(tile.position.z - this.position.z);
                var diffY = Math.abs(tile.height / 2 - this.position.y);
                var length = tile.width / 2 + this.length / 2;
                var lengthY = tile.height / 2 + this.length / 2;
                if (diffX <= length && diffZ <= length && diffY <= lengthY) {
                    collided = true;
                    break;
                }
            }
        }
        if (collided) {
            this.position.y = tmpY;
            this.velocityTmp.y = 0;
            this.isJumping = false;
        }
        console.log(this.position.y);
        this.velocityTmp = this.velocityTmp.add(this.gravity.mul(dt));
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocityTmp.y = 0;
            this.isJumping = false;
        }
        
        this.velocityTmp.x *= this.friction;
        this.velocityTmp.z *= this.friction;
        this.velocityTmp.y *= 0.99;
    }
    
    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.velocityTmp.y = 100;
        }
    }
    
    renderXZ(context) {
        context.fillStyle = "#ff0000";
        context.fillRect(origX + ((this.position.x - this.length / 2) + camera.position.x), origY - (this.position.z + this.length / 2), this.length, this.length);
    }
    
    render(context) {
        var y = (this.position.z + this.length / 2) + this.position.y * 0.5;
        context.fillStyle = "#ff0000";
        context.fillRect(origX + ((this.position.x - this.length / 2) + camera.position.x), origY - y, this.length, this.length);
        //context.fillRect(origX + ((this.position.x - this.length / 2) + camera.position.x), origY - (this.position.z + this.length / 2), this.length, this.length);
    }
}


