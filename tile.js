class Tile {
    
    constructor(x, y, length, walkable) {
        this.position = new Vector(x * length + length / 2, y * length + length / 2);
        this.length = length;
        this.walkable = walkable;
    }
    
    update(dt) {
        
    }
    
    render(context) {
        context.fillStyle = this.walkable ? "#fff" : "#f0f0f0";
        context.fillRect(origX + ((this.position.x - this.length / 2) + camera.position.x), origY - ((this.position.y + this.length / 2) + camera.position.y), this.length, this.length);
    }
    
}


