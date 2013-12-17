/* 
basics based on Application of Genetic Programming to the Snake Game by Tobin Ehlis
http://www.gamedev.net/page/resources/_/technical/artificial-intelligence/application-of-genetic-programming-to-the-snake-r1175 
*/

function advancedAiSnake(game,cx,length,color,start,delay) {
    this.delay      =   delay;
    this.lastAction =   (new Date).getTime();

    snake.call(this,game,cx,length,color,start);
}

advancedAiSnake.prototype   =   new snake(this.game,this.renderer,this.snake.length,this.snake.color,this.snake.start);

advancedAiSnake.prototype.constructor   =   advancedAiSnake;

advancedAiSnake.prototype.bindControls  =   function() {
    // no action needed
    return;
}

advancedAiSnake.prototype.gameLogic = function(pie) {
    this.delay=1;
    if(((new Date).getTime()-this.lastAction)   >=  ~~(Math.random()*this.delay)) {
        this.think(pie);
        this.lastAction =   (new Date).getTime();
    } 
    snake.prototype.gameLogic.call(this,pie);
}

advancedAiSnake.prototype.ifFoodAhead = function() {
    var p       =   {x:this.snake.data[0].x,y:this.snake.data[0].y},
        pie = this.game.pie;
    if(this.ifMovingRight() && p.y === pie.y && p.x < pie.x) {
        console.log('right');
        return true;
    } else if(this.ifMovingLeft() && p.y === pie.y && p.x > pie.x) {
        console.log('left');
        return true;
    } else if(this.ifMovingUp() && p.x === pie.x && p.y > pie.y) {
        console.log('up');
        return true;
    } else if(this.ifMovingDown() && p.x === pie.x && p.y < pie.y) {
        console.log('down');
        return true;
    }

    return false;
}

advancedAiSnake.prototype.ifDangerAhead = function() {
    var p       =   {x:this.snake.data[0].x,y:this.snake.data[0].y},
        d = p;
    switch(this.snake.dir) {
        case 'u':   d.y--;
                    break;
        case 'd':   d.y++;
                    break;
        case 'l':   d.x--;
                    break;
        case 'r':   d.x++;
                    break;
    }

    return (p.x > (this.renderer.w/this.renderer.cellSize)-1 || p.x < 0 || p.y > (this.renderer.h/this.renderer.cellSize)-1 || p.y < 0 || this.multiCollisionCheck(d.x,d.y)) ? true:false;
}

advancedAiSnake.prototype.ifDangerRight = function() {
    var p       =   {x:this.snake.data[0].x,y:this.snake.data[0].y},
        d = p;
    switch(this.snake.dir) {
        case 'u':   d.x++;
                    break;
        case 'd':   d.x--;
                    break;
        case 'l':   d.y--;
                    break;
        case 'r':   d.y++;
                    break;
    }

    return (p.x > (this.renderer.w/this.renderer.cellSize)-1 || p.x < 0 || p.y > (this.renderer.h/this.renderer.cellSize)-1 || p.y < 0 || this.multiCollisionCheck(d.x,d.y)) ? true:false;
}

advancedAiSnake.prototype.ifDangerLeft = function() {
    var p       =   {x:this.snake.data[0].x,y:this.snake.data[0].y},
        d = p;
    switch(this.snake.dir) {
        case 'u':   d.x--;
                    break;
        case 'd':   d.x++;
                    break;
        case 'l':   d.y++;
                    break;
        case 'r':   d.y--;
                    break;
    }


    return (p.x > (this.renderer.w/this.renderer.cellSize)-1 || p.x < 0 || p.y > (this.renderer.h/this.renderer.cellSize)-1 || p.y < 0 || this.multiCollisionCheck(d.x,d.y)) ? true:false;
}

advancedAiSnake.prototype.progn2 = function(a,b) {
    a();
    b();
}

advancedAiSnake.prototype.ifDangerTwoAhead = function() {
    var p       =   {x:this.snake.data[0].x,y:this.snake.data[0].y},
        d = p;
    switch(this.snake.dir) {
        case 'u':   d.y-2;
                    break;
        case 'd':   d.y+2;
                    break;
        case 'l':   d.x-2;
                    break;
        case 'r':   d.x+2;
                    break;
    }

    return (p.x > (this.renderer.w/this.renderer.cellSize)-1 || p.x < 0 || p.y > (this.renderer.h/this.renderer.cellSize)-1 || p.y < 0 || this.multiCollisionCheck(d.x,d.y)) ? true:false;
}

advancedAiSnake.prototype.turnLeft = function() {
    switch(this.snake.dir) {
        case 'u':   this.snake.dir = 'l';
                    break;
        case 'd':   this.snake.dir = 'r';
                    break;
        case 'l':   this.snake.dir = 'd';
                    break;
        case 'r':   this.snake.dir = 'u';
                    break;
    }
}

advancedAiSnake.prototype.turnRight = function() {
    switch(this.snake.dir) {
        case 'u':   this.snake.dir = 'r';
                    break;
        case 'd':   this.snake.dir = 'l';
                    break;
        case 'l':   this.snake.dir = 'u';
                    break;
        case 'r':   this.snake.dir = 'd';
                    break;
    }
}

advancedAiSnake.prototype.moveForward = function() {
    return;
}

advancedAiSnake.prototype.ifFoodUp = function() {
    var p       =   {x:this.snake.data[0].x,y:this.snake.data[0].y},
        pie = this.game.pie;
    return (p.y >= pie.y) ? true:false;
}

advancedAiSnake.prototype.ifFoodRight = function() {
    var p       =   {x:this.snake.data[0].x,y:this.snake.data[0].y},
        pie = this.game.pie;
    return (p.x <= pie.x) ? true:false;
}

advancedAiSnake.prototype.ifMovingRight = function() {
    return (this.snake.dir === 'r') ? true:false;
}

advancedAiSnake.prototype.ifMovingLeft = function() {
    return (this.snake.dir === 'l') ? true:false;
}

advancedAiSnake.prototype.ifMovingUp = function() {
    return (this.snake.dir === 'u') ? true:false;
}

advancedAiSnake.prototype.ifMovingDown = function() {
    return (this.snake.dir === 'd') ? true:false;
}

advancedAiSnake.prototype.think = function(pie) {
    var p       =   {x:this.snake.data[0].x,y:this.snake.data[0].y},
        _this   =   this;   

    if(this.ifDangerAhead()) {
        if(!this.ifDangerLeft()) {
            this.turnLeft();
        } else if(!this.ifDangerRight()) {
            this.turnRight();
        }
    } else {
        if(this.ifFoodAhead()) {
            this.moveForward();
        } else {
            if(this.ifFoodUp()) {
                if(this.ifFoodRight()) {
                    if(!this.ifMovingRight()) {
                        if(this.ifMovingDown() && !this.ifDangerLeft()) {
                            this.turnLeft();
                        } else if(this.ifMovingLeft()) {
                            if(!this.ifDangerRight()) {
                                this.turnRight();
                            } else if(!this.ifDangerLeft()) {
                                this.turnLeft();
                            }
                        }
                    }
                } else {
                    if(!this.ifMovingLeft()) {
                        if(this.ifMovingDown() && !this.ifDangerRight()) {
                            this.turnRight();
                        } else if(this.ifMovingRight()) {
                            if(!this.ifDangerLeft()) {
                                this.turnLeft();
                            } else if(!this.ifDangerRight()) {
                                this.turnRight();
                            }
                        }
                    }
                }
            } else {
                if(this.ifFoodRight()) {
                    if(!this.ifMovingRight()) {
                        if(this.ifMovingUp() && !this.ifDangerRight()) {
                            this.turnRight();
                        } else if(this.ifMovingLeft()) {
                            if(!this.ifDangerLeft()) {
                                this.turnLeft();
                            } else if(!this.ifDangerRight()) {
                                this.turnRight();
                            }
                        }
                    }
                } else {
                    if(!this.ifMovingLeft()) {
                        if(this.ifMovingUp() && !this.ifDangerLeft()) {
                            this.turnLeft();
                        } else if(this.ifMovingRight()) {
                            if(!this.ifDangerRight()) {
                                this.turnRight();
                            } else if(!this.ifDangerLeft()) {
                                this.turnLeft();
                            }
                        }
                    }
                }
            }
        }
    }

}
