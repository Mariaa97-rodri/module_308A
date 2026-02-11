// //PART 1: Objects, nested data, method
const adventurer = {
    name: "Robin",
    health: 10,
    inventory: ["sword", "potion","artifact"],

    companion: {
        name: "leo",
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