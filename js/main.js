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

var defaultCategory = 0x0001,
    redCategory = 0x0002,
    greenCategory = 0x0004,
    blueCategory = 0x0008;


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


let pan = Bodies.fromVertices(60, 460, Vertices.fromPath('100 0 85 35 15 35 0 0'), {
    render: {},
    collisionFilter: {
        mask: redCategory
    }
}, true);

let pan2 = Bodies.fromVertices(60, 460, Vertices.fromPath('100 0 85 35 15 35 0 0'), {
    render: {
        fillStyle: "#666666",
        strokeStyle: "black",
        lineWidth: 1
    },
    collisionFilter: {
        mask: greenCategory
    }
}, true);

group = Body.nextGroup(true);

let panHandle = Bodies.rectangle(-5, 452, 70, 8, {
    collisionFilter: {
        mask: blueCategory
    },
    chamfer: 1,
    render: {
        fillStyle: "black",
        strokeStyle: "black",
        lineWidth: 1
    }
});

let compoundPan = Body.create({
    parts: [panHandle, pan, pan2],
    density: 1,
    friction: .00001,
    frictionStatic: .00001,
    frictionAir: 0.015,
    restitution: .9,
});

var constraint = Constraint.create({
    pointA: {
        x: 60,
        y: 460
    },
    bodyB: compoundPan,
    pointB: {
        x: -50,
        y: -5
    },
    length: 0,
    damping: .1,
    render: {
        visible: false,
        strokeStyle: "red"
    }

});

let constraint2 = Constraint.create({
    pointA: {
        x: 60,
        y: 660
    },
    bodyB: compoundPan,
    pointB: {
        x: 45,
        y: -10
    },
    stiffness: 0.01,
    damping: .9,
    render: {
        visible: false,
        strokeStyle: "red"
    }

});
let constraint3 = Constraint.create({
    pointA: {
        x: 210,
        y: 450
    },
    bodyB: compoundPan,
    pointB: {
        x: 45,
        y: -10
    },
    stiffness: 0.03,
    damping: .9,
    render: {
        visible: false,
        strokeStyle: "red"
    },
    length: 0
});


group = Body.nextGroup(true);

let bacon = Composites.stack(140, 50, 5, 1, 20, 20, function (x, y) {
    return Bodies.rectangle(x - 20, y, 22, 12, {
        collisionFilter: {
            group: group
        },
        chamfer: 5,
        density: 0.00001,
        restitution: 0.5,
        friction: 0.01,
        frictionStatic: 0.01,
        frictionAir: 0.015,
        stiffness: 1,
        angularStiffness: 1,
        label: "bacon",
        render: {
            fillStyle: "#CC0000"
        }
    });
});

Composites.chain(bacon, 0.20, 0, -0.20, 0, {
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


World.add(engine.world, [
    // boxA,
    ground,
    ceiling,
    borderLeft,
    borderRight,
    // pan,
    // pan2,
    // panHandle,
    compoundPan,
    constraint,
    constraint2,
    constraint3,
    // constraint4,
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