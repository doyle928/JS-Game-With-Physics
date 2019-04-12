let boxA = Bodies.rectangle(400, 500, 300, 300, {
    label: "level1",
    isStatic: true,
    friction: 0.0001,
    render: {
        fillStyle: "darkblue",
        strokeStyle: "black",
        lineWidth: 1
    }
});
World.add(engine.world, boxA);