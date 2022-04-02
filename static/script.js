let gameArea = document.getElementById("gameArea")
let title = document.getElementById("title")
let colors = ["red", "green", "blue"]
let mouseDown = false
let mouseX, mouseY
let delta = new Object()
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
        let maxPos = $(".end").first().position().top - jsquare.width()
        jsquare.css({position: 'absolute', top: newTop})
        
        if(newTop > maxPos){
            jsquare.css({position: 'absolute', top: newTop - (newTop % maxPos)})
            if(Math.floor(Math.abs(delta[i])) < speed)return jsquare.removeClass("playing").addClass("stopped")
            delta[i] = Math.floor(delta[i]*0.5)*-1
        }

        delta[i] += speed
    })
    if(mouseDown && mouseX < $("body").first().width() - $(".square").last().width() && mouseY < window.innerHeight - $(".end").first().height()){
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
