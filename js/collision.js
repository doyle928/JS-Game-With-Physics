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


// reset bacon in case it flies through barries
setInterval(() => {
    if (bacon.bodies[0].position.x > windowX || bacon.bodies[0].position.x < 0) {
        for (i = 0; i < bacon.bodies.length; i++) {
            bacon.bodies[i].speed = 0;
            bacon.bodies[i].frictionAir = 1;
        }
        resetBacon();
    }
    if (bacon.bodies[0].position.y > windowY || bacon.bodies[0].position.y < 0) {
        for (i = 0; i < bacon.bodies.length; i++) {
            bacon.bodies[i].speed = 0;
            bacon.bodies[i].frictionAir = 1;
        }
        resetBacon();
    }
}, 1000);


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
                        console.log("Level 1 Completed");
                        World.remove(engine.world, boxA);
                        $(".instructions").text("Get the bacon on the sandwich");
                        resetBacon();
                        World.add(engine.world, sand1);

                    }
                }, 1000);
            }

        }
        if (
            (pair.bodyA.label == "level2" && pair.bodyB.label == "bacon") ||
            (pair.bodyA.label == "bacon" && pair.bodyB.label == "level2")
        ) {
            if (bacon.bodies[0].speed <= 0.3) {
                setTimeout(() => {
                    if (bacon.bodies[0].speed <= 0.3 && ((pair.bodyA.label == "level2" && pair.bodyB.label == "bacon") ||
                            (pair.bodyA.label == "bacon" && pair.bodyB.label == "level2"))) {
                        console.log("Level 2 Completed");
                        for (i = 0; i < (sand1.parts.length + 10); i++) {
                            World.remove(engine.world, sand1);
                            i++;
                        }
                        $(".instructions").text("Get the bacon on the drink");
                        resetBacon();
                        World.add(engine.world, glass);

                    }
                }, 1000);
            }

        }
        if (
            (pair.bodyA.label == "level3" && pair.bodyB.label == "bacon") ||
            (pair.bodyA.label == "bacon" && pair.bodyB.label == "level3")
        ) {
            if (bacon.bodies[0].speed <= 0.3) {
                setTimeout(() => {
                    if (bacon.bodies[0].speed <= 0.3 && ((pair.bodyA.label == "level3" && pair.bodyB.label == "bacon") ||
                            (pair.bodyA.label == "bacon" && pair.bodyB.label == "level3"))) {
                        console.log("Level 3 Completed");
                        for (i = 0; i < (glass.parts.length + 10); i++) {
                            World.remove(engine.world, glass);
                            i++;
                        }
                        $(".instructions").text("Get the bacon on the motivational quote");
                        resetBacon();
                        World.add(engine.world, quote);

                    }
                }, 1500);
            }

        }

        if (
            (pair.bodyA.label == "level4" && pair.bodyB.label == "bacon") ||
            (pair.bodyA.label == "bacon" && pair.bodyB.label == "level4")
        ) {
            if (bacon.bodies[0].speed <= 0.3) {
                setTimeout(() => {
                    if (bacon.bodies[0].speed <= 0.3 && ((pair.bodyA.label == "level4" && pair.bodyB.label == "bacon") ||
                            (pair.bodyA.label == "bacon" && pair.bodyB.label == "level4"))) {
                        console.log("Level 4 Completed");
                        for (i = 0; i < (quote.parts.length + 10); i++) {
                            World.remove(engine.world, quote);
                            i++;
                        }
                        $(".instructions").text("Get the bacon on the End of Game");
                        resetBacon();
                        World.add(engine.world, end);

                    }
                }, 1500);
            }

        }
        if (
            (pair.bodyA.label == "level5" && pair.bodyB.label == "bacon") ||
            (pair.bodyA.label == "bacon" && pair.bodyB.label == "level5")
        ) {
            if (bacon.bodies[0].speed <= 0.3) {
                setTimeout(() => {
                    if (bacon.bodies[0].speed <= 0.3 && ((pair.bodyA.label == "level5" && pair.bodyB.label == "bacon") ||
                            (pair.bodyA.label == "bacon" && pair.bodyB.label == "level5"))) {
                        console.log("Level 5 Completed");

                        $(".instructions").text("You did it!\nThanks for Playing!");
                    }
                }, 1500);
            }

        }
    });
});