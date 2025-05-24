function rollDice(faces) {
    return Math.floor((Math.random()*faces)+1);
}

export function rollD6() {
    return rollDice(6);
}