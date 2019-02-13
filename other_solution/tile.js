class Tile {
    
    constructor(x, z, width, walkable) {
        this.height = 10;
        this.position = new Vector(x * width + width / 2, 0, z * width + width / 2);
        this.width = width;
        this.walkable = walkable;
    }
    
    update(dt) {
        
    }
    
    renderXZ(context) {
        context.fillStyle = this.walkable ? "#fff" : "#f0f0f0";
        context.fillRect(origX + ((this.position.x - this.width / 2) + camera.position.x), origY - (this.position.z + this.width / 2), this.width, this.width);
    }
    
    render(context) {
        context.fillStyle = this.walkable ? "#fff" : "#f0f0f0";
        var y = this.position.z + this.height;
        context.fillRect(origX + ((this.position.x - this.width / 2) + camera.position.x), origY - y, this.width, this.height);
    }
    
}


