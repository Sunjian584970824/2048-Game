/**
 * Created by Administrator on 2017/5/5.
 */
var game = {
    data: [],//二位数据
    cn: 4,//列数
    rn: 4,//行数
    score: 0,//分数
    start: function () {
        // this.data = [
        //     [0, 2, 0, 4],
        //     [4, 0, 2, 0],
        //     [0, 4, 0, 4],
        //     [0, 0, 2, 0]
        // ];
        this.statuStart();//初始化二位数组
        this.updateView();//视图实时更新
        this.scores();//获取最高分数
    },
    scores: function () {
        console.log(document.getElementsByClassName("first")[0])
        if (localStorage.getItem("score")) {
            document.getElementsByClassName("first")[0].innerHTML = localStorage.getItem("score")
        } else {
            localStorage.setItem("score", 0)
            document.getElementsByClassName("first")[0].innerHTML = localStorage.getItem("score")
        }

    },
    statuStart: function () {
        //生成一个初始化的二位数组
        for (var r = 0; r < this.rn; r++) {
            this.data[r] = [];
            for (var c = 0; c < this.cn; c++) {
                this.data[r][c] = 0
            }
        }
        this.randomNum();
        this.randomNum();
    },
    randomNum: function () {//随即生成i个数字2、4
        var row = parseInt(Math.random() * this.rn);
        var col = parseInt(Math.random() * this.cn);
        if (this.data[row][col] == 0) {
            this.data[row][col] = Math.random() < 0.8 ? 2 : 4
        }else{
            for (var r = 0; r < this.rn; r++) {
                for (var c = 0; c < this.cn; c++) {
                    if(this.data[r][c]==0){
                        this.data[r][c]=Math.random() < 0.8 ? 2 : 4
                        return
                    }
                }
            }
        }
    },
    updateView: function () {//将二位数组中的数字更新到前景层中
        for (var r = 0; r < this.cn; r++) {
            for (var l = 0; l < this.rn; l++) {
                var div = document.getElementById("c" + r + l);
                var curr = this.data[r][l]
                div.innerHTML = curr != 0 ? curr : ""
                div.className = curr != 0 ? 'cell n' + curr : "cell"
            }
        }
        document.getElementById("scoe").innerHTML = "当前分数:<span style='color:orangered;font-size: 20px;'> " + this.score + " </span>分"
    },
    ifFull: function () {//判断当前数组是否已满
        for (var r = 0; r < this.rn; r++) {
            for (var c = 0; c < this.cn; c++) {
                if (this.data[r][c] == 0 ) {
                    return false
                }
            }
        }
        return true
    },
    // ifFull: function () {//判断当前数组是否已满
    //     for (var r = 0; r < this.rn; r++) {
    //         for (var c = 0; c < this.cn; c++) {
    //             if (this.data[r][c] == 0) {
    //                 return false
    //             }
    //         }
    //     }
    //     return true
    // },
    getRightNext: function (row, col) {//查找当前位置右侧下一个不为0的数
        for (var i = col + 1; i < this.cn; i++) {
            if (this.data[row][i] != 0) {
                return i
            }
        }
        return -1
    },
    getLeftNext: function (row, col) {//查找当前位置左侧下一个不为0的数
        for (var i = col - 1; i >= 0; i--) {
            if (this.data[row][i] != 0) {
                return i
            }
        }
        return -1
    },
    getDownNext: function (row, col) {//查找当前位置左侧下一个不为0的数
        // console.log("row="+row)
        // console.log("col="+this.rn)
        for (var i = row - 1; i >= 0; i--) {
            if (this.data[i][col] != 0) {
                return i
            }
        }
        return -1
    },
    moveDownInrow: function (col) {//下移
        for (var row = this.rn - 1; row > 0; row--) {
            var nextc = this.getDownNext(row, col);
            // var nextc = this.getUpNext(row, col);
            if (nextc == -1) {
                break
            } else {
                if (this.data[row][col] == 0) {
                    this.data[row][col] = this.data[nextc][col]
                    this.data[nextc][col] = 0;
                    row++;
                }
                else if (this.data[row][col] == this.data[nextc][col]) {
                    this.data[row][col] *= 2;
                    this.data[nextc][col] = 0;
                    this.score += this.data[row][col];
                }
            }

        }
        // this.updateView();

    },
    getUpNext: function (row, col) {//查找当前位置下一个不为0的数
        for (var i = row + 1; i < this.rn; i++) {
            if (this.data[i][col] != 0) {
                return i
            }
        }
        return -1
    },
    moveUpInrow: function (col) {
        for (var row = 0; row < this.rn - 1; row++) {
            var nextc = this.getUpNext(row, col);
            if (nextc == -1) {
                break
            } else {
                if (this.data[row][col] == 0) {
                    this.data[row][col] = this.data[nextc][col]
                    this.data[nextc][col] = 0;
                    row--;
                }
                else if (this.data[row][col] == this.data[nextc][col]) {
                    this.data[row][col] *= 2;
                    this.data[nextc][col] = 0;
                    this.score += this.data[row][col];
                }

            }

        }
        // this.updateView();
    },
    moveLeftInrow: function (row) {//左移
        for (var col = 0; col < this.cn - 1; col++) {
            var nextc = this.getRightNext(row, col);
            if (nextc == -1) {
                break
            } else {
                if (this.data[row][col] == 0) {
                    this.data[row][col] = this.data[row][nextc]
                    this.data[row][nextc] = 0;
                    col--;
                } else if (this.data[row][col] == this.data[row][nextc]) {
                    this.data[row][col] *= 2;
                    this.data[row][nextc] = 0;
                    this.score += this.data[row][col];
                }

            }

        }
    },
    moveRightInrow: function (row) {//右移
        for (var col = this.cn - 1; col >= 0; col--) {
            var nextc = this.getLeftNext(row, col);
            if (nextc === -1) {
                break
            } else {
                if (this.data[row][col] == 0) {
                    this.data[row][col] = this.data[row][nextc]
                    this.data[row][nextc] = 0;
                    col++;
                } else if (this.data[row][col] == this.data[row][nextc]) {
                    this.data[row][col] *= 2;
                    this.data[row][nextc] = 0;
                    this.score += this.data[row][col];
                }

            }

        }
        // this.updateView();


    },
    moveLeft: function () {

        if (this.ifFull()) {
            this.updateView();
            alert("GAME OVER")
            if (localStorage.getItem("score") < this.score) {
                localStorage.setItem("score", this.score)
            }

        } else {
            for (var i = 0; i < this.rn; i++) {
                this.moveLeftInrow(i)
            }
            this.randomNum();
            this.updateView();
        }

    },
    moveRight: function () {
        if (this.ifFull()) {
            this.updateView();
            alert("GAME OVER")
            if (localStorage.getItem("score") < this.score) {
                localStorage.setItem("score", this.score)
            }
            return
        } else {
            for (var i = 0; i < this.rn; i++) {
                this.moveRightInrow(i)
            }
            this.randomNum();
            this.updateView();
        }

    },
    moveUp: function () {

        if (this.ifFull()) {
            this.updateView();
            alert("GAME OVER")
            if (localStorage.getItem("score") < this.score) {
                localStorage.setItem("score", this.score)
            }
        } else {
            for (var i = 0; i < this.rn; i++) {
                this.moveUpInrow(i)
            }
            this.randomNum();
            this.updateView();

        }

    },
    moveDown: function () {
        if (this.ifFull()) {
            this.updateView();
            alert("GAME OVER")
            if (localStorage.getItem("score") < this.score) {
                localStorage.setItem("score", this.score)
            }
        } else {
            for (var i = 0; i < this.rn; i++) {
                this.moveDownInrow(i)
            }
            this.randomNum();
            this.updateView();

        }
    },
}
window.onload = function () {
    game.start();
}
window.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37 :
            game.moveLeft();
            break;
        case 39:
            game.moveRight();
            break;
        case 38:
            game.moveUp();
            break;
        case 40:
            game.moveDown();
            break;
    }
}