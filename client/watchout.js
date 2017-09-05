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

// add drag mouse functionality
board.on('mousemove', function(){
	var loc = d3.mouse(board);
	mouse = { x: loc[0], y: loc[1]};
	d3.select('.mouse').style({
		top: pixelize(mouse.y-settings.r),
		left: pixelize(mouse.x-settings.r)
	});
});

var detectCollisions() {

};
































