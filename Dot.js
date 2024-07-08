class Dot{
	constructor(x, y, w) 
	{
		this.x = x;
		this.y = y;
		this.w = w;
		this.col = color(
			random(10),
			random(80, 100),
			random(210, 225)
		)
	}
	view()
	{
		stroke(6, 82, 215);
		strokeWeight(this.w);
		point(this.x, this.y);
	}
	mainAnim()
	{
		this.view();
		
		this.x += 1;
	}
}
class AnimDot
{
	constructor(x, y, x2, y2, speed, width) 
	{
		this.x2 = x2;
		this.y2 = y2;
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.width = width;
	}
	view()
	{
		stroke(225, 225);
		strokeWeight(this.width);
		point(this.x2, this.y2);
	}
	startAnim()
	{
		let katX = this.x2 - this.x;
		let katY = this.y2 - this.y;

		if(abs(this.x - this.x2) > 0.005 && abs(this.y - this.y2) > 0.005)
		{
			this.x2 = this.x2 - katX / this.speed;
			this.y2 = this.y2 - katY / this.speed;
		}
	}
	mainAnim(obX, obY)
	{
		this.maxR = 80;
		if(dist(obX, obY, this.x2, this.y2) <= this.maxR)
		{
			let katX1 = this.x2 - obX;
			let katY1 = this.y2 - obY;
			let tg = katY1 / katX1;
			let cs = sqrt(1 / (1 + tg * tg));
			let katX;

			if((katX1 >= 0 && katY1 >= 0) || (katX1 >= 0 && katY1 <= 0))
			{
				katX = - cs * this.maxR - katX1;
			}
			else 
			{
				katX = cs * this.maxR - katX1;
			}
			let katY = tg * katX - katY1;

			this.x2 = this.x2 - katX / this.speed;
			this.y2 = this.y2 - katY / this.speed;
		}
	}
}



class Bubble
{
	constructor(w)
	{
		this.w = w;
		this.x = random(3*w, width - 3*w);
		this.y = random(3*w, height - 3*w);
		this.a = random(0, 359);
		this.v = 14;
		this.s = 1;
	}
	view()
	{
		stroke(225);
		strokeWeight(this.w);
		point(this.x, this.y);
	}
	animBubble()
	{	
		this.view();
		this.vx = this.v * cos(this.a); 
		this.vy = - this.v * sin(this.a); 
		this.x += this.vx * this.s;
		this.y += this.vy * this.s;
		this.rad = this.w / 2;
		if(this.x >= width - this.rad || this.x <= this.rad)
		{
			this.a = 180 - this.a;
		}
		else if(this.y >= height - this.rad - 1|| this.y <= this.rad - 1)
		{
			this.a = 360 - this.a;
		}
	}
	interact(obX, obY)
	{
		this.maxR = 100;
		this.r = 70;
		let d = dist(obX, obY, this.x, this.y);
		if(d <= this.maxR)
		{
			this.s = map(d, this.r, this.maxR, 0.5, 1);
		}
		else this.s = 1;
		if(d <= this.r)
		{
			let kX = this.x - obX;
			let kY = obY - this.y;
			let tg = kY / kX;
			let cs = sqrt(1 / (1 + tg * tg));
			let ac = acos(cs);
			if(kY > 0)
			{
				if(kX > 0)
					this.a = ac;
				else
					this.a = 180 - ac;
			}
			else
			{
				if(kX < 0)
					this.a = 270 - ac;
				else
					this.a = 360 - ac;
			}
		}
	}
}