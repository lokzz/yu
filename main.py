
def on_up_pressed():
    control_handler(way_up)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_left_pressed():
    control_handler(way_left)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_right_pressed():
    control_handler(way_right)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_down_pressed():
    control_handler(way_down)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def control_handler(way: number):
    if not (gen_fin):
        pass
    # how did you even...
    if current_spot == target:
        pass
current_spot = 0
target = 0
gen_fin = False
way_up = 1
way_left = 2
way_down = 3
way_right = 4
possibles = [way_up, way_down, way_left, way_right]
pos_trans = {way_up:"myImage", way_down:"myImage2", way_left:"myImage0", way_right:"myImage1"}
# stop spamming...
while True:
    scene.set_background_color(15)
    gen_fin = False
    target = Math.round(Math.random() * 6) + 3
    # gen random number around ~3-9
    goals = []
    sprite_in_goals = []
    i = 0
    while i < target:
        chose = Math.pick_random(possibles)
        goals[i] = chose
        
        i += 1
    time_lim = (target - 3) * 350 + 1500
    gen_fin = True
    pause(time_lim)
    if current_spot == target:
        scene.set_background_color(7)
    else:
        scene.set_background_color(2)
    pause(1000)