
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

Circle.prototype.paint = function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thickness;
    ctx.beginPath();
    ctx.arc(this.startX, this.startY, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
}

Triangle.prototype.paint = function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thickness;
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.startX + this.width, this.startY);
    ctx.lineTo(this.startX + this.width, this.startY + this.height);
    ctx.lineTo(this.startX, this.startY);
    ctx.stroke();
}

Clear.prototype.paint = function(ctx) {
    ctx.clearRect(this.startX, this.startY, this.thickness, this.thickness);
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
    const shapeType = shape instanceof Rectangle ? "Rectangle" : "Line";
    const id = "remove" + index;
    const shapeId = index;  // Vous pouvez aussi afficher un ID plus lisible si nécessaire.

    return `
        <li id="${id}" style="margin: 10px; padding: 5px; list-style-type: none; border: 1px solid #ccc; border-radius: 5px; display: flex; align-items: center;">
            <button id="${id}" style="background-color: #f44336; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; font-size: 14px;">
                Remove
            </button>
            <span style="margin-left: 10px; font-size: 14px; font-weight: bold; color: #333;">
                ${shapeType}
            </span>
            <span style="margin-left: 10px; font-size: 14px; font-weight: normal; color: #777;">
                ID: ${shapeId}
            </span>
        </li>
    `;
};



