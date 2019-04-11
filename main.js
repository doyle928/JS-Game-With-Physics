// module aliases
const Engine = Matter.Engine,
    Events = Matter.Events,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Vector = Matter.Vector,
    Common = Matter.Common,
    Vertices = Matter.Vertices,
    Svg = Matter.Svg;
// create an engine
const engine = Engine.create();


let windowX = window.innerWidth;
let windowY = window.innerHeight;

// create a renderer
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: windowX,
        height: windowY,
        wireframes: false,
        background: "#f7d691"
    }
});

let boxA = Bodies.rectangle(700, 500, 300, 300, {
    label: "level1",
    isStatic: true,
    friction: .0001,
    render: {
        fillStyle: "darkblue",
        strokeStyle: "black",
        lineWidth: 1
    },
});
let ground = Bodies.rectangle(windowX / 2, windowY + 20, windowX, 40, {
    isStatic: true,
    label: "ground",
    render: {
        fillStyle: "black"
    }
});
let borderLeft = Bodies.rectangle(-20, windowY / 2, 40, windowY, {
    isStatic: true,
    label: "borderLeft",
    render: {
        fillStyle: "black"
    }
});
let borderRight = Bodies.rectangle(windowX + 20, windowY / 2, 40, windowY, {
    isStatic: true,
    label: "borderRight",
    render: {
        fillStyle: "black"
    }
});
let ceiling = Bodies.rectangle(windowX / 2, -20, windowX, 40, {
    isStatic: true,
    render: {
        fillStyle: "black"
    }
});


let group = Body.nextGroup(true),
    length = 200,
    width = 50;

let pan = Composites.stack(150, 460, 1, 1, 0, 0, function (x, y) {
    return Bodies.rectangle(x, y, length, width, {
        collisionFilter: {
            group: group
        },
        chamfer: 5,
        density: 1,
        friction: 1,
        frictionAir: 0,
        render: {
            fillStyle: "#C0C0C0",
            lineWidth: 5,
            strokeStyle: "#4a485b"
        }
    });
});

pan.bodies[0].render.strokeStyle = "#4a485b";

Composite.add(
    pan,
    Constraint.create({
        bodyB: pan.bodies[0],
        pointB: {
            x: -length * 0.42,
            y: 0
        },
        pointA: {
            x: pan.bodies[0].position.x - length * 0.42,
            y: pan.bodies[0].position.y
        },
        stiffness: 0,
        length: 0,
        render: {
            strokeStyle: "#4a485b"
        }
    })
);

let constraint = Constraint.create({
    pointA: {
        x: 50,
        y: 700
    },
    bodyB: pan.bodies[0],
    pointB: {
        x: 85,
        y: 0
    },
    stiffness: 0.02,
    damping: 1,
    render: {
        visible: false,
        strokeStyle: "red"
    }
});
let constraint2 = Constraint.create({
    pointA: {
        x: 350,
        y: 480
    },
    bodyB: pan.bodies[0],
    pointB: {
        x: 75,
        y: 0
    },
    stiffness: 0.01,
    damping: 1,
    render: {
        visible: false,
        strokeStyle: "red"
    }
});

let panHandle = Bodies.rectangle(70, 460, 90, 15, {
    collisionFilter: {
        group: group
    },
    chamfer: .1,
    render: {
        fillStyle: "#C0C0C0",
        lineWidth: 5,
        strokeStyle: "#4a485b"
    }
});
let constraint3 = Constraint.create({
    bodyA: pan.bodies[0],
    pointA: {
        x: -90,
        y: -10
    },
    bodyB: panHandle,
    pointB: {
        x: 40,
        y: 0
    },
    stiffness: 1,
    angularStiffness: 1,
    length: 0,
    render: {
        visible: false,
        strokeStyle: "red"
    }
});
let constraint4 = Constraint.create({
    bodyA: pan.bodies[0],
    pointA: {
        x: 0,
        y: -10
    },
    bodyB: panHandle,
    pointB: {
        x: 20,
        y: 0
    },
    stiffness: 1,
    render: {
        visible: false,
        strokeStyle: "red"
    }
});


group = Body.nextGroup(true);

let bacon = Composites.stack(250, 50, 5, 1, 50, 50, function (x, y) {
    return Bodies.rectangle(x - 40, y, 25, 15, {
        collisionFilter: {
            group: group
        },
        chamfer: 5,
        density: 0.00001,
        restitution: 0.5,
        friction: 0.008,
        frictionStatic: 0.008,
        frictionAir: 0.015,
        stiffness: 1,
        angularStiffness: 1,
        label: "bacon",
        render: {
            fillStyle: "#CC0000"
        }
    });
});

Composites.chain(bacon, 0.3, 0, -0.3, 0, {
    stiffness: 1,
    length: 0,
    restitution: 0.5,
    friction: 0.008,
    frictionStatic: 0.008,
    angularStiffness: 0.2,
    render: {
        visible: false
    }
});
Events.on(engine, 'collisionActive', function (event) {
    let pairs = event.pairs;
    // console.log(pairs);
    const breakPoints = ["ground", "borderLeft", "borderRight"];
    pairs.forEach(pair => {
        breakPoints.forEach(area => {
            if (pair.bodyA.label == area && pair.bodyB.label == "bacon" ||
                pair.bodyA.label == "bacon" && pair.bodyB.label == area) {

                // reset bacon
                let moveBaconX = 250 - bacon.bodies[0].position.x;
                let moveBaconY = 50 - bacon.bodies[0].position.y;

                Composite.translate(bacon, {
                    x: moveBaconX,
                    y: moveBaconY
                });
            }
        });
        if (pair.bodyA.label == "level1" && pair.bodyB.label == "bacon" ||
            pair.bodyA.label == "bacon" && pair.bodyB.label == "level1") {
            if (bacon.bodies[0].speed <= .3) {
                setTimeout(() => {
                    if (bacon.bodies[0].speed <= .3) {
                        console.log("Level Completed");
                    }
                }, 1000);
            }
        }
    });
});


// Body.setPosition(bacon, {
//     x: 250,
//     y: 50
// });
// change object colours to show those in an active collision (e.g. resting contact)



World.add(engine.world, [
    boxA,
    ground,
    ceiling,
    borderLeft,
    borderRight,
    pan,
    constraint,
    constraint2,
    panHandle,
    constraint3,
    constraint4,
    bacon
]);

const mouseContraint = MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas),
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});
World.add(engine.world, mouseContraint);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);