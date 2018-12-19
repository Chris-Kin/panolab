/* eslint-disable */

var THREE = require('three');

module.exports = function(picUrl, dom) {
	var manualControl = false;
	var longitude = 90;
	var latitude = 90;
	var savedX;
	var savedY;
	var savedLongitude = 0;
	var savedLatitude = 0;
	var deg2rad = Math.PI / 180;

	// setting up the renderer
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	dom.innerHTML = '';
	dom.appendChild(renderer.domElement);

	// creating a new scene
	var scene = new THREE.Scene();


	// adding a camera
	// 改变视角，影响图片畸变，视角越小图片畸变越小但能见区域也越小，否则相反
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
	camera.rotation.order = "ZXY";
	// creation of a big sphere geometry
	// https://threejs.org/docs/scenes/geometry-browser.html#SphereGeometry
	var sphere = new THREE.SphereGeometry(1000, 100, 30, 0, Math.PI*2, 0, Math.PI);
	sphere.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

	// creation of the sphere material
	var sphereMaterial = new THREE.MeshBasicMaterial();
	sphereMaterial.map = THREE.ImageUtils.loadTexture(picUrl)

	// geometry + material = mesh (actual object)
	var sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
	// 旋转球体的角度，使得手机屏幕水平朝上时显示的是图片纬度为-90°的部分
	sphereMesh.rotation.x = 90 * deg2rad;
	sphereMesh.rotation.y = 90 * deg2rad;
	scene.add(sphereMesh);
	render();

	function render(){
		requestAnimationFrame(render);
		// calling again render function
		renderer.render(scene, camera);
	}

	// var $arrow = $('#arrow');

	// 监听陀螺仪
	addEventListener('deviceorientation', function(e){

		var alpha = e.alpha * deg2rad;
		var beta = e.beta * deg2rad;
		var gamma = e.gamma * deg2rad;
		var temp;

		switch(window.orientation) {
			case -90:
				temp = beta;
				beta = gamma;
				gamma = -temp;
				break;
			case 90:
				temp = beta;
				beta = -gamma;
				gamma = temp;
				break;
			case 180:
				beta = -beta;
				gamma = -gamma;
				break;
		}

		camera.rotation.set(beta, gamma, alpha);

		moveArrow( gamma*50, beta*50);

	});



	// // panoramas background
	// var textureArray = [];
	// var panoramasArray = ["/images/pano/1.JPG","/images/pano/5.JPG","/images/pano/2.JPG","/images/pano/3.JPG", "/images/pano/4.JPG", "/images/pano/grid.JPG"];
	// panoramasArray.forEach(function(el) {
	// 	textureArray.push(THREE.ImageUtils.loadTexture(el));
	// })
	
	// // 场景切换
	// $('.j-switch-btn').click(changeTexture);
	// $arrow.click(changeTexture);

	// /**
	//  * 改变场景
	//  */
	// function changeTexture() {
	// 	sphereMaterial.map = textureArray[Math.floor(Math.random()*(textureArray.length))];
	// }

	/**
	 * 移动箭头
	 * @param  {[type]} longitude [description]
	 * @param  {[type]} latitude  [description]
	 */
	function moveArrow(longitude, latitude) {
		$arrow.css({
			transform: ["translate(", longitude*10, "px,", latitude*10, "px)"].join('')
		})
	}

	// listeners mouse
	document.addEventListener("mousedown", onDocumentMouseDown, false);
	document.addEventListener("mousemove", onDocumentMouseMove, false);
	document.addEventListener("mouseup", onDocumentMouseUp, false);

	// when the mouse is pressed, we switch to manual control and save current coordinates
	function onDocumentMouseDown(event){
		event.preventDefault();
		manualControl = true;

		savedX = event.clientX;
		savedY = event.clientY;

		savedLongitude = longitude;
		savedLatitude = latitude;
	}

	// when the mouse moves, if in manual contro we adjust coordinates
	function onDocumentMouseMove(event){
		if(manualControl){
			longitude = ((savedX - event.clientX) * 0.1 + savedLongitude)%360;
			latitude = (savedY - event.clientY) * 0.1 + savedLatitude;
			// 用户拖动鼠标时，改变球体的rotation，而非相机，相机会导致z轴的旋转
			sphereMesh.rotation.set(latitude * deg2rad, longitude * deg2rad, 0);
			// 移动箭头
			moveArrow(-longitude, -latitude);
		}
	}

	// when the mouse is released, we turn manual control off
	function onDocumentMouseUp(event){
		manualControl = false;
	}

	// onresize = function(){
	// 	renderer.setSize(window.innerWidth, window.innerHeight);
	// }

}