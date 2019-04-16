let glass;

$.get("././style/images/glass.svg").done(function (data) {
    var vertexSets = [];
    $(data)
        .find("path")
        .each(function (i, path) {
            vertexSets.push(Svg.pathToVertices(path, 30));
        });
    glass = Bodies.fromVertices(windowX - 100 - centerInt, 400, vertexSets, {
        label: "level3",
        render: {
            fillStyle: "transparent",
            sprite: {
                // texture: "././glass.png",
                xScale: 0.6,
                yScale: 0.6
            }
        },
        isStatic: true
    });

    console.log(glass);
    Body.scale(glass, 0.45, 0.45);
    glass.parts[8].render.sprite.xOffset = 0.64;
    glass.parts[8].render.sprite.yOffset = 0.26;
    glass.parts[8].render.sprite.texture = "././style/images/glass.png";
    // World.add(engine.world, glass);

});