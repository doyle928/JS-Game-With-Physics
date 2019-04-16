let sand1;

$.get('././style/images/sandwich.svg').done(function (data) {
    var vertexSets = [];
    $(data).find('path').each(function (i, path) {
        vertexSets.push(Svg.pathToVertices(path, 30));
    });

    sand1 = Bodies.fromVertices(windowX - 100 - centerInt, 400, vertexSets, {
        label: "level2",
        render: {
            fillStyle: "transparent",
            sprite: {
                // texture: "././sandwich.png",
                xScale: .63,
                yScale: .63
            }
        },
        isStatic: true
    });
    console.log(sand1);
    Body.scale(sand1, .45, .45);
    sand1.parts[18].render.sprite.texture = "././style/images/sandwich.png";



});