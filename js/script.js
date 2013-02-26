/*
			 * x, y: posición de la bola.
			 * xBar, yBar: posición x e y barra 1.
			 * xBar2, yBar2: posición x e y barra 2.
			 * dx, dy: velocidad de la bola.
			 * ctx: context de canvas
			 */
			var x, y, dx, dy, ctx, widthBar, heightBar, ballRadius;

			var endGame = true;
			
			function init()
			{
				ctx = document.getElementById('canvas').getContext("2d");
				dx = 2.5;
				dy = 2.5;

				x = 250;
				y = 150;

				widthBar = 20;
				heightBar = 60;

				ballRadius = 10;

				xBar = 0;
				yBar = 150;				

				xBar2 = document.getElementById('canvas').width - widthBar;
				yBar2 = 150;
				return setInterval(draw, 10);
			}

			function draw()
			{
				ctx.clearRect(0, 0, 500, 300);

				if (!endGame)
				{
					drawBall();
					drawBars();
					checkCollissions();
				}
				else
					drawEndGameText();				
			}

			function drawEndGameText()
			{
				ctx.font = '30px sans-serif';
				ctx.textBaseline = 'top';
				ctx.fillText('Start game', 180, 120);

				ctx.font = '15px sans-serif';
				ctx.textBaseline = 'top';
				ctx.fillText('Press enter to start', 195, 160);
			}

			function drawBall()
			{				
				ctx.beginPath();				
				ctx.arc(x, y, ballRadius, 0, Math.PI * 2, true);
				ctx.closePath();			
				ctx.fill();

				if (y + ballRadius >= 300 || y - ballRadius <= 0)
				{
					dy = -dy;
				}


				
				if (y != yBar)
				{
					if ((y < yBar) && (yBar > 0))						
						yBar -= 2;
					else
					{
						if ((yBar + heightBar) < 300)
							yBar += 2;
					}
				}

				x += dx;
				y += dy;
			}

			
			function drawBars()
			{				
				ctx.fillRect(xBar, yBar, widthBar, heightBar);
				ctx.fill();
			
				ctx.fillRect(xBar2, yBar2, widthBar, heightBar);
				ctx.fill();
			}

			
			function checkCollissions()
			{				

				if (x <= widthBar)
				{
					if ((y + ballRadius >= yBar) && (y - ballRadius <= yBar + heightBar))					
						dx = -dx;											
					else						
						endGame = true;
				}

				if (x >= xBar2)
				{
					if ((y + ballRadius >= yBar2) && (y - ballRadius <= yBar2 + heightBar))				
						dx = -dx;										
					else
						endGame = true;
				}
			}

			document.onkeydown = function(event)
			{
				
				var keyCode;

				if (event == null)
				{
					keyCode = window.event.keyCode;
				}
				else
				{
					keyCode = event.keyCode;
				}

				switch (keyCode)
				{
					case 13:
						if (endGame)
						{
							endGame = false;
							x = 250;
							y = 150;
						}
						break;

					// EJERCICIO 2
					case 38:
						if (yBar2 > 0)
							yBar2 -= 8;
						break;

					case 40:
						if ((yBar2 + heightBar)  < 300)
							yBar2 += 8;
					break;

					default:
						break;
				}
			}