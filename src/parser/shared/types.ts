import { PlayerType } from '@slippi/slippi-js';
import * as iots from 'io-ts';
// we don't want everything from a SLP game file so we'll define custom types that we can check at runtime

export interface ShinePlayer extends PlayerType {
    characterName: string,
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




