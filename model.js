
// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !


// c'est la ou on va dessiner les rectangles et les lignes. Dire les caractéristiques de chaque forme

function Drawing() {
    this.shapeArray = new Map();
}

// ce qui est commun à toutes les formes
function Shape (startX, startY, thickness, color){
    this.startX = startX;
    this.startY = startY;
    this.thickness = thickness;
    this.color = color;
}

function Rectangle(startX, startY, thickness, color, width, height){
    Shape.call(this, startX, startY, thickness, color);
    this.width = width;
    this.height = height;
}

function Line (startX, startY, thickness, color, endX, endY){
    Shape.call(this, startX, startY, thickness, color);
    this.endX = endX;
    this.endY = endY;
}