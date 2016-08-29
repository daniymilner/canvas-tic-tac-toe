var canvas = CE
	.defines("canvas_id")
	.ready(function(){
		canvas.Scene.call("MyScene");
	});

window.addEventListener("orientationchange", function() {
	location.reload();
});