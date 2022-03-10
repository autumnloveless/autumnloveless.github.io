let wrapperDiv = document.querySelector(".contact-card-body.tab-content")

export default function lorenzViewer(p) {
    const a = 10, b = 8 / 3, c = 28
    const stepSize = 0.01
    let lorenzVertices = []
    let totalLorenzVertices = []
    let position

    let rotation = 0
    let rotateSlider
    let rotateSpan

    let maxLengthSlider
    let maxLengthSpan

    let wiggleSlider
    let wiggleSpan

    let wiggleHeightSlider
    let wiggleHeightSpan

    let wiggle = 0
    let movingWiggleIndex = 0
    let startingWiggleIndex = 0
    let totalVerticesCalculated = 0;
    let wiggleHeight = 2;

    p.setup = function () {
        p.createCanvas(wrapperDiv.clientWidth, wrapperDiv.clientHeight, p.WEBGL);
        position = p.createVector(0.1, 0, 0)
        p.colorMode(p.HSB)

        // rotation controls
        rotateSpan = p.createSpan('Rotation Speed:')
        rotateSpan.position(p.width-270, 5)

        rotateSlider = p.createSlider(0, 200, 50);
        rotateSlider.position(p.width-125, 10);
        rotateSlider.style('width', '80px');

        // length controls
        maxLengthSpan = p.createSpan('Max Line Length:')
        maxLengthSpan.position(p.width-270, 25)

        maxLengthSlider = p.createSlider(0, 200, 100);
        maxLengthSlider.position(p.width-125, 30);
        maxLengthSlider.style('width', '80px');

        // wiggle controls
        wiggleSpan = p.createSpan('Wiggle Frequency:')
        wiggleSpan.position(p.width-270, 45)

        wiggleSlider = p.createSlider(0, 200, 0);
        wiggleSlider.position(p.width-125, 50);
        wiggleSlider.style('width', '80px');

        wiggleHeightSpan = p.createSpan('Wiggle Height:')
        wiggleHeightSpan.position(p.width-270, 65)

        wiggleHeightSlider = p.createSlider(1, 5, 2);
        wiggleHeightSlider.position(p.width-125, 70);
        wiggleHeightSlider.style('width', '80px');

    }

    p.draw = function () {
        // p.translate(0, 0, 0)
        p.background('#D1E1E0')
        p.orbitControl()
        p.rotateY(rotation)
        let rotateSpeed = p.map(rotateSlider.value(), 0, 200, 0, 1);
        rotation += 0.01 * rotateSpeed

        // show lorenz point
        p.noFill()
        p.strokeWeight(1);
        p.scale(7)
        p.stroke(230, 44, 44);
        displayVerticesOutline(lorenzVertices)

        // lead point
        p.strokeWeight(4);
        p.point(lorenzVertices[lorenzVertices.length - 1])

        // Add next lorenz point
        position = nextLorenzValue(position)
        totalVerticesCalculated++
        lorenzVertices.push(position)
        totalLorenzVertices.push(position)

        // backup arr with total maximum allowed length
        if (totalLorenzVertices.length > 2300) {
            totalLorenzVertices = totalLorenzVertices.slice(totalLorenzVertices.length-3000)
        }

        // variable length vertices arr
        let maxLength = p.map(maxLengthSlider.value(), 0, 200, 100,3000); // 1600
        if (lorenzVertices.length > maxLength+5) {
            lorenzVertices = lorenzVertices.slice(3)
        }
        else if (lorenzVertices.length > maxLength) {
            lorenzVertices = lorenzVertices.slice(lorenzVertices.length-maxLength)
        } 
        else if(lorenzVertices.length < maxLength - 5 && totalLorenzVertices.length > lorenzVertices.length+5) {
            lorenzVertices = totalLorenzVertices.slice(totalLorenzVertices.length - (lorenzVertices.length+5))
        }

        wiggle = p.map(wiggleSlider.value(), 0, 200, 0,5);
        wiggleHeight = p.map(wiggleHeightSlider.value(), 1, 5, 5,1);

        startingWiggleIndex = Math.max(0, totalVerticesCalculated - maxLength) + movingWiggleIndex
    }

    p.windowResized = function() {
        rotateSlider.position(p.width-100, 10);
    }

    function nextLorenzValue({x, y, z}) {
        let dx = (a * (y - x)) * stepSize
        let dy = (x * (c - z) - y) * stepSize
        let dz = ((x * y) - (b * z)) * stepSize
        return p.createVector(x + dx, y + dy, z + dz)
    }

    function displayVerticesOutline(vertices) {
        p.beginShape()
        let index = 0;
        for (let vert of vertices) {
            let {x,y,z} = vert
            x += p.sin(wiggle * (startingWiggleIndex + index)) / wiggleHeight
            p.vertex(x, y, z);
            index += 1;
        }
        p.endShape()
        movingWiggleIndex += 0.1
    }

}