function resetBacon() {
    let moveBaconX = 87 - bacon.bodies[0].position.x + centerInt;
    let moveBaconY = 50 - bacon.bodies[0].position.y;

    Composite.translate(bacon, {
        x: moveBaconX,
        y: moveBaconY
    });
    for (i = 0; i < bacon.bodies.length; i++) {
        bacon.bodies[i].speed = 0;
        bacon.bodies[i].frictionAir = 1;
    }
    // make bacon be at stand still when reset
    setTimeout(() => {
        for (i = 0; i < bacon.bodies.length; i++) {
            bacon.bodies[i].frictionAir = .0015;
        }
    }, 100);
}

Events.on(engine, "collisionActive", function (event) {
    let pairs = event.pairs;
    // console.log(pairs);
    const breakPoints = ["ground", "borderLeft", "borderRight"];
    pairs.forEach(pair => {
        breakPoints.forEach(area => {
            if (
                (pair.bodyA.label == area && pair.bodyB.label == "bacon") ||
                (pair.bodyA.label == "bacon" && pair.bodyB.label == area)
            ) {
                // reset bacon
                resetBacon();


            }
        });
        if (
            (pair.bodyA.label == "level1" && pair.bodyB.label == "bacon") ||
            (pair.bodyA.label == "bacon" && pair.bodyB.label == "level1")
        ) {
            if (bacon.bodies[0].speed <= 0.3) {
                setTimeout(() => {
                    if (bacon.bodies[0].speed <= 0.3 && ((pair.bodyA.label == "level1" && pair.bodyB.label == "bacon") ||
                            (pair.bodyA.label == "bacon" && pair.bodyB.label == "level1"))) {
                        console.log("Level Completed");
                        World.remove(engine.world, boxA);
                        $(".instructions").text("Get the bacon on the sandwich");
                        resetBacon();
                        World.add(engine.world, sand1);

                    }
                }, 1000);
            }
        }
    });
});