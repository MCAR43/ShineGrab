import SlippiGame, { ActionCountsType, FrameEntryType, FramesType, GameStartType, PlayerType, PostFrameUpdateType, PreFrameUpdateType, StatsType } from '@slippi/slippi-js';
import * as iots from 'io-ts';
// we don't want everything from a SLP game file so we'll define custom types that we can check at runtime

export interface ValidFrame {
    frame: number;
    players: Map<number, PlayerFrame>;
}

export interface PlayerFrame {
    pre: PreFrameUpdateType;
    post: PostFrameUpdateType;
}

export interface ShinePlayerStats extends ActionCountsType {
    techsHit: number;
    techsMissed: number;
}

export interface ShinePlayer extends PlayerType {
    characterName: string;
    characterImagePath: string;

    // We store the anlysis on the  object... for now probably should be redone
    playerBaseStats: ShinePlayerStats;
} 

export interface ShineGame { 
    players: Array<ShinePlayer>;
    gameSettings: GameStartType;
    gameFrames: FramesType;
    gameStats: StatsType
}

export interface ShineAnalysis {
    shinePlayers: Array<ShinePlayer>; // since port can be 0-3 not in sequential we have to map it
    slippiGameStats: StatsType // piggyback off pre-gened slippi stats 


}
/*

// iots ensures runtime correctness for parsing .SLP files
// needs to be done after reciving file and before assignment
// todo after learnign what types we actuall want from SlippiGame
export const SlippiGameDataRawCodec = iots.interface({

});

export const SlippiActionsComputerRawCodec = iots.interface({
    playerPermutations: iots.Array,
});

export const SlippiComboComputerRawCodec = iots.interface({

});

export const SlippiConversionComputerRawCodec = iots.interface({

});

export const SlippiInputComputer = iots.interface({
    
});


export const SlippiPlayerRawCodec = iots.interface({

});

export const SlippiSettingsRawCodec = iots.interface({
    filePath: iots.string,
    source: iots.string,
    isTeams: iots.boolean,
    players: iots.Array,
    scene: iots.number,
    slpVersion: iots.string,
    stageId: iots.string,
});
*/




