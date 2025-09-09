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
    if (!(gen_fin) || gameisdone || target === 0) {return}
    // should practically do nothing but ok
    if (way == goals[current_spot]) {
        console.log([1, way, goals[current_spot]])
        sprite_in_goals[current_spot].setImage(pos_transg[goals[current_spot]])
        info.changeCountdownBy(0.05)
        playerSprite.setImage(pos_trans[way])
        goalSprite.setImage(pos_transg[goals[current_spot]])
        pause(100)
        playerSprite.setImage(playerNone)
        goalSprite.setImage(playerNone)
        // playerSprite.setImage(pos_trans[way])
        current_spot += 1
    } else {
        console.log([0, way, goals[current_spot]])
        scene.setBackgroundColor(2)
        playerSprite.setImage(pos_trans[way])
        goalSprite.setImage(pos_transg[goals[current_spot]])
        pause(100)
        playerSprite.setImage(playerNone)
        goalSprite.setImage(playerNone)
        scene.setBackgroundColor(15)
    }
    if (current_spot >= target) { gameisdone = true }
}
let chose_spr: Sprite = null
let target = 0
let gen_fin = false
let way_right = 0
let way_down = 0
let way_left = 0
let way_up = 0
let gameisdone = false
let current_spot = 0
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
let pos_transg: {[key:number]:Image} = {
    1: assets.image`goodup`,
    2: assets.image`goodleft`,
    3: assets.image`gooddown`,
    4: assets.image`goodright`
}
let playerNone = assets.image`playerNone`
let playerSprite = sprites.create(playerNone, SpriteKind.Player)
playerSprite.x -= 15
playerSprite.y += 35
let goalSprite = sprites.create(playerNone, SpriteKind.Enemy)
goalSprite.x += 15
goalSprite.y += 35
while (true) {
    gameisdone = false
    gen_fin = false
    current_spot = 0
    scene.setBackgroundColor(15)
    target = Math.round(Math.random() * 13) + 3 // gen random number around ~3-16
    //if (target > 8) { console.logValue("generated", target); target = 8} // eh hack fix
    goals = []
    sprite_in_goals = []
    i = 0
    choie = null
while (i < target) {
    chose = Math.pickRandom(possibles)
    goals[i] = chose
    chose_spr = sprites.create(pos_trans[chose], SpriteKind.Projectile)
    sprite_in_goals[i] = chose_spr
        if (i < 8 ) {
            chose_spr.y = 25
            chose_spr.x = 10 + i * 20
        }
        else {
            chose_spr.y = 45
            chose_spr.x = 10 + (i-8) * 20
        }
        i += 1
    }
    time_lim = (target - 3) * 350 + 3000
    if (target > 8) {time_lim += (target - 8) * 200}
    gen_fin = true
    info.startCountdown(time_lim / 1000)
    // do nothing
    info.onCountdownEnd(function() {gameisdone = true})
    info.showCountdown(true)
    pauseUntil(() => gameisdone)
    //pause(time_lim)
    info.showCountdown(false)
    gen_fin = false
    
    if (current_spot == target) {
        scene.setBackgroundColor(7)
    } else {
        i = 0
        while (i < target){
            sprite_in_goals[i].setImage(pos_trans[goals[i]])
            i += 1
        }
        scene.setBackgroundColor(2)
    }
    pause(1000)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
}
