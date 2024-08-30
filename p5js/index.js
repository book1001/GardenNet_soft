let obj = [];
let num = 15;


function setup() {
	createCanvas(windowWidth, windowHeight);
	for(let i = 0; i < num; i++)obj[i] = new MoveObj();
	blendMode(DIFFERENCE);
}

function draw() {
	clear();
	background(30);
	for(let i = 0; i < obj.length; i++)obj[i].update();
}

//////////////////

class MoveObj
{
	constructor()
	{
		this.schedule = [];
		let num = Math.floor(random(5,15));

		for(let i = 0; i < num; i ++)
		{
			let _x = random(width);
			let _y = random(height);
			let _w = random(0.01,1) * width;
			let _h = random(0.01,1) * height;
			let _lineWeight = random(1,0.1*max(width,height));
			let _angle = random(TWO_PI);
			this.schedule.push({pos:createVector(_x,_y),size : createVector(_w,_h),lineWeight : _lineWeight, angle : _angle});
		}
		this.interval = 2;
		this. movingTimeAmount = 0.2;//0-1
		this.time  = 0;
	}
	
	update()
	{
		this.time += deltaTime/1000;
		let count = Math.floor(this.time/this.interval);
		let degree = map(this.time-count * this.interval,0,this.interval,0,1);
		count %= this.schedule.length;
		let nextCount = (count + 1) %this.schedule.length;
		degree = degree <= this. movingTimeAmount ? map(degree,0,this. movingTimeAmount,0,0.95) : map(degree,this. movingTimeAmount,1,0.95,1);
		
		let pos = this.getLerpVec(this.schedule[count].pos, this.schedule[nextCount].pos,degree,easingLinear);
		let size = this.getLerpVec(this.schedule[count].size, this.schedule[nextCount].size,degree,easingEaseInCubic);
		let lineWeight = this.gerLerpVal(this.schedule[count].lineWeight, this.schedule[nextCount].lineWeight,degree,easingEaseInCubic);
		let angle = this.gerLerpVal(this.schedule[count].angle, this.schedule[nextCount].angle,degree,easingEaseInCubic);
		this.display(pos,size,lineWeight,angle);
	}
	
	getLerpVec(_startPos,_endPos,_degree,easeFunc)
	{
		_degree = easeFunc(_degree);
		let v = p5.Vector.lerp(_startPos, _endPos, _degree);
		return v;
	}
	
	gerLerpVal(_startVal,_endVal,_degree,easeFunc,isInt = false)
	{
		_degree = easeFunc(_degree);
		let v = lerp(_startVal, _endVal, _degree);
		if(isInt)v = Math.floor(v);
		return v;
	}
	
	display(_pos,_size,_lineWeight,_angle)
	{
		ellipseMode(CENTER);
		rectMode(CENTER);
		let l = dist(0,0,width,height);
		noStroke();
		fill(255);
		push();
		translate(_pos);
		rect(0,0,l*2,_lineWeight);
		rect(0,0,_lineWeight,l*2);
		pop();
	}
}


//////

function createCols(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}

//////
function easingLinear(x) {
	return x;
}
function easingEaseInCubic (x) {
	return pow(x,3);
}

function easingEaseOutCubic (x) {
	return pow(x-1,3) + 1;
}

function easingEaseInOutCubic (x) {
	if(x < 0.5)return 0.5 * pow(2*x, 3);
	else return 0.5 * pow(2*(x-1), 3) + 1;
}