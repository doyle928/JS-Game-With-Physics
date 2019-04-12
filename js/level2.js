// complex svg causes crash...
// need to go with less complex and just layer a sprite over it...


// let sand1 = Bodies.fromVertices(500, 500, commandPart1, {
//     render: {
//         fillStyle: "black"
//     },
//     isStatic: true
// }, true);
// console.log(commandPart1);
// World.add(engine.world, sand1);

// var vertexSets = [],
//     color = Common.choose(['#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58']);

// $('#svg').find('path').each(function (i, path) {
//     console.log(path);
//     // vertexSets.push(Svg.pathToVertices(path, 100));
//     var v = Bodies.fromVertices(100 + (i * 80), 80, Svg.pathToVertices(path, 20), {
//         render: {
//             fillStyle: color,
//             strokeStyle: color
//         }
//     }, true);
//     console.log(v)
//     vertexSets.push(v);
//     // World.add(engine.world, v);
// });
// World.add(engine.world, vertexSets);