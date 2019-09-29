new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsLaunched: false,
        turns: []
    },
    methods: {
        startGame: function () {
        this.gameIsLaunched = true;    
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.turns = [];    
        },
        attack: function () {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer: true,
                text: "Player hits monster with " + damage
            });
            if (this.checkWin()) {
                return;
            }
            
            this.monsterAttacks();   
        },
        specialAttack: function () {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: "Player hits monster hard with " + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks(); 
        },
        heal: function () {
            if (this.playerHealth <=90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: "Player heals with 10"
            });
            this.monsterAttacks();
        },
        giveUp: function () {
            this.gameIsLaunched = false;
        },
        monsterAttacks: function () {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.checkWin(); 
            this.turns.unshift({
                isPlayer: false,
                text: "Monster hits player with " + damage
            });
        },
        calculateDamage: function (minDamage, maxDamage) {
            return Math.max(Math.floor(Math.random() * maxDamage) + 1, minDamage);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm("You won! Start a New Game?")) {
                    this.startGame();
                } else {
                    this.gameIsLaunched = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm("You lost! Start a New Game?")) {
                    this.startGame();
                } else {
                    this.gameIsLaunched = false;
                }
                return true;
            }
            return false;
        }
    }
});