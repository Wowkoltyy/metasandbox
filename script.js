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
        console.log(1)
        let jsquare = $(square)
        jsquare.css({position: 'absolute', top: jsquare.position().top + speed})
        if(jsquare.position().top > $(".end").first().position().top - jsquare.width())return jsquare.removeClass("playing").addClass("stopped")
    })
    if(mouseDown && mouseX < window.innerWidth && mouseY < window.innerHeight){
        $(".gameArea").append($("<div>", {"class": "square playing"}).css({top: mouseY, left: mouseX, position:'absolute'}))
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