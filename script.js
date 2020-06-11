alert('You can only spin the wheel onces')

// Code for spin

const wheel = document.querySelector('.wheel');
const startButton = document.querySelector('.button');
const arrow = document.querySelector('.pin');

let deg = 0;

startButton.addEventListener('click', () => {
	startButton.style.pointerEvents = 'none';
	deg = Math.floor(5000 + Math.random() * 5000);
	wheel.style.transition = 'all 10s ease-out';
	wheel.style.transform = `rotate(${deg}deg)`;
	wheel.classList.add('blur');
	playSound()
});

wheel.addEventListener('transitionend', () => {
	wheel.classList.remove('blur')
	startButton.style.pointerEvents = 'auto';
	wheel.style.transition = 'none';
	const actualDeg = deg % 360;
	wheel.style.transform = `rotate(${actualDeg}deg)`;
	stopSound();
	
	arrow.classList.add('bounce')
	playwinner();
	update();
	print(congratulations);
	draw();
});

let audio = new Audio('tick.mp3')

function playSound()
{
        audio.currentTime = 0;
        audio.play();
        audio.loop = true;
}

function stopSound()
{
	audio.pause();
}

let audio1=new Audio('winner.mpeg')

function playwinner()
{
        audio1.currentTime = 0;
        audio1.play();
		if(audio1.currentTime==5000)
		{
			audio1.pause();
		}
}


// Code for Confetti

let canvas = document.getElementById('confetti');
canvas.width = 1320;


let ctx = canvas.getContext('2d');
let pieces = [];
let numberOfPieces = 100;
let lastUpdateTime = Date.now();


function update() {

	let now = Date.now(),
		dt = now - lastUpdateTime;


	for (let i = pieces.length - 1; i >= 0; i--) {
		let p = pieces[i];

		if(p.y > canvas.height) {
			pieces.splice(i, 1);
			continue;
		}

		p.y += p.gravity * dt;
		p.rotation += p.rotationSpeed * dt;
	}

	while (pieces.length < numberOfPieces) {
		pieces.push(new Piece(Math.random() * canvas.width, -20));
	}

	lastUpdateTime = now;

	setTimeout(update, 1);

}

function draw() {

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	pieces.forEach(function (p) {
		ctx.save();

		ctx.fillStyle = p.color;

		ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
		ctx.rotate(p.rotation);

		ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
		ctx.restore();
	});

	requestAnimationFrame(draw);
}
