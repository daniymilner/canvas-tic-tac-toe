(function(){
	canvas.Scene.New({
		name: "MyScene",
		materials: {
			images: {
				logo: "img/logo.gif",
				start: "img/start.png",
				background: "img/background.jpg"
			}
		},
		called: function(stage){
			console.log('called - ', stage);
			var _canvas = this.getCanvas();
			_canvas.setSize(window.innerWidth, window.innerHeight);
		},
		ready: function(stage, params){
			var _canvas = this.getCanvas();

			var entityA = this.createElement();
			entityA.drawImage('logo');
			entityA.x = _canvas.width / 2 - 100;
			entityA.y = 10;
			stage.append(entityA);

			var entityB = this.createElement();
			entityB.drawImage('start');
			entityB.x = _canvas.width / 2 - 90;
			entityB.y = 150;
			stage.append(entityB);

			entityB.on('click', function(e){
				canvas.Scene.call("MyScene2");
			})
		},
		render: function(stage){
			stage.refresh();
		},
		exit: function(stage){
			console.log('exit - ', stage);
		}
	});
})();