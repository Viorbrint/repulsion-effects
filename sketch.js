let font;
let fontSz = 150;
let points;
let animDots = [], dots = [], bubbles = [];
let dotW = 10, bubW = 20;
let rows = 9;

function preload() {
	font = loadFont('Fredoka-Medium.ttf');
}
function setup() {
	frameRate(60);
	angleMode(DEGREES);
	createCanvas(windowWidth, windowHeight);

	setFont();

	background(6, 92, 221);

	let w = height / rows;
	for(let i = 0; i <= rows; i++)
	{
		dots[i] = [];
		for(let j = 0; j <= width / w + 1; j++)
		{
			let x = j * w - w / 2, y = i * w - w / 2;
			dots[i][j] = new Dot(x, y, w);
		}
	}
	points = font.textToPoints('Something', width / 2 - fontSz * 2.2, height / 2 + fontSz * 0.2);

	for (var i = 0; i < points.length; i++) {
		let pt = points[i];
		let randX = random(width);
		let randY = random(height);
		animDots[i] = new AnimDot(pt.x, pt.y, randX, randY, 10, 10);
	}		
	for (let i = 0; i < 3; i++) {
		bubbles[i] = new Bubble(bubW);
	}
}

function draw() {
	background(6, 92, 221);

	for (let i = 0; i < dots.length; i++) {
		for (let j = 0; j < dots[i].length; j++) {
			dots[i][j].mainAnim();
			
			let next = dots[i][(j + 1) % dots[i].length];
			if (dots[i][j].x >= width + dots[i][j].w / 2 && next.x >= - dots[i][j].w / 2 + dots[i][j].w) 
			{
				dots[i][j].x = - dots[i][j].w / 2;
			}
		}
	}

	for (let i = 0; i < animDots.length; i++) {
		animDots[i].view();
		animDots[i].startAnim();
		animDots[i].mainAnim(mouseX, mouseY);

		for (let j = 0; j < bubbles.length; j++) {
			let bub = bubbles[j];
			animDots[i].mainAnim(bub.x, bub.y);
		}
	}

	for (let i = 0; i < bubbles.length; i++) {
		let bub = bubbles[i];
		bub.animBubble();
		for (let j = 0; j < bubbles.length; j++) {
			if(j != i)
			{
				let bub1 = bubbles[j];
				bub.interact(bub1.x, bub1.y);
			}
		}
	}
}

function setFont() {
	textFont(font);
	fill(255);
	textSize(fontSz);
	textStyle(BOLD)
	textAlign(CENTER, CENTER);
}

