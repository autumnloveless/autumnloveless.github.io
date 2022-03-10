let wrapperDiv = document.querySelector(".contact-card-body.tab-content")

export default function rosslerViewer(p) {
    const a = 0.1, b = 0.1, c = 14
    const stepSize = 0.03
    let rosslerVertices = []
    let totalRosslerVertices = []
    let position
    let startingIndex = 2000

    let rotation = 0
    let rotateSlider
    let rotateSpan

    let ultimateMaxLength = 5000
    let maxLengthSlider
    let maxLengthSpan

    let wiggleSlider
    let wiggleSpan

    let wiggleHeightSlider
    let wiggleHeightSpan

    let wiggle = 0
    let movingWiggleIndex = 0
    let startingWiggleIndex = startingIndex
    let totalVerticesCalculated = 0;
    let wiggleHeight = 2;

    p.setup = function () {
        p.createCanvas(wrapperDiv.clientWidth, wrapperDiv.clientHeight, p.WEBGL);
        position = p.createVector(0.1, 0, 0)
        p.colorMode(p.HSB)

        for(let i=0; i<startingIndex; i++){
            position = nextRosslerValue(position)
            rosslerVertices.push(position) 
            totalRosslerVertices.push(position) 
        }

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

        // show rossler point
        p.noFill()
        p.strokeWeight(1);
        p.scale(7)
        p.stroke(230, 44, 44);
        displayVerticesOutline(rosslerVertices)

        // lead point
        p.strokeWeight(4);
        p.point(rosslerVertices[rosslerVertices.length - 1])

        // Add next rossler point
        position = nextRosslerValue(position)
        totalVerticesCalculated++
        rosslerVertices.push(position)
        totalRosslerVertices.push(position)

        // backup arr with total maximum allowed length
        if (totalRosslerVertices.length > ultimateMaxLength) {
            totalRosslerVertices = totalRosslerVertices.slice(totalRosslerVertices.length-ultimateMaxLength)
        }

        // variable length vertices arr
        let maxLength = p.map(maxLengthSlider.value(), 0, 200, 100,ultimateMaxLength);
        if (rosslerVertices.length > maxLength+5) {
            rosslerVertices = rosslerVertices.slice(3)
        }
        else if (rosslerVertices.length > maxLength) {
            rosslerVertices = rosslerVertices.slice(rosslerVertices.length-maxLength)
        } 
        else if(rosslerVertices.length < maxLength - 5 && totalRosslerVertices.length > rosslerVertices.length+5) {
            rosslerVertices = totalRosslerVertices.slice(totalRosslerVertices.length - (rosslerVertices.length+5))
        }

        wiggle = p.map(wiggleSlider.value(), 0, 200, 0,5);
        wiggleHeight = p.map(wiggleHeightSlider.value(), 1, 5, 5,1);

        startingWiggleIndex = Math.max(0, totalVerticesCalculated - maxLength) + movingWiggleIndex
    }

    p.windowResized = function() {
        resize()
    }

    function resize() {
        rotateSpan.position(p.width-270, 5)
        rotateSlider.position(p.width-125, 10);
        maxLengthSpan.position(p.width-270, 25)
        maxLengthSlider.position(p.width-125, 30);
        wiggleSpan.position(p.width-270, 45)
        wiggleSlider.position(p.width-125, 50);
        wiggleHeightSpan.position(p.width-270, 65)
        wiggleHeightSlider.position(p.width-125, 70);

        p.resizeCanvas(wrapperDiv.clientWidth, wrapperDiv.clientHeight)
    }

    function nextRosslerValue({x, y, z}) {
        let dx = ((-1 * y) - z) * stepSize
        let dy = (x + (a * y)) * stepSize
        let dz = (b + z * (x - c)) * stepSize
        return p.createVector(x + dx, y + dy, z + dz)
    }

    function displayVerticesOutline(vertices) {
        p.beginShape()
        let index = 0;
        for (let vert of vertices) {
            let {x,y,z} = vert
            x += p.sin(wiggle * (startingWiggleIndex + index/20)) / wiggleHeight
            p.vertex(x, y, z);
            index += 1;
        }
        p.endShape()
        movingWiggleIndex += 0.001
    }

}