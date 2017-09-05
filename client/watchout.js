// basic settings can easily be adjusted in one place
var settings = {
	w: window.innerWidth,
	h: window.innerHeight,
	r: 15,
	n: 30,
	duration: 1500
};

// set mouse to middle of board
var mouse = {x: settings.w/2, y: settings.h/2};
// starting values
var score = 0, highscore = 0, collisionCount = 0;

// adds 'px' to numbers (helpful for css styling)
var pixelize = function(number) {return number + 'px';};

// get random X and Y coordinates
var rand = function() {return Math.floor(Math.random()*n);};
var randX = function() {return pixelize(rand(settings.w-settings.r*2));};
var randY = function() {return pixelize(rand(settings.h-settings.r*2));};

// update the score during game play
var updateScore = function() {
	d3.select('.scoreboard .current span').text(score);
	d3.select('.scoreboard .highscore span').text(highscore);
	d3.select('.scoreboard .collisions span').text(collisionCount);
}

// set board style
var board = d3.select('.board').style({
	width: pixelize(settings.w);
	height: pixelize(settings.h);
});

// set mouse style
d3.select('.mouse').style({
	top: pixelize(mouse.y);
	left: pixelize(mouse.x);
	width: pixelize(settings.r*2);
	height: pixelize(settings.r*2);
	'border-radius': pixelize(settings.r*2);
});

// select all asteroids; assign arbitrary data and random positions to each
var asteroids = board.selectAll('.asteroids')
  .data(d3.range(settings.n))
  .enter().append('div')
  .attr('class', 'asteroid')
  .style({
  	left: randX,
  	top: randY,
  	width: pixelize(settings.r*2),
  	height: pixelize(settings.r*2)
  });

// add move mouse functionality
board.on('mousemove', function(){
	var loc = d3.mouse(board);
	mouse = { x: loc[0], y: loc[1]};
	d3.select('.mouse').style({
		top: pixelize(mouse.y-settings.r),
		left: pixelize(mouse.x-settings.r)
	});
});

// make asteroids move
var move = function() {
	asteroids.transition().duration(settings.duration).style({
		top: randY,
		left: randX
	}).each('end', function() {
		move(d3.select(this));
	});
}
move(asteroids);

// update score during game play
var scoreTicker = function() {
	score++;
	highScore = Math.max(score, highScore);
	updateScore();
};
setInterval(scoreTicker, 100);

var prevCollision = false;
// detects collisions between the mouse and the asteroids
var detectCollisions = function() {
	var collision = false;

	asteroids.each(function() {
		var cx = this.offsetLeft + settings.r;
		var cy = this.offsetTop + settings.r;
		/* a collision occurs when the distance between 
		the center of the mouse and the center of an asteroid 
		is less than twice the radius of the mouse/asteroid */
		var x = cx - mouse.x;
		var y = cy - mouse.y;
		if (Math.sqrt(x*x + y*y) < settings.r*2) {
			collision = true;
		}
	});

	if (collision) {
		score = 0;
		board.style('background-color', 'red');
		if (prevCollision !== collision) {
			collitionCount++;
		}
	} else {
		board.style('background-color', 'white');
	}
	prevCollision = collision;
};

d3.timer(detectCollisions);






























