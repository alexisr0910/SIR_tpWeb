
var editingMode = { rect: 0, line: 1, circle : 2, triangle : 3, clear : 4};

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 5;
	this.currColour = '#000000';
	this.currentShape = 0;

	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.

	document.getElementById('butRect').onclick =  (_) =>
		this.currEditingMode = editingMode.rect;
	document.getElementById('butLine').onclick = (_) =>
		this.currEditingMode = editingMode.line;
	document.getElementById('butCircle').onclick = (_) =>
		this.currEditingMode = editingMode.circle;
	document.getElementById('butTriangle').onclick = (_) =>
		this.currEditingMode = editingMode.triangle;
	document.getElementById('butClear').onclick = (_) => {
		this.currEditingMode = editingMode.clear;
		drawing.shapeArray.clear();
		const shapeList = document.getElementById("shapeList");
		while (shapeList.firstChild) {
			shapeList.removeChild(shapeList.firstChild);
		}
		drawing.paint(ctx, canvas);

	};
	document.getElementById('spinnerWidth').onchange = (_) =>
		this.currLineWidth = document.getElementById('spinnerWidth').value;
	document.getElementById('colour').onchange = (_) =>
		this.currColour = document.getElementById('colour').value;

	new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd

	this.onInteractionStart = function (DnD) {
	}.bind(this);

	this.onInteractionUpdate = function (DnD) {
		if(this.currEditingMode === editingMode.rect) {
			this.currentShape = new Rectangle(
				DnD.initX, DnD.initY,this.currLineWidth, this.currColour,
				DnD.finalX - DnD.initX, DnD.finalY - DnD.initY);
			drawing.paint(ctx, canvas);
			this.currentShape.paint(ctx);//permet de dessiner la forme
		}
		else if (this.currEditingMode === editingMode.line) {
			this.currentShape = new Line(DnD.initX, DnD.initY, this.currLineWidth,this.currColour, DnD.finalX, DnD.finalY);
			drawing.paint(ctx, canvas);
			this.currentShape.paint(ctx);

		}
		else if (this.currEditingMode === editingMode.circle) {
			this.currentShape = new Circle(DnD.initX, DnD.initY, this.currLineWidth,this.currColour, Math.sqrt(Math.pow(DnD.finalX - DnD.initX, 2) + Math.pow(DnD.finalY - DnD.initY, 2)));
			drawing.paint(ctx, canvas);
			this.currentShape.paint(ctx);
		}
		else if (this.currEditingMode === editingMode.triangle) {
			this.currentShape = new Triangle(DnD.initX, DnD.initY, this.currLineWidth,this.currColour, DnD.finalX - DnD.initX, DnD.finalY - DnD.initY);
			drawing.paint(ctx, canvas);
			this.currentShape.paint(ctx);
		}
	}.bind(this);

	this.onInteractionEnd = function (DnD) {

		if (this.currEditingMode === editingMode.clear) {
		}
		else {
			var uuid = generateUUID();
			drawing.shapeArray.set(uuid, this.currentShape);
			drawing.paint(ctx, canvas);
			this.currentShape.paint(ctx);
			updateShapeList(uuid, this.currentShape);
			document.getElementById("remove" + uuid).onclick = (event) =>
				remove(drawing, event.currentTarget.id.substring(6), ctx, canvas);
		}
	}.bind(this);

	function remove (drawing, uuid, ctx, canvas) {
		drawing.shapeArray.delete(uuid);
		document.getElementById("remove" + uuid).remove();
		drawing.paint(ctx, canvas);
	}

	function generateUUID() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	}
};


