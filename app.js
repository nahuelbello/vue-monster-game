function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            specialAttackCounter: 1,
            winner: null,
            battleLog: []
        }
    },
    watch: {
        playerHealth(value) {
            if (value > 0 && this.monsterHealth <= 0) this.winner = 'player';
        },
        monsterHealth(value) {
            if (value > 0 && this.playerHealth <= 0) this.winner = 'monster';
            if (value <= 0 && this.playerHealth <= 0) this.winner = 'draw';
        }
    },
    computed: {
        monsterHealthBar() {
            if (this.monsterHealth <= 0) return { width: '0%' };
            return { width: this.monsterHealth + '%' };
        },
        playerHealthBar() {
            if (this.playerHealth <= 0) return { width: '0%' };
            return { width: this.playerHealth + '%' };
        },
        specialAttackAvailable() {
            return !(this.specialAttackCounter >= 3);
        }
    },
    methods: {
        monsterAttack() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
            this.addLogEntry('Monster', 'attack', attackValue);
            this.specialAttackCounter ++;
        },
        attack() {
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.addLogEntry('Player', 'attack', attackValue);
            this.monsterAttack();
        },
        specialAttack() {
            const attackValue = getRandomValue(10, 25);
            this.specialAttackCounter = 0;
            this.monsterHealth -= attackValue;
            this.addLogEntry('Player', 'special attack', attackValue);
            this.monsterAttack();
        },
        heal() {
            const healValue = getRandomValue(8, 20);
            this.playerHealth + healValue >= 100 ? this.playerHealth = 100 : this.playerHealth += healValue;
            this.addLogEntry('Player', 'heal', healValue);
            this.monsterAttack();
        },
        surrender() {
            this.battleLog.push(`Player has surrender.`);
            this.winner = 'monster';
        },
        addLogEntry(character, action, amount) {
            this.battleLog.push({ character, action, amount });
        },
        resetGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.specialAttackCounter = 1;
            this.winner = null;
            this.battleLog = [];
        }
    }
});

app.mount('#game');
