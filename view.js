
// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.

// comment on va les dessiner, définir leur couleur et leur épaisseur
Rectangle.prototype.paint = function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thickness;
    ctx.strokeRect(this.startX, this.startY, this.width, this.height);
};

Line.prototype.paint = function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thickness;
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();
}

Drawing.prototype.paint = function(ctx) {
   ctx.fillStyle = '#F0F0F0'; // set canvas' background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);  // now fill the canvas
    this.shapeArray.forEach(element => element.paint(ctx));
};

//shape list present de nase dans le canvas.html
function updateShapeList(index, shape) {
    document.getElementById("shapeList").insertAdjacentHTML('beforeend',toDom(shape,index));
};

function toDom(shape, index) {
    if(shape instanceof Rectangle) {
        return '<li id="remove' + index + '"><input type="button" value="Remove" id="remove' + index + '"/>Rectangle(' + index + ')</li>';
    }
    else {
        return '<li id="remove' + index + '"><input type="button" value="Remove" id="remove' + index + '"/>Line(' + index + ')</li>';
    }
};

