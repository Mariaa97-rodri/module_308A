// //PART 1: Objects, nested data, method
const adventurer = {
    name: "Robin",
    health: 10,
    inventory: ["sword", "potion","artifact"],

    companion: {
        name: "Leo",
        type: "Cat",
        companion: {
            name: "Frank",
            type: "Flea",
            inventory: ["small hat", "sunglasses"]
        }
    },
    roll(mod = 0) {
        const result = Math.floor(Math.random()* 20) + 1 + mod;
        console.log(`${this.name} rolled a  ${result}.`);
        return result;
    }
};

//Practice loop - log inventory
for (let item of adventurer.inventory) {
    console.log(item);
}
adventurer.roll();

// //PART 2: Character Class 
class Character {
    static MAX_HEALTH = 100;

    constructor(name){
        this.name = name;
        this.health = Character.MAX_HEALTH;
        this.inventory = [];
    }

    roll(mod = 0) {
        const result = Math.floor(Math.random()* 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`);
        return result;
    }
}

//Recreate Robin with the class
//create class
//method added to class
//instances created

const robin = new Character("Robin");
robin.inventory = ["sword","potion","artifact"];

robin.companion = new Character("Leo");
robin.companion.type = "Cat";

robin.companion.companion = new Character("Frank");
robin.companion.companion.type = "Flea";
robin.companion.companion.inventory = ["small hat", "sunglasses"];

robin.roll();
robin.companion.roll();

//PART 3: Adventurer & Companion Classes
class Adventurer extends Character {
    static ROLES = ["Fighter", "Healer", "Wizard"];

    constructor(name,role) {
        if( !Adventurer.ROLES.includes(role)) {
            throw new Error(`invalid role. Choose from: ${Adventurer.ROLES.join(",")}`);
        }
        super(name);
        this.role = role;
        this.inventory.push("bedroll", "50 gold coins");
    }
    scout() {
        console.log(`${this.name} is scouting ahead...`);
        super.roll();
    }
    attack(target) {
        const roll = this.roll();
        if(roll > 10) {
            target.health -= 10;
            console.log(`${this.name} hits ${target.name}!`);
        } else {
            console.log(`${this.name} missed!`);
        }
    }
}

//companion class

class Companion extends Character {
    constructor (name, type) {
        super(name);
        this.type = type;
    }
    assist () {
        console.log(`${this.name} the ${this.type} assists in battle`)
    }
}

//Recreate Robin 
//inheritance
//role validation
//companion class
//custom methods
const robin2 = new Adventurer("Robin", "Fighter");
robin2.companion = new Companion("Leo","Cat");
robin2.companion.companion = new Companion("Frank","Flea");
robin2.companion.companion.inventory = ["small hat", "sunglasses"];

//PART 4: Static Properties
// Character.MAX_HEALTH = 100;
// Adventurer.ROLES = ["Fighter", "Healer", "Wizard"];

//PART 5: Factory Pattern

class AdventurerFactory {
    constructor(role) {
        this.role = role;
        this.adventurers = [];
    }

    generate(name) {
        const newAdventurer = new Adventurer(name, this.role);
        this.adventurers.push(newAdventurer);
        return newAdventurer;
    }

    findByIndex(index) {
        return this.adventurers[index];
    }

    findByName(name) {
        return this.adventurers.find(a => a.name === name);
    }
}

//Using Factory
//factory implemented
//storage array
//search methods
const healers = new AdventurerFactory("Healer");

const robinHealer = healers.generate("Robin");
const lunaHealer = healers.generate("Luna");

console.log(healers.findByName("Robin"));

//PART 6 - Duel Method

Adventurer.prototype.duel = function(opponent) {
    console.log(`⚔️${this.name} vs ${opponent.name}⚔️`);

    while(this.health > 50 && opponent.health > 50) {
        const roll1 = this.roll();
        const roll2 = opponent.roll();

        if(roll1 > roll2) {
            opponent.health -= 1;
            console.log(`${this.name} wins the round!`);
        } else if (roll2 > roll1) {
            this.health -= 1;
            console.log(`${opponent.name} wins the round!`);
        } else {
            console.log("Tie!");
        }
        console.log(`${this.name}: ${this.health} HP`);
        console.log(`${opponent.name}: ${opponent.health} HP`);
        console.log("--------------------");
    }
    const winner = this.health > opponent.health ? this.name : opponent.name;
    console.log(`🏆${winner} wins the duel!`);
};

//Test Duel
//opposing rolls
//health substraction
//loop until 50 HP
//Winner logged
const fighters = new AdventurerFactory("Fighter");

const aragorn = fighters.generate("Aragorn");
const legolas = fighters.generate("Legolas");

aragorn.duel(legolas);

//PART 7: Adventurer Forth

class Dragon extends Character {
    breatheFire(target) {
        console.log(`${this.name} breathes fire on ${target.name}!`)
        target.health -= 20;
    }
}

const smaug = new Dragon ("Smaug");
smaug.breatheFire(aragorn);