// a generalized web3D initializing engine
// not using ES6 so it is imported as "text/javascript"
function Engine()
{
    this.scene = new THREE.Scene();
    var scope = this;

    // these are some fundamental elements in a 3D webpage
    this.renderer = new THREE.WebGLRenderer({alpha:true,antialias:true});
    this.camera  = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight,1,10000);
    this.dirLight = new THREE.DirectionalLight(0xF79F81);
    this.ambient = new THREE.AmbientLight(0xffdab3);
    this.control = new THREE.OrbitControls(scope.camera,scope.renderer.domElement)

    // camera
    this.initCamera = function()
    {
        this.camera.position.set(40, 150, 350);
        this.camera.lookAt(scope.scene.position);
    }

    // renderer
    this.initRenderer = function()
    {
        var width = window.innerWidth;
        var height = window.innerHeight;
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0xb9d3ff, 1);
        document.body.appendChild(scope.renderer.domElement );
    }

    // directional light
    this.addDirLight = function()
    {
        this.dirLight.position.set(100,100,100);
        this.scene.add(scope.dirLight);
    }

    // ambient light
    this.addAmbLight = function()
    {
        this.ambient.position.set(100,100,100);
        this.scene.add(scope.ambient);
    }

    // render function
    this.Render = function()
    {
        // this.renderer = new THREE.WebGLRenderer();
        // console.log(this.renderer);
        scope.renderer.render(scope.scene,scope.camera);
        requestAnimationFrame(scope.Render);
    }

    // engine start, rendering all the elements to the page
    this.start = function()
    {
        this.initCamera();
        this.initRenderer();
        this.addDirLight();
        this.addAmbLight();
        this.Render();
    }
}

// You can use it like this
/*
 var engine = new Engine();
 engine.start();
*/
// You can also change or add attributes to the source code
