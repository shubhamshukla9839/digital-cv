import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';



const scene=new THREE.Scene();   // container

const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.5,1000)// field of view , aspect ratio , views fustum

const renderer=new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(100);
camera.position.setX(100);

renderer.render(scene,camera);  /// render === draw
const geometry= new THREE.TorusGeometry(40,1,10,100)  // make an object

//const material= new THREE.MeshBasicMaterial({color:0xFF6347, wireframe: true}) ;// the wrapper paper for an object
// basicmaterial doesnot require any lightning propery 
const material= new THREE.MeshStandardMaterial({color:0xFF6337}) ;  // it require
const torus =new THREE.Mesh(geometry,material);

scene.add(torus)   // here we want to gain caler render method so instead of calling again again we make seperate fun 

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);
scene.add(pointLight);

const ambientLight=new THREE.AmbientLight(0xffffff);
scene.add(ambientLight,pointLight);


//const gridHelper=new THREE.GridHelper(200,50);
//const lightHelper=new THREE.PointLightHelper(pointLight);

//scene.add(lightHelper,gridHelper)   // from where light is coming


const controls=new OrbitControls(camera,renderer.domElement);   //  instiate class lishen dom event of mouse and animate

 
function addStar() {
  const geometry1 = new THREE.SphereGeometry(0.1, 20, 20);
  const material1 = new THREE.MeshStandardMaterial( {color : 0xffffff});
  const star = new THREE.Mesh( geometry1, material1);

  const [x, y, z] = Array(3)
  .fill()
  .map(() => THREE.MathUtils.randFloatSpread( 100 ));

  star.position.set(x,y,z);
  scene.add(star);


}
Array(1000).fill().forEach(addStar)  ;    


const moonTexture=new THREE.TextureLoader().load("moon2.jpg");
const normalTexture=new THREE.TextureLoader().load("normal2.jpg");
const moon= new THREE.Mesh(

  new THREE.SphereGeometry(55,55,52),
  new THREE.MeshStandardMaterial({
    map:moonTexture,
    normalMap:normalTexture
  })
);
scene.add(moon)
moon.position.z=10;
moon.position.y=60;
moon.position.x=60;




const jeffTexture =new THREE.TextureLoader().load("self.jpg");

const jeff= new THREE.Mesh(
  new THREE.BoxGeometry(50,50,50),
  new THREE.MeshBasicMaterial({map:jeffTexture})
);
scene.add(jeff);
jeff.position.z=80;
jeff.position.y=100;
jeff.position.x=0.2;
//moon.position.setX(-30);  


function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x +=0.05;
  moon.rotation.y +=0.075;
  moon.rotation.z +=0.05;

  
  jeff.rotation.z +=0.08;
  jeff.rotation.x +=0.08;

  camera.position.z= t * -0.01;
  camera.position.x= t * -0.05;
  camera.position.y= t * -0.2;

}
document.body.onscroll = moveCamera









const spaceTexture= new THREE.TextureLoader().load("space4.jpg");

scene.background=spaceTexture;







function animate() {                  // when browser refresh it recall

  requestAnimationFrame( animate );

  torus.rotation.x +=0.1;
  torus.rotation.y +=0.005;
  torus.rotation.z +=0.01;

  controls.update();
  renderer.render(scene,camera);
}
animate()
