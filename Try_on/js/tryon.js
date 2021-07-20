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
var skinnedMesh = []
//
var obj = new THREE.Object3D();

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
    for(var i = 0;i<skinnedMesh.length;i++)
    {
        skinnedMesh[i].skeleton.boneInverses[adjustIndex] = bone;
    }
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
    loaderGLB.load("model/people/try.glb",(glb)=>
    {
        var scene = glb.scene;
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
        changeScale(skinnedMesh,17,new THREE.Vector3(1.5,1,1));
        engine.scene.add(obj);

    })

}

engine.start();
loadGLB();