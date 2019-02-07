class Map {
    
    constructor() {
        this.width = 20;
        this.height = 6;
        this.tiles = [];
        this.data = [
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        ];
    }
    
    load() {    
        for (var a = 0; a < this.width * this.height; a++) {
            var x = a % this.width;
            var y = (this.height - 1) - parseInt(a / this.width);
            this.tiles[y * this.width + x] = new Tile(x, y, tileLength, this.data[a] === 0);
        }  
    }
    
    render(context) {
        for (let tile of this.tiles) {
            tile.render(context);
        }
    }
    
}
