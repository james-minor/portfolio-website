import * as THREE from "../../lib/three/three.module.js";

const shapes = [];

var mouse =
{
	x: 0,
	y: 0
};

class App
{
	constructor()
	{
		const container = document.createElement("div");
		container.id = "app-container";
		document.body.appendChild(container);

		this.initializeScene();
		this.initializeObjects();
		this.initializeLights();

		window.addEventListener("resize", this.resize.bind(this));
		window.addEventListener("scroll", this.scroll.bind(this));
		window.addEventListener("mousemove", this.mouseMove.bind(this));

		this.scroll();
	}

	// Initializes the Three.js scene.
	initializeScene()
	{
		const container = document.getElementById("app-container");

		// --- Defining the Scene ---
		this.scene = new THREE.Scene();
		window.scene = this.scene;

		// --- Defining The Camera ---
		this.camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.camera.position.z = 5;

		// --- Defining the Renderer ---
		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth - 12, window.innerHeight);
		this.renderer.setAnimationLoop(this.render.bind(this));
		this.renderer.setClearColor(0x000000, 0);

		container.appendChild(this.renderer.domElement);

		// --- Defining the Scene Clock ---
		this.clock = new THREE.Clock();
	}

	initializeObjects()
	{
		// --- Adding Mouse Geometry ---
		this.mouseGeometry = new THREE.SphereGeometry(1, 100, 100);
		this.mouseMaterial = new THREE.MeshLambertMaterial({});
		this.mouseMesh = new THREE.Mesh(this.mouseGeometry, this.mouseMaterial);

		// --- Defining Generic Geometry ---
		var geometry = undefined;
		var material = undefined;

		// --- Giant Icosahedron ---
		geometry = new THREE.IcosahedronGeometry(2);
		material = new THREE.MeshPhongMaterial({color: 0xFF6B6B});
		shapes.push(new THREE.Mesh(geometry, material));
		shapes[0].position.y = -1;

		// --- Tiny Dodecahedrons ---
		geometry = new THREE.DodecahedronGeometry(0.3);
		material = new THREE.MeshPhongMaterial({color: 0x7ddbae})
		shapes.push(new THREE.Mesh(geometry, material));
		shapes[1].position.set(4, -7, 0);

		geometry = new THREE.DodecahedronGeometry(0.5);
		material = new THREE.MeshPhongMaterial({color: 0xf5d93d})
		shapes.push(new THREE.Mesh(geometry, material));
		shapes[2].position.set(6, -8, 0);

		geometry = new THREE.DodecahedronGeometry(0.4);
		material = new THREE.MeshPhongMaterial({color: 0x3dbef5})
		shapes.push(new THREE.Mesh(geometry, material));
		shapes[3].position.set(4.6, -9.5, 0);

		for(var i = 0; i < shapes.length; i++)
		{
			this.scene.add(shapes[i]);
		}
	}

	initializeLights()
	{
		// --- Defining the Scene Light ---
		this.sceneLight = new THREE.DirectionalLight(0xFFFFFF, 0.7);
		this.sceneLight.position.set(0, 20, 0);
		this.scene.add(this.sceneLight);
		this.scene.add(this.sceneLight.target);

		// --- Defining the Underlighting ---
		this.underLight = new THREE.DirectionalLight(0xFFFFFF, 0.08);
		this.underLight.position.set(0, -50, 50);
		this.underLight.target.position.set(0, 20, 0);
		this.scene.add(this.underLight);
		this.scene.add(this.underLight.target);

		// --- Defining the Ambient Light Levels ---
		this.ambientLight = new THREE.AmbientLight(0x404040, 0.5);
		this.scene.add(this.ambientLight);
	}

	// Callback when the window is resized.
	resize()
	{
		this.camera.aspect = (window.innerWidth / window.innerHeight);
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	scroll()
	{
		scroll = window.pageYOffset * -0.01;
		scroll = Math.min(Math.max(scroll, -20), 0);
	}

	mouseMove(event)
	{
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

		var vector = new THREE.Vector3(mouse.x, mouse.y, 0);
		vector.unproject(this.camera);
		var dir = vector.sub(this.camera.position).normalize();
		var distance = -this.camera.position.z / dir.z;
		var pos = this.camera.position.clone().add(dir.multiplyScalar(distance));

		this.sceneLight.target.position.set(-pos.x, pos.y, pos.z);
	}

	// Render loop.
	render()
	{
		shapes[0].rotation.x += 0.001;
		shapes[0].rotation.y += 0.001;

		shapes[1].rotation.x += 0.004;
		shapes[1].rotation.y -= 0.004;

		shapes[2].rotation.x -= 0.001;
		shapes[2].rotation.z += 0.001;

		shapes[3].rotation.x -= 0.002;
		shapes[3].rotation.y += 0.002;

		// Interpolating camera scroll position.
		this.camera.position.lerp(new THREE.Vector3(0, scroll, this.camera.position.z), 0.09);

		this.renderer.render(this.scene, this.camera);
	}

}

export { App };
