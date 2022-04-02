let gameArea = document.getElementById("gameArea")
let title = document.getElementById("title")
let colors = ["red", "green", "blue"]
let mouseDown = false
let mouseX, mouseY
let delta = new Object()
let stoppedData = new Array()
const tps = 30
const mspt = 1000 / tps
const speed = 10
let n = 0
window.onload = () => {$(".end").first().css({top: $("body").first().height() - $(".end").first().height() , position: 'absolute'})}
function tick() {
    $(".square.playing").each((d, square) => {
        let jsquare = $(square)
        let i = Number(jsquare.attr("n"))
        if(!delta[i])delta[i] = 0
        let sqSpeed = speed*delta[i]/window.innerHeight
        let newTop = jsquare.position().top + sqSpeed
        let maxPos = window.innerHeight * 0.95 - window.innerWidth * 0.005
        jsquare.css({position: 'absolute', top: newTop})

        if(newTop > maxPos){
            jsquare.css({position: 'absolute', top: newTop - (newTop % maxPos)})
            if(Math.floor(Math.abs(delta[i])) < speed){
                jsquare.removeClass("playing").addClass("stopped")
                delta[i] = null
                jsquare.css({position: 'absolute', left: Math.floor(jsquare.position().left)})
                stoppedData[i] = JSON.stringify(jsquare.position())
                if(stoppedData.indexOf(stoppedData[i]) !== i){
                    jsquare.remove()
                    stoppedData[i] = null
                }
                return
            }
            delta[i] = Math.floor(delta[i]*0.5)*-1
        }

        delta[i] += speed
    })
    if(mouseDown && mouseX < window.innerWidth * 0.995 && mouseY < window.innerHeight * 0.945){
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
