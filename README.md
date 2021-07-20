# Virtual Fitting Room
SITP Project Virtual Fitting Room

#### 2021.7.19 与学长讨论，总结方案如下

1. 使用自己绑定骨骼模型，衣服与人体绑定同一骨骼（21块）通过代码改变骨骼权重；

2. 使用原模型，骨骼已绑定好（101块），采用KNN算法寻找骨骼影响的最近点来进行衣服的适配


#### 2021.7.20 尝试方案1，行不通

和学长讨论，在blender里试着调整骨骼，发现同样有穿模的问题，可以确定是骨骼绑定的问题。学长建议我们放弃绑定骨骼的方法，先查找论文，看其他穿衣的思路。

本来想把我的threejs迁移到最新版，可是发现要用import之类的，又和npm啥的有关系了，跑不通。无奈只能先用92dev做。

#### 2021.7.20 版本迁移说明（92dev->latest）

新版的threejs 使用的是ES6 直接引入跑不起来的原因是它使用了import和export 我的修改方法是将所有使用import和export的js文件，引入时都将type指定为module,若不用import 则指定为text/javascript,具体如下：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>TryOn</title>
    <script src="js/three.js" type="module"></script>
    <script src="js/OrbitControls.js" type="module"></script>
    <script src="js/Engine.js" type="text/javascript"></script>
    <script src="js/GLTFLoader.js" type="module"></script>
    <script src="js/three.module.js" type="module"></script>
   </head>
<body>
<script src="js/tryon.js" type="module"></script>
</body>
</html>
```

注意要引入three.module.js

以及把新复制进来的threejs源码中import的路径改了，我这里是(不要无脑复制，先看看自己项目的文件结构和我这的一样不，或者从github上直接克隆一下也行)

```javascript
import ... from './three.module.js'
```

以及在tryon.js(试衣主文件)里引入three.module.js、GLTFLoader

```javascript
import {GLTFLoader} from "./GLTFLoader.js";
import * as THREE from "./three.module.js";
```

注意！！！**import的时候路径前面一定是 ../ 或者 ./ 或者 / 不然就报错了**，用`<script>`引入的时候没必要这么做。
