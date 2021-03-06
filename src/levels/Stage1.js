var Stage1 = function() {};

Stage1.prototype = {

    init: function(game, animationManager) {
        this.game = game;
        this.animationManager = animationManager;
        this._levelNumber = 1;

    },

    preload: function() {

        this.game.load.image('circle', 'assets/circleStage1.png');
        this.game.load.image('box', 'assets/boxStage1.png');

    },

    create: function() {

        this.style = {
            font: "30px rubik",
            fill: "#CD044E",
            align: "center"
        };

        this.gratulierenSignal = new Phaser.Signal();
        this.gratulierenSignal.add(this.showWinDialog, this);
        this.alpha = -0.5;

        this.inputCreator = new InputCreator(this.game, this.animationManager);
        this.game.add.tileSprite(0, 0, WC.GAME_W, WC.INPUT_H, 'riddleBackground');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.boxBaseR = this.game.add.sprite(233, 13, 'boxBase'); //basered
        this.boxBaseY = this.game.add.sprite(333, 13, 'boxBase'); //baseyellow     
        this.boxBaseG = this.game.add.sprite(233, 113, 'boxBase'); //basegreen
        this.boxBaseB = this.game.add.sprite(333, 113, 'boxBase'); //baseblue

        this.boxR = this.game.add.sprite(240, 20, 'box');
        this.boxY = this.game.add.sprite(340, 20, 'box');
        this.boxG = this.game.add.sprite(240, 120, 'box');
        this.boxB = this.game.add.sprite(340, 120, 'box');

        this.boxBaseR.tint = '0xCD044E'; //basered
        this.boxBaseY.tint = '0xFFBF0F'; //baseyellow
        this.boxBaseB.tint = '0x0057A9'; //baseblue
        this.boxBaseG.tint = '0x3DA239'; //basegreen

        this.boxR.tint = '0x121211'; //red
        this.boxY.tint = '0x121211'; //yellow
        this.boxG.tint = '0x121211'; //green
        this.boxB.tint = '0x121211'; //blue

        this.inputCreator.boxFactory.getColorSignal().add(this.onColorPicked, this);
        this.playerWins();
        this.gameWon = false;
        Timer.createTimer(this.game, 18);
    },

    update: function() {
        this.inputCreator.updateInputCreator();
        if (!this.gameWon) this.playerWins();
    },

    render: function() {},

    onColorPicked: function(color) {

        switch (color) {

            case BC.RED:
                this.animationManager.increaseAlpha(this.boxR, this.alpha);
                break;
            case BC.GREEN:
                this.animationManager.increaseAlpha(this.boxG, this.alpha);
                break;
            case BC.BLUE:
                this.animationManager.increaseAlpha(this.boxB, this.alpha);
                break;
            case BC.YELLOW:
                this.animationManager.increaseAlpha(this.boxY, this.alpha);
                break;
            default:
                break;

        }
    },

    playerWins: function() {
        if (this.boxR.alpha == 0 && this.boxY.alpha == 0 && this.boxB.alpha == 0 && this.boxG.alpha == 0) {
            this.gameWon = true;
            Timer.stopTimer(this.game);
            this.gratulierenSignal.dispatch();
        }

        LEVEL_DATA[this._levelNumber + 1] = this._levelNumber + 1;
        window.localStorage.setItem('mygame_progress', JSON.stringify(LEVEL_DATA));
    },

    showWinDialog: function() {
        var level = this._levelNumber + 1;
        console.log("llll" + level);
        LevelDialog.nextLevel(this.game, level);
    }
};
