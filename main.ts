namespace SpriteKind {
    export const Clue = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (foundPaper) {
        game.showLongText("EVIDENCE: 1) Torn piece of paper \n A strange message is written on it.", DialogLayout.Full)
    } else {
        game.showLongText("EVIDENCE:\n \n No evidence collected yet.", DialogLayout.Full)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Clue, function (poirot, clue) {
    if (controller.A.isPressed()) {
        foundPaper = true
        evidence += 1
        info.setScore(evidence)
        game.showLongText("You found a torn piece of paper with strange marks.", DialogLayout.Bottom)
        clue.destroy()
    }
})
let foundPaper = false
let evidence = 0
evidence = 0
info.setScore(evidence)
let poirot = sprites.create(assets.image`poirot right`, SpriteKind.Player)
poirot.setBounceOnWall(true)
tiles.setCurrentTilemap(tilemap`level`)
scene.cameraFollowSprite(poirot)
let clue = sprites.create(assets.image`clue`, SpriteKind.Clue)
clue.setPosition(80, 60)
// Your current dining-car tilemap
tiles.setCurrentTilemap(tilemap`level2`)
// Keep Poirot still during the cutscene
poirot.vx = 0
poirot.vy = 0
let gameState = "cutscene"
gameState = "game"
game.onUpdate(function () {
    let cutsceneFinished = 0
    // Your normal movement/facing code goes here
    if (cutsceneFinished) {
        controller.moveSprite(poirot, 60, 60)
    }
})
game.onUpdate(function () {
    if (controller.left.isPressed()) {
        poirot.setImage(assets.image`poirot leftright`)
    } else if (controller.right.isPressed()) {
        poirot.setImage(assets.image`poirot right`)
    }
    if (controller.up.isPressed()) {
        poirot.setImage(assets.image`Poirot up`)
    }
    if (controller.down.isPressed()) {
        poirot.setImage(assets.image`Poirot going down`)
    }
})
game.onUpdate(function () {
    // normal player controls
    if (gameState == "game") {
    	
    }
})
