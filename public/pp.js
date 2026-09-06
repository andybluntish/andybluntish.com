const viewport = document.createElement("canvas");
const ctx = viewport.getContext("2d");
viewport.style.position = "fixed";
viewport.style.zIndex = -1;
document.body.appendChild(viewport);

const size = 2;
const minDist = 10;
const maxDist = 140;
const minHue = 0;
const maxHue = 140;
let points = [];
let maxPoints = 0;
let lastTick = null;

new ResizeObserver((entries) => {
	for (const entry of entries) {
		const { contentRect: { width, height } } = entry;
		viewport.width = width;
		viewport.height = height;
		maxPoints = Math.floor(width * height / 150 ** 2);
	}
}).observe(document.documentElement);

tick();

///

function tick(now = 0) {
	const delta = now - (lastTick || now);

	// spawn new points if needed
	points.push(...Array.from({ length: maxPoints - points.length }, () => newPoint()));

	// move points
	let livePoints = [];
	for (const p of points) {
		let { position: { x, y } } = p;
		p.position.x += p.velocity.x * delta;
		p.position.y += p.velocity.y * delta;

		// only keep points that are on screen
		if (x >= -size && x <= viewport.width + size && y >= -size && y <= viewport.height + size) {
			livePoints.push(p);
		}
	}

	points = livePoints;

	// find the closest point to set the mood
	for (const p of points) {
		let closest = maxDist;
		for (const other of points) {
			if (p === other) continue;
			const dX = p.position.x - other.position.x;
			const dY = p.position.y - other.position.y;
			const current = Math.sqrt((dX ** 2) + (dY ** 2));

			if (current < closest) closest = current;
			if (closest <= minDist) break;
		}

		// map distance to closest to hue range
		p.mood = ((closest - minDist) * (minHue - maxHue)) / (maxDist - minDist) + maxHue;
	}

	// render points
	ctx.clearRect(0, 0, viewport.width, viewport.height);
	for (const p of points) {
		ctx.fillStyle = `hsl(${p.mood}, 100%, 50%)`;
		ctx.beginPath();
		ctx.arc(p.position.x, p.position.y, size / 2, 0, Math.PI * 2);
		ctx.fill();
	}

	lastTick = now;
	window.requestAnimationFrame((t) => tick(t));
}

function newPoint() {
	const mood = 0;
	const velocity = { x: rand(0.005, 0.05) * (rand() > 0.5 ? 1 : -1), y: rand(0.005, 0.05) * (rand() > 0.5 ? 1 : -1) };
	const position = { x: rand(0, viewport.width), y: rand(0, viewport.height) };
	if (points?.length > 0) {
		if (rand() > 0.5) {
			position.y = rand() > 0.5 ? viewport.height : 0;
		} else {
			position.x = rand() > 0.5 ? viewport.width : 0;
		}
	}

	return { position, velocity, mood };
}

function rand(min = 0, max = 1) {
	return Math.random() * (max - min) + min;
}
