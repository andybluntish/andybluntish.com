class Vector {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	get magnitude() {
		return Math.sqrt((this.x ** 2) + (this.y ** 2));
	}

	add(vector) {
		this.x += vector.x;
		this.y += vector.y;
	}

	static scale(vector, magnitude) {
		return new Vector(vector.x * magnitude, vector.y * magnitude);
	}
}

class Point {
	static size = 1;

	constructor(position = new Vector(), velocity = new Vector(), hue = 0) {
		this.position = position;
		this.velocity = velocity;
		this.hue = hue;
		this.el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		this.el.setAttribute("r", Point.size);
	}

	move(scale = 1) {
		this.position.add(Vector.scale(this.velocity, scale));
	}

	distanceTo(other) {
		return new Vector(
			this.position.x - other.position.x,
			this.position.y - other.position.y
		).magnitude;
	}

	render() {
		this.el.style.transform = `translate3d(${this.position.x.toPrecision(10)}px, ${this.position.y.toPrecision(10)}px, 0)`;
		this.el.style.fill = `hsl(${this.hue}, 100%, 50%)`;
	}
}

const viewport = document.createElementNS("http://www.w3.org/2000/svg", "svg");
viewport.style.position = "fixed";
viewport.style.inset = 0;
viewport.style.width = "100%";
viewport.style.height = "100%";
viewport.style.zIndex = -1;
document.body.appendChild(viewport);

const points = [];
let maxPoints = 0;
let bounds = { width: 0, height: 0 };
let lastTick = null;

// update bounds and max points on resize
new ResizeObserver((entries) => {
	for (const entry of entries) {
		const { contentRect: { width, height } } = entry;
		bounds = { width, height };
		maxPoints = Math.floor(width * height / 150 ** 2);
	}
}).observe(viewport);

// start
tick();

function tick(now = 0) {
	const delta = now - (lastTick || now);
	spawn();
	update(delta);
	lastTick = now;
	window.requestAnimationFrame((t) => tick(t));
}

function spawn() {
	const onEdge = points.length < 0;
	while (points.length < maxPoints) {
		const point = new Point(
			randomPosition(onEdge),
			randomVelocity()
		);
		points.push(point);
		viewport.appendChild(point.el);
	}
}

function update(delta) {
	const minDistance = 10;
	const maxDistance = 120;

	// move points
	for (const p of points) {
		let { x, y } = p.position;
		if (x <= -Point.size || x >= bounds.width + Point.size || y <= -Point.size || y >= bounds.height + Point.size) {
			// Point is off screen
			if (points.length > maxPoints) {
				// too many points, cull this one
				viewport.removeChild(p.el);
				points.splice(points.indexOf(p), 1);
			} else {
				// reset to a random position and velocity
				p.position = randomPosition();
				p.velocity = randomVelocity();
			}
		} else {
			p.move(delta);
		}
	}

	// set emotional state based on the distance to closest neighbour
	for (const p of points) {
		let closest = maxDistance;

		for (const other of points) {
			if (p === other) continue;
			const current = p.distanceTo(other);

			// if the current distance is smaller, this is the smallest distance
			if (current < closest) {
				closest = current;
			}

			// if we're already at the min distance, stop looking
			if (closest <= minDistance) {
				break;
			}
		}

		// map the closest from the min/max distance range to the happy/sad colour range
		p.hue = mapRange(closest, minDistance, maxDistance, 140, 0);
	}

	// render points
	for (const p of points) {
		p.render();
	}
}

function mapRange(value, inMin, inMax, outMin, outMax) {
	return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function randomPosition(onEdge = true) {
	let [x, y] = [bounds.width, bounds.height].map((max) => rand(0, max));

	if (onEdge) {
		// randomly select an edge to snap to
		if (rand() > 0.5) {
			y = rand() > 0.5 ? bounds.height : 0;
		} else {
			x = rand() > 0.5 ? bounds.width : 0;
		}
	}

	return new Vector(x, y);
}

function randomVelocity() {
	const [x, y] = Array(2).fill(0).map(() => rand(0.005, 0.05) * (rand() > 0.5 ? 1 : -1));

	return new Vector(x, y);
}

function rand(min = 0, max = 1) {
	return Math.random() * (max - min) + min;
}
