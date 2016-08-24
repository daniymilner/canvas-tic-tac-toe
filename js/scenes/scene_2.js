(function(){
	canvas.Scene.New({
		name: "MyScene2",
		materials: {
			images: {
				again: "img/play_again.png"
			}
		},
		called: function(stage){
			console.log('called - ', stage);
		},
		ready: function(stage){
			var that = this,
				_canvas = this.getCanvas(),
				strokeType = 'x',
				rectangles = {
					rect1: {},
					rect2: {},
					rect3: {},
					rect4: {},
					rect5: {},
					rect6: {},
					rect7: {},
					rect8: {},
					rect9: {}
				},
				isEndGame = false;

			function processEndGame(){
				var lines = {
						1: [1, 2, 3],
						2: [4, 5, 6],
						3: [7, 8, 9],
						4: [1, 4, 7],
						5: [2, 5, 8],
						6: [3, 6, 9],
						7: [1, 5, 9],
						8: [7, 5, 3]
					},
					lineKeys;

				lineKeys = Object.keys(lines);
				for(var i = 0; i < lineKeys.length; i++){
					if(lines[lineKeys[i]].every(function(index){
							return rectangles['rect' + index].filledRect;
						}) && (lines[lineKeys[i]].every(function(index){
							return rectangles['rect' + index].filledRect === 'x';
						}) || lines[lineKeys[i]].every(function(index){
							return rectangles['rect' + index].filledRect === 'o';
						}))){
						drawEndLine(lines[lineKeys[i]]);
						isEndGame = true;
						break;
					}
				}

				if(isEndGame){
					//конец игры
					drawPlayAgainButton();
				}else{
					if(!hasEmptyRect()){
						//ничья
						drawPlayAgainButton();
					}else{
						toggleStrokeType();
					}
				}
			}

			function drawPlayAgainButton(){
				var _canvas = that.getCanvas(),
					button = that.createElement();
				button.drawImage('again', _canvas.width - 180, _canvas.height - 100);
				button.click(function(){
					canvas.Scene.call("MyScene2");
				});
				stage.append(button);
			}

			function drawEndLine(rectKeyList){
				rectKeyList.forEach(function(key){
					var rect = rectangles['rect' + key];
					rect.fillRect('lightgreen', rect.xCoord, rect.yCoord, 100, 100);
					rect.opacity = 0.9;
				});
			}

			function createRect(x, y){
				var item = that.createElement();
				item.xCoord = x;
				item.yCoord = y;
				item.fillRect("#e6e6e6", x, y, 100, 100);
				item.strokeRect("#000000", x, y, 100, 100);
				item.opacity = 0.6;
				item.click(function(){
					if(!isEndGame && !item.clicked){
						item.clicked = true;

						switch(strokeType){
							case 'x':
								drawXStroke(x, y);
								break;
							case 'o':
								drawYStroke(x, y);
								break;
						}
						item.filledRect = strokeType;

						processEndGame();
					}
				});

				return item;
			}

			function toggleStrokeType(){
				strokeType = strokeType === 'x' ? 'o' : 'x';
			}

			function drawYStroke(x, y){
				var stroke = that.createElement();
				stroke.beginPath();
				stroke.lineWidth = 5;
				stroke.arc(x + 50, y + 50, 30, 0, 2 * Math.PI);
				stroke.strokeStyle = "red";
				stroke.stroke();

				stage.append(stroke);
			}

			function drawXStroke(x, y){
				var stroke = that.createElement();
				stroke.beginPath();
				stroke.lineWidth = 5;
				stroke.moveTo(x + 20, y + 20);
				stroke.lineTo(x + 80, y + 80);
				stroke.moveTo(x + 80, y + 20);
				stroke.lineTo(x + 20, y + 80);
				stroke.strokeStyle = "green";
				stroke.stroke();

				stage.append(stroke);
			}

			function hasEmptyRect(){
				return Object.keys(rectangles).some(function(rect){
					return !rectangles[rect].filledRect;
				});
			}

			rectangles.rect1 = createRect(_canvas.width / 2 - 50 - 100, _canvas.height / 2 - 50 - 100);
			rectangles.rect2 = createRect(_canvas.width / 2 - 50, _canvas.height / 2 - 50 - 100);
			rectangles.rect3 = createRect(_canvas.width / 2 - 50 + 100, _canvas.height / 2 - 50 - 100);

			rectangles.rect4 = createRect(_canvas.width / 2 - 50 - 100, _canvas.height / 2 - 50);
			rectangles.rect5 = createRect(_canvas.width / 2 - 50, _canvas.height / 2 - 50);
			rectangles.rect6 = createRect(_canvas.width / 2 - 50 + 100, _canvas.height / 2 - 50);

			rectangles.rect7 = createRect(_canvas.width / 2 - 50 - 100, _canvas.height / 2 - 50 + 100);
			rectangles.rect8 = createRect(_canvas.width / 2 - 50, _canvas.height / 2 - 50 + 100);
			rectangles.rect9 = createRect(_canvas.width / 2 - 50 + 100, _canvas.height / 2 - 50 + 100);

			stage.append(
				rectangles.rect1,
				rectangles.rect2,
				rectangles.rect3,
				rectangles.rect4,
				rectangles.rect5,
				rectangles.rect6,
				rectangles.rect7,
				rectangles.rect8,
				rectangles.rect9
			);
		},
		render: function(stage){
			stage.refresh();
		},
		exit: function(stage){
			console.log('exit - ', stage);
		}
	});
})();