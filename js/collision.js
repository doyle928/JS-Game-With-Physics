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
                let moveBaconX = 140 - bacon.bodies[0].position.x;
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
        });
        if (
            (pair.bodyA.label == "level1" && pair.bodyB.label == "bacon") ||
            (pair.bodyA.label == "bacon" && pair.bodyB.label == "level1")
        ) {
            if (bacon.bodies[0].speed <= 0.3) {
                setTimeout(() => {
                    if (bacon.bodies[0].speed <= 0.3) {
                        console.log("Level Completed");
                        World.remove(engine.world, boxA);
                    }
                }, 1000);
            }
        }
    });
});