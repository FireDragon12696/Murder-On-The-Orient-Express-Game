namespace SpriteKind {
    export const Clue = SpriteKind.create()
}
/**
 * ============================
 * 
 * EVIDENCE NOTEBOOK
 * 
 * ============================
 */
/**
 * ============================
 * 
 * START BUTTON
 * 
 * ============================
 */
/**
 * ============================
 * 
 * START CUTSCENE
 * 
 * ============================
 */
/**
 * ============================
 * 
 * FINISH CUTSCENE
 * 
 * ============================
 */
/**
 * ============================
 * 
 * PLAYER FACING + MOVEMENT
 * 
 * ============================
 */
/**
 * ============================
 * 
 * START SCREEN
 * 
 * ============================
 */
/**
 * ============================
 * 
 * EVIDENCE SCORE
 * 
 * ============================
 */
// ============================
// 
// TILEMAP
// 
// ============================
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameState == "game") {
        if (foundPaper) {
            game.showLongText("EVIDENCE: \n \n 1. Torn piece of paper \n A strange message is written on it.", DialogLayout.Full)
        } else {
            game.showLongText("EVIDENCE: \n \n No evidence collected yet.", DialogLayout.Full)
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameState == "start") {
        startCutscene()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Clue, function (player2, clueSprite) {
    if (gameState == "game") {
        if (controller.A.isPressed()) {
            foundPaper = true
            evidence += 1
            info.setScore(evidence)
            game.showLongText("You found a torn piece of paper with strange marks.", DialogLayout.Bottom)
            clueSprite.destroy()
        }
    }
})
/**
 * ============================
 * 
 * CLUE
 * 
 * ============================
 */
function finishCutscene () {
    gameState = "game"
    // Return to the dining carriage
    tiles.setCurrentTilemap(tilemap`level`)
    // Put Poirot somewhere sensible
    tiles.placeOnRandomTile(poirot, assets.tile`floor`)
    // Give control back to player
    controller.moveSprite(poirot, 60, 60)
    // Camera follows Poirot
    scene.cameraFollowSprite(poirot)
    // Restore game screen
    scene.setBackgroundColor(9)
    poirot.setFlag(SpriteFlag.Invisible, false)
    clue.setFlag(SpriteFlag.Invisible, false)
}
/**
 * ============================
 * 
 * CLUE INTERACTION
 * 
 * ============================
 */
/**
 * ============================
 * 
 * GAME STATE
 * 
 * ============================
 */
/**
 * ============================
 * 
 * POIROT
 * 
 * ============================
 */
function startCutscene () {
    gameState = "cutscene"
    // Stop Poirot
    poirot.vx = 0
    poirot.vy = 0
    // White placeholder for the cutscene
    scene.setBackgroundColor(1)
    poirot.setFlag(SpriteFlag.Invisible, true)
    clue.setFlag(SpriteFlag.Invisible, true)
    game.showLongText("CUTSCENE PLACEHOLDER \n \n Your opening animation will go here.", DialogLayout.Center)
    setTimeout(function () {
        finishCutscene()
    }, 3000)
}
let foundPaper = false
let evidence = 0
let clue: Sprite = null
let poirot: Sprite = null
let gameState = ""
gameState = "start"
poirot = sprites.create(assets.image`poirot right`, SpriteKind.Player)
poirot.setBounceOnWall(false)
// Your actual dining-car tilemap
tiles.setCurrentTilemap(tilemap`level2`)
scene.cameraFollowSprite(poirot)
clue = sprites.create(assets.image`clue`, SpriteKind.Clue)
clue.setPosition(80, 60)
info.setScore(evidence)
scene.setBackgroundColor(15)
game.showLongText("MURDER ON THE ORIENT EXPRESS: THE GAME \n \n PRESS A TO START", DialogLayout.Center)
// Stop Poirot while we are on the start screen
poirot.vx = 0
poirot.vy = 0
game.onUpdate(function () {
    if (gameState == "game") {
        if (controller.left.isPressed()) {
            poirot.setImage(assets.image`poirot leftright`)
        } else if (controller.right.isPressed()) {
            poirot.setImage(assets.image`poirot right`)
        } else if (controller.up.isPressed()) {
            poirot.setImage(assets.image`Poirot up`)
        } else if (controller.down.isPressed()) {
            poirot.setImage(assets.image`Poirot going down`)
        }
    } else {
        // Make absolutely sure Poirot cannot move during
        // the start screen or cutscene.
        poirot.vx = 0
        poirot.vy = 0
    }
})
