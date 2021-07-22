// (ES6) import external elements
import {GLTFLoader} from "./GLTFLoader.js";
import * as THREE from "./three.module.js";
// using Engine.js
var engine = new Engine();
// GLTFLoader
var loaderGLB = new GLTFLoader();
// array of bone inverses
var boneArray = [];
// array of skinned meshes
var skinnedMesh = [];
//
var obj = new THREE.Object3D();

var clothBoneArray=[];

// initialize skinnedMesh array
function initSkinnedMesh(glb)
{
    glb.scene.traverse(node=> {
        if (node instanceof THREE.SkinnedMesh) {
            console.log(node);
            skinnedMesh.push(node);
        }
    })
}

// initialize bone inverses
function initBoneInverse(boneArray,skinnedMesh)
{
    var boneInverse = skinnedMesh[0].skeleton.boneInverses;
    for(var i = 0; i<boneInverse.length;i++)
    {
        var copy = new THREE.Matrix4().copy(boneInverse[i]);
        boneArray.push(copy);
    }
    boneInverse=skinnedMesh[skinnedMesh.length-1].skeleton.boneInverses;
    for(var i=0;i<boneInverse.length;i++){
        var copy=new THREE.Matrix4().copy(boneInverse[i]);
        clothBoneArray.push(copy);
    }
}

// change the scale of bones
function changeScale(skinnedMesh,adjustIndex,scale)
{
    // console.log(skinnedMesh);
    var bone = new THREE.Matrix4().copy(boneArray[adjustIndex]);
    // var scale = new THREE.Vector3(2,1,1);
    // console.log(bone.elements)
    bone.scale(scale);
    // console.log(bone.elements)
    for(var i = 0;i<skinnedMesh.length-1;i++)
    {
        skinnedMesh[i].skeleton.boneInverses[adjustIndex] = bone;
    }
}

function changeClothScale(skinnedMesh,adjustIndex,scale)
{
    // console.log(skinnedMesh);
    var bone = new THREE.Matrix4().copy(clothBoneArray[adjustIndex]);
    // var scale = new THREE.Vector3(2,1,1);
    // console.log(bone.elements)
    bone.scale(scale);
    // console.log(bone.elements)
    skinnedMesh[skinnedMesh.length-1].skeleton.boneInverses[adjustIndex] = bone;
}

// change the weight of a bone
// proved not effective
/*function changeWeight(meshIndex)
{
    var weight = skinnedMesh[meshIndex].geometry.attributes.skinWeight;
    // console.log(weight);
    var weightArray = weight.array;

    var itemSize = 4;
    for(var i = 0;i<weightArray.length;++i)
    {
        if(i%itemSize === 0)
        {
            weightArray[i] = 1;
        }
        else
        {
            weightArray[i] = 0;
        }
    }
    console.log(weightArray);
}*/

// load a model to a webpage
function loadGLB()
{
    loaderGLB.load("model/people/model.glb",(glb)=>
    {
        var scene = glb.scene;
        console.log(scene);
        initSkinnedMesh(glb);
        // for(var i = 0;i<skinnedMesh.length;i++)
        // {
        //     changeWeight(i);
        // }
        initBoneInverse(boneArray,skinnedMesh);
        // console.log(skinnedMesh);
        obj.add(scene);
        // console.log(obj);
        obj.children[0].scale.set(100,100,100);
        changeScale(skinnedMesh,35,new THREE.Vector3(1.5,1,1));
        changeClothScale(skinnedMesh,7,new THREE.Vector3(1.3,1,1));
        engine.scene.add(obj);
    })
}

function change(adjustIndex,type){
    if(type==1){
        if(adjustIndex==35){
            var size = document.getElementById("bodySpine02_size").value;
            console.log(bodySpine02_size.value+"&&"+size);
            document.getElementById("valbodySpine02").innerHTML = size;
        }
        changeScale(skinnedMesh,adjustIndex,new THREE.Vector3(size,1,1));
    }else{
        if(adjustIndex==7){
            var size = document.getElementById("clothSpine02_size").value;
            document.getElementById("valclothSpine02").innerHTML = size;
        }
        changeClothScale(skinnedMesh,adjustIndex,new THREE.Vector3(1.3,1,1));
    }
}

engine.start();
loadGLB();
