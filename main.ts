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
 * POIROT
 * 
 * ============================
 */
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
function startCutscene () {
    gameState = "cutscene"
    // Stop Poirot
    poirot.vx = 0
    poirot.vy = 0
    // White placeholder for the cutscene
    scene.setBackgroundColor(1)
    poirot.setFlag(SpriteFlag.Invisible, true)
    clue.setFlag(SpriteFlag.Invisible, true)
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
let Cutscene = 0
let Cut_0 = assets.image`CUT-0`
let Cut_1 = assets.image`CUT-1`
let Cut_2 = assets.image`CUT-2`
let Cut_3 = assets.image`CUT-3`
let Cut_4 = assets.image`CUT-4`
let Cut_5 = assets.image`CUT-5`
let Cut_6 = assets.image`CUT-6`
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
