let gameArea = document.getElementById("gameArea")
let title = document.getElementById("title")
let colors = ["red", "green", "blue"]
let mouseDown = false
let mouseX, mouseY
let delta = new Object()
let stoppedData = new Array()
const tps = 25
const mspt = 1000 / tps
const speed = 0.3
let n = 0

let bodyHeight = $("body").first().height()
let bodyWidth = $("body").first().width()

let sqLen = bodyHeight * 0.02 
let maxPos = bodyHeight * 0.94
let xMax = bodyWidth * 0.99

window.onload = () => {
    bodyHeight = $("body").first().height(), window.innerHeight
    bodyWidth = $("body").first().width()
    maxPos = bodyHeight * 0.94
    xMax = bodyWidth - bodyHeight * 0.01
    sqLen = bodyHeight * 0.01

    $(".end").first().css({top: $("body").first().height() - $(".end").first().height() , position: 'absolute'})
    $(".square.stopped").each((d, square) =>{
        let stSquare = $(square)
        if(stSquare.position().top < maxPos)stSquare.removeClass("stopped").addClass("playing")
        else if(stSquare.position().top > maxPos)stSquare.css({top: maxPos})
    })
}

function tick() {
    if(window.innerHeight * 0.94 !== maxPos || window.innerWidth - window.innerHeight * 0.01 !== xMax)window.onload()
    $(".square.playing").each((d, square) => {
        let jsquare = $(square)
        let i = Number(jsquare.attr("n"))
        if(!delta[i])delta[i] = speed
        let sqSpeed = speed*delta[i]
        let newTop = jsquare.position().top + sqSpeed
        
        jsquare.css({position: 'absolute', top: newTop})

        if(newTop > maxPos){
            jsquare.css({top: newTop - (newTop % maxPos)})
            if(Math.floor(Math.abs(delta[i])) < speed){
                jsquare.removeClass("playing").addClass("stopped")
                delta[i] = null
                jsquare.css({left: Math.floor(jsquare.position().left)})
                stoppedData[i] = JSON.stringify(jsquare.position())
                if(stoppedData.indexOf(stoppedData[i]) !== i){
                    jsquare.remove()
                    stoppedData[i] = null
                }
                return
            }
            delta[i] = Math.floor(delta[i]*0.5)*-1
        }

        delta[i] += speed*sqLen
    })
    if(mouseDown && mouseX < xMax && mouseY < maxPos){
        $(".gameArea").append($("<div>", {"class": "square playing"}).css({top: mouseY, left: mouseX, position:'absolute'}).attr("n", n.toString()))
        n += 1
    }
}
function toRadians (angle) {
    return angle * (Math.PI / 180)
}   
$(document).mousedown(() => {
    mouseDown = true
}).mouseup(() => {
    mouseDown = false
})
$(document).mousemove((e) => {
    mouseX = e.pageX
    mouseY = e.pageY
}).mouseover()
setInterval(tick, mspt)
