let boxA = Bodies.rectangle(windowX - 100 - centerInt, 400, 150, 150, {
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