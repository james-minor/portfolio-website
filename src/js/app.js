import * as THREE from "../../lib/three/three.module.js";

var shape = undefined;

var scroll = 0;

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

		window.addEventListener("resize", this.resize.bind(this));
		window.addEventListener("scroll", this.scroll.bind(this));
		window.addEventListener("mousemove", this.mouseMove.bind(this));
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
		// --- Defining the Scene Light ---
		this.sceneLight = new THREE.DirectionalLight(0xFFFFFF, 0.7);
		this.sceneLight.position.set(0, 20, 0);
		this.scene.add(this.sceneLight);
		this.scene.add(this.sceneLight.target);

		// --- Defining the Underlighting ---
		this.underLight = new THREE.DirectionalLight(0xFFFFFF, 0.08);
		this.underLight.position.set(0, -50, 50);
		this.sceneLight.target.position.set(0, 20, 0);
		this.scene.add(this.underLight);
		this.scene.add(this.underLight.target);

		// --- Defining the Ambient Light Levels ---
		this.ambientLight = new THREE.AmbientLight(0x404040, 0.5);
		this.scene.add(this.ambientLight);

		// --- Adding Mouse Geometry ---
		this.mouseGeometry = new THREE.SphereGeometry(1, 100, 100);
		this.mouseMaterial = new THREE.MeshLambertMaterial({});
		this.mouseMesh = new THREE.Mesh(this.mouseGeometry, this.mouseMaterial);

		// --- Adding test shape ---
		const geometry = new THREE.IcosahedronGeometry(2);
		//const material = new THREE.MeshPhongMaterial({color: 0xA3FDFD});
		const material = new THREE.MeshPhongMaterial({color: 0xFF6B6B});

		shape = new THREE.Mesh(geometry, material);
		shape.position.y = -1;

		this.scene.add(shape);
	}

	// Callback when the window is resized.
	resize()
	{
		this.camera.aspect = (window.innerWidth / window.innerHeight);
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	scroll(event)
	{
		scroll = window.pageYOffset * -0.01;
		scroll = Math.min(Math.max(scroll, -10), 0);
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
		shape.rotation.x += 0.001;
		shape.rotation.y += 0.001;

		// Interpolating camera scroll position.
		this.camera.position.lerp(new THREE.Vector3(0, scroll, this.camera.position.z), 0.08);

		this.renderer.render(this.scene, this.camera);
	}

}

export { App };
