controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    control_handler(way_up)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    allow_row2 = !(allow_row2)
    delaySprite.sayText("row 2 is " + ["disabled", "enabled"][+allow_row2], 1000)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (spawn_delay != 4) {
        spawn_delay += 1
    } else {
        spawn_delay = 0
    }
    delaySprite.sayText("new delay: " + spawn_delay_trans[spawn_delay], 1000)
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
function control_handler(way: number) {
    // how did you even...
    if (!(gen_fin) || gameisdone || target == 0) {
        return
    }
    // should practically do nothing but ok
    if (way == goals[current_spot]) {
        //console.log([1, way, goals[current_spot]])
        if (done_fc != -1) {done_fc = 1}
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
        //console.log([0, way, goals[current_spot]])
        done_fc = -1
        scene.setBackgroundColor(2)
        playerSprite.setImage(pos_trans[way])
        goalSprite.setImage(pos_transg[goals[current_spot]])
        pause(100)
        playerSprite.setImage(playerNone)
        goalSprite.setImage(playerNone)
        scene.setBackgroundColor(15)
    }
    if (current_spot >= target) {
        gameisdone = true
    }
}
let chose_spr: Sprite = null
let target = 0
let gen_fin = false
let delaySprite: Sprite = null
let goalSprite: Sprite = null
let playerNone: Image = null
let way_right = 0
let way_down = 0
let way_left = 0
let way_up = 0
let allow_row2 = false
let spawn_delay = 0
let playerSprite: Sprite = null
let choie = null
let current_spot = 0
let gameisdone = false
let goals: any[];
let sprite_in_goals: any[];
let i: number;
let chose: any;
let time_lim: number;
// 0 = 0, 1 = 100, 2 = 150, 3 = 200, 4 = 250
spawn_delay = 1
let spawn_delay_trans = [0, 100, 150, 200, 250]

let True = true // i miss python...
let False = false // i miss python...

let score: number;
let pause_t: number;
let done_fc: number;
let fin_sco

allow_row2 = true
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
let pos_trans: { [key: number]: Image } = {
    1: assets.image`myImage`,
    3: assets.image`myImage2`,
    2: assets.image`myImage0`,
    4: assets.image`myImage1`
}
let pos_transg: { [key: number]: Image } = {
    1: assets.image`goodup`,
    2: assets.image`goodleft`,
    3: assets.image`gooddown`,
    4: assets.image`goodright`
}
playerNone = assets.image`playerNone`
playerSprite = sprites.create(playerNone, SpriteKind.Player)
playerSprite.x -= 15
playerSprite.y += 35
goalSprite = sprites.create(playerNone, SpriteKind.Enemy)
goalSprite.x += 15
goalSprite.y += 35
delaySprite = sprites.create(playerNone, SpriteKind.Player)
delaySprite.x = 110
delaySprite.y = 120
// sdelaySprite.sayText("testing")
while (true) {
    gameisdone = false
    gen_fin = false
    current_spot = 0
    scene.setBackgroundColor(14)
    // gen random number around ~3-16
    if (allow_row2) {
        target = Math.round(Math.random() * 13) + 3
    } else {
        target = Math.round(Math.random() * 5) + 3
    }
    // if (target > 8) { console.logValue("generated", target); target = 8} // eh hack fix
    goals = []
    sprite_in_goals = []
    i = 0
    choie = null
    if (spawn_delay != 0) {
        goalSprite.sayText(target, 20000)
        info.onCountdownEnd(function () { info.showCountdown(false) })
        info.startCountdown((target * spawn_delay_trans[spawn_delay] + 50) / 1000)
    }
    while (i < target) {
        chose = Math.pickRandom(possibles)
        //console.logValue("gen", chose)
        if (spawn_delay != 0) {
            playerSprite.sayText(i + 1)
        }
        goals[i] = chose
        chose_spr = sprites.create(pos_trans[chose], SpriteKind.Projectile)
        sprite_in_goals[i] = chose_spr
        if (i < 8) {
            chose_spr.y = 25
            chose_spr.x = 10 + i * 20
        } else {
            chose_spr.y = 45
            chose_spr.x = 10 + (i - 8) * 20
        }
        if (spawn_delay != 0) {
            pause(spawn_delay_trans[spawn_delay])
        }
        i += 1
    }
    if (spawn_delay != 0) {
        pause(260 * (spawn_delay_trans[spawn_delay] / 100))
    }
    playerSprite.sayText("", 0)
    goalSprite.sayText("", 0)
    time_lim = (target - 3) * 350 + 3000
    if (target > 8) {
        time_lim += (target - 8) * 200
    }
    scene.setBackgroundColor(0)
    gen_fin = true
    done_fc = 0
    info.startCountdown(time_lim / 1000)
    info.onCountdownEnd(function () { gameisdone = true })
    info.showCountdown(true)
    pauseUntil(() => gameisdone)
    score = info.countdown()
    info.showCountdown(false)
    gen_fin = false
    console.logValue("isFC", done_fc)
    if (current_spot == target) {
        scene.setBackgroundColor(7)
        if (done_fc > 0) {
            fin_sco = (score/2)*4
            playerSprite.sayText("2x!", 750)
        } else {
            fin_sco = score
        }
        goalSprite.sayText("+" + Math.floor(fin_sco), 750)
        console.logValue("addedScore", fin_sco)
        info.changeScoreBy(Math.floor(fin_sco))
    } else {
        i = 0
        while (i < target) {
            sprite_in_goals[i].setImage(pos_trans[goals[i]])
            i += 1
        }
        scene.setBackgroundColor(2)
    }
    pause(1000)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
}