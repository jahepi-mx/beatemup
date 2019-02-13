class Vector {
    
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    
    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }
    
    addThis(vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
    }
    
    sub(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }
    
    mul(scalar) {
        return new Vector(this.x * scalar, this.y * scalar, this.z * scalar);
    }
    
    mulThis(scalar) {
        this.x *= scalar; 
        this.y *= scalar;
        this.z *= scalar;
    }
    
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    
    lengthXY() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    
    lengthXZ() {
        return Math.sqrt(this.x * this.x + this.z * this.z);
    }
    
    setLengthXY(length) {
        var angle = this.getAngleXY();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }
    
    setLengthXZ(length) {
        var angle = this.getAngleXZ();
        this.x = Math.cos(angle) * length;
        this.z = Math.sin(angle) * length;
    }
    
    normalize() {
        var length = this.length();
        return new Vector(this.x / length, this.y / length, this.z / length);
    }
    
    dot(vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }
    
    getAngleXY() {
        return Math.atan2(this.y, this.x);
    }
    
    getAngleXZ() {
        return Math.atan2(this.z, this.x);
    }
    
    setAngleXY(radians) {
        var length = this.lengthXY();
        this.x = Math.cos(radians) * length;
        this.y = Math.sin(radians) * length;
        return this;
    }
    
    setAngleXZ(radians) {
        var length = this.lengthXZ();
        this.x = Math.cos(radians) * length;
        this.z = Math.sin(radians) * length;
        return this;
    }
    
    setUnitAngleXY(radians) {
        this.x = Math.cos(radians);
        this.y = Math.sin(radians);
        return this;
    }
    
    setUnitAngleXZ(radians) {
        this.x = Math.cos(radians);
        this.z = Math.sin(radians);
        return this;
    }
    
    addAngleXY(radians) {
        var length = this.lengthXY();
        var angle = this.getAngleXY() + radians;
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
        return this;
    }
    
    addAngleXZ(radians) {
        var length = this.lengthXZ();
        var angle = this.getAngleXZ() + radians;
        this.x = Math.cos(angle) * length;
        this.z = Math.sin(angle) * length;
        return this;
    }
    
    equals(vector) {
        return this.x === vector.x && this.y === vector.y && this.z === vector.z;
    }
    
    clone() {
        return new Vector(this.x, this.y, this.z);
    }
}

