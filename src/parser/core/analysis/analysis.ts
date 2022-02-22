import { FrameEntryType, PostFrameUpdateType, PreFrameUpdateType, State } from "@slippi/slippi-js";
import { ppid } from "process";
import { GAME_START_OFFSET } from "../../shared/constants";
import { PlayerFrame, ShineAnalysis, ShineGame, ShinePlayer, ValidFrame } from "../../shared/types";

export const gameAnalysis = (
    shineGame: ShineGame,
): ShineAnalysis => {
    for (let i: number = GAME_START_OFFSET; i < shineGame.gameStats.lastFrame; i++) {
        const frame = shineGame.gameFrames[i]
        const validFrame = checkAndGetValidFrame(shineGame.players, frame);
        if (validFrame === null) {
            continue;
        } else {
            processFrame(validFrame, shineGame.players);
        }
    }
    return {
        shinePlayers: shineGame.players, 
        slippiGameStats: shineGame.gameStats,
    }
} 

const checkAndGetValidFrame = (
    players: Array<ShinePlayer>,
    frame: FrameEntryType,
): ValidFrame | null => {
    const playerMap: Map<number, PlayerFrame> = new Map();
    players.forEach((p, i) => {
        const pre = frame.players[p.playerIndex]?.pre;
        const post = frame.players[p.playerIndex]?.post;
        if (!pre || !post) {
            return null;
        }
        playerMap.set(p.playerIndex, { pre, post })
    });

    return {
        frame: frame.frame,
        players: playerMap,
    }
}

export const processFrame = (
    frame: ValidFrame,
    players: Array<ShinePlayer>,
) => {
    // Analyze frame for each playes
    for (const p of players) {
        const playerFrame = frame.players.get(p.playerIndex)
        if (playerFrame === undefined) {
            continue;
        }

        switch(playerFrame.post.actionStateId) {
            case State.TECH_MISS_DOWN:
            case State.TECH_MISS_UP:
                p.playerBaseStats.techsMissed++; break;
            case State.TECH_START: // we will break before hitting these on missed techs so any techs after this are 100% hit techs
            case State.TECH_END:
                p.playerBaseStats.techsHit++; break;
        }
    }

} 