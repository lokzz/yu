controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    control_handler(way_up)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    control_handler(way_left)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    control_handler(way_right)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    control_handler(way_down)
})
function control_handler (way: number) {
    // how did you even...
    if (!(gen_fin) || current_spot == target) {}
    if (way === goals[current_spot]) { console.log([1, way, goals[current_spot]]) } else { console.log([0, way, goals[current_spot]])}
}
let current_spot = 0
let chose_spr: Sprite = null
let target = 0
let gen_fin = false
let way_right = 0
let way_down = 0
let way_left = 0
let way_up = 0
let choie = null
let goals: any[];
let sprite_in_goals: any[];
let i: number;
let chose: any;
let time_lim: number;
way_up = 1
way_left = 2
way_down = 3
way_right = 4
let possibles = [
way_up,
way_left,
way_down,
way_right
]
let pos_trans: {[key:number]:Image} = {
    1: assets.image`myImage`,
    3: assets.image`myImage2`,
    2: assets.image`myImage0`,
    4: assets.image`myImage1`
}
while (true) {
    scene.setBackgroundColor(15)
    gen_fin = false
    target = Math.round(Math.random() * 7) + 3
    // gen random number around ~3-7
    goals = []
    sprite_in_goals = []
    i = 0
    choie = null
    while (i < target) {
        chose = Math.pickRandom(possibles)
        goals[i] = chose
        chose_spr = sprites.create(pos_trans[chose], SpriteKind.Projectile)
        chose_spr.y = 25
        chose_spr.x = (10 + i * 20)
        sprite_in_goals[i] = chose_spr
        i += 1
    }
    time_lim = (target - 3) * 350 + 1500
    gen_fin = true
    pause(time_lim)
    if (current_spot == target) {
        scene.setBackgroundColor(7)
    } else {
        scene.setBackgroundColor(2)
    }
    pause(1000)

    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
}
