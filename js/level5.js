let end;

$.get("././style/images/end.svg").done(function (data) {
    var vertexSets = [];
    $(data)
        .find("path")
        .each(function (i, path) {
            vertexSets.push(Svg.pathToVertices(path, 30));
        });
    end = Bodies.fromVertices(windowX - 110 - centerInt, 400, vertexSets, {
        label: "level5",
        render: {
            fillStyle: "transparent",
            sprite: {
                // texture: "././end.png",
                xScale: 0.60,
                yScale: 0.60
            }
        },
        isStatic: true
    });

    console.log(end);
    Body.scale(end, 0.70, 0.70);
    end.parts[37].render.sprite.xOffset = 0.69;
    end.parts[37].render.sprite.yOffset = 0.63;
    end.parts[37].render.sprite.texture = "././style/images/end.png";
    // World.add(engine.world, end);

});