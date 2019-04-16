let quote;

$.get("././style/images/quote.svg").done(function (data) {
    var vertexSets = [];
    $(data)
        .find("path")
        .each(function (i, path) {
            vertexSets.push(Svg.pathToVertices(path, 30));
        });
    quote = Bodies.fromVertices(windowX - 110 - centerInt, 400, vertexSets, {
        label: "level4",
        render: {
            fillStyle: "transparent",
            sprite: {
                // texture: "././quote.png",
                xScale: 0.68,
                yScale: 0.68
            }
        },
        isStatic: true
    });

    console.log(quote);
    Body.scale(quote, 0.70, 0.70);
    quote.parts[76].render.sprite.xOffset = 0.16;
    quote.parts[76].render.sprite.yOffset = 0.53;
    quote.parts[76].render.sprite.texture = "././style/images/quote.png";

});