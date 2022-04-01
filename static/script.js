let gameArea = document.getElementById("gameArea")
let title = document.getElementById("title")
let colors = ["red", "green", "blue"]
let mouseDown = false
let mouseX, mouseY

const tps = 30
const mspt = 1000 / tps
const speed = 3
window.onload = () => {$(".end").first().css({top: $("body").first().height() - $(".end").first().height() , position: 'absolute'})}
function tick() {
    $(".square.playing").each((i, square) => {
        let jsquare = $(square)
        let delta = Number(jsquare.attr("delta"))
        jsquare.css({position: 'absolute', top: jsquare.position().top + speed*(delta/window.innerHeight*2)})
        delta += speed
        jsquare.attr("delta", delta.toString())
        if(jsquare.position().top > $(".end").first().position().top - jsquare.width()){
            if(Math.floor(Math.abs(delta)) < 5)return jsquare.removeClass("playing").addClass("stopped")
            delta = Math.floor(delta*0.5)*-0.5
            jsquare.attr("delta", delta.toString())
        }
    })
    if(mouseDown && mouseX < window.innerWidth && mouseY < window.innerHeight){
        $(".gameArea").append($("<div>", {"class": "square playing"}).css({top: mouseY, left: mouseX, position:'absolute'}).attr("delta", "0"))
    }
}   
$(document).mousedown(function() {
    mouseDown = true
}).mouseup(function() {
    mouseDown = false
})
$(document).mousemove((e) => {
    mouseX = e.pageX
    mouseY = e.pageY
}).mouseover()
setInterval(tick, mspt)
