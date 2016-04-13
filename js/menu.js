 var initMenu = function() {
            if (!gameStarted) {
            ctx.fillStyle = '#FF8940';
            ctx.fillRect(0, 0, 505, 620);
            gameTitle();
            newGameButton();
            
            if (menuChosen == 0) {
                ctx.drawImage(Resources.get('images/menu-finger.png'), 390, 330, 71, 44);
            }
            if (menuChosen == 1) {
                ctx.drawImage(Resources.get('images/menu-finger.png'), 390, 410, 71, 44);
            }
            document.addEventListener('keyup', function(e) {
            var allowedMenuKeys = {
                13: 'enter',
                38: 'up',
                40: 'down'
                };
            handleMenuInput(allowedMenuKeys[e.keyCode]);
            });
        }
    };
    var gameTitle = function() {
            ctx.drawImage(Resources.get('images/game-title.png'), 17, 50, 470, 190);
            };
    var newGameButton = function(){
            ctx.drawImage(Resources.get('images/menu-button.png'), 140, 310, 241, 71);
            ctx.drawImage(Resources.get('images/menu-button-2.png'), 140, 390, 241, 71);
        };
    
    var handleMenuInput = function(KeyPress) {
            if (!gameOver) {
                    if (KeyPress == 'down' && menuChosen == 0 && gameStarted == false) {
                        menuChosen += 1;
                        initMenu();

                    };
                    if (KeyPress == 'up' && menuChosen == 1 && gameStarted == false) {
                        menuChosen -= 1;
                        initMenu();
                    };

                    if (KeyPress == 'enter' && menuChosen == 0 && gameStarted == false) {
                        gameStarted = true;
                        ctx.fillStyle = 'white';
                        ctx.fillRect(0, 0, 505, 620);
                        main();
                    };
                    if (KeyPress == 'enter' && menuChosen == 1 && gameStarted == false) {
                        ctx.fillStyle = 'white';
                        ctx.fillRect(0, 0, 505, 620);
                        ctx.drawImage(Resources.get('images/rules.png'), 0, 0);
                        setTimeout(function(){gameOver = true;
                        resetCurrentGame();
                        }, 100);
                    };
             }
             else   
                if (gameOver && KeyPress == 'enter' && gameStarted == false) {
                    ctx.fillStyle = 'white';
                    ctx.fillRect(0, 0, 505, 620);
                    initMenu();
                    setTimeout(function(){gameOver = false;
                    resetCurrentGame();
                    }, 000);
                    
                };
    };
