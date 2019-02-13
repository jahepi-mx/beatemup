class Map {
    
    constructor() {
        this.width = 20;
        this.height = 5;
        this.tiles = [];
        this.data = [
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        ];
    }
    
    load() {    
        for (var a = 0; a < this.width * this.height; a++) {
            var x = a % this.width;
            var z = (this.height - 1) - parseInt(a / this.width);
            this.tiles[z * this.width + x] = new Tile(x, z, tileLength, this.data[a] === 0);
        }  
    }
    
    render(context) {
        for (let tile of this.tiles) {
            tile.render(context);
        }
    }
    
    renderXZ(context) {
        for (let tile of this.tiles) {
            tile.renderXZ(context);
        }
    }
    
}
