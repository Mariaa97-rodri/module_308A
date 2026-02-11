//PART 1: Objects, nested data, method
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

//PART 2: Character Class
class character {
    static MAX_HEALTH = 100;

    constructor(name){
        this.name = name;
        this.health = character.MAX_HEALTH;
        this.inventory = [];
    }

    roll(mod = 0) {
        const result = Math.floor(Math.random()* 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`);
        return result;
    }
}

//Recreate Robin with the class

const robin = new character("Robin");
robin.inventory = ["sword","potion","artifact"];

robin.companion = new character("Leo");