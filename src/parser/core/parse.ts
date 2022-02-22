import SlippiGame, { PlayerType } from '@slippi/slippi-js';
import { CHARACTER_ID_MAPPINGS } from '../shared/constants';
import { ShinePlayer } from '../shared/types';

// Parses SLIP files into readable structs for ShineGrabDotTech logic
// TODO:
//  * readSlippiReplayFile
//    - parses replay from file buffer passed through, needs to be buffer since we're planning to read from a post instead of local file system
//    - returns string | Buffer
//  * parseSlippiReplayFile
//    - parses buffer | string into relevant Slippi data types.
// 

/*
 * @params slippiGameFile runtime validated slippi game file
 * @returns ShineGrabGame with relevant information for analysis
 * @todo needs to handle the runtime decoding of SLP files using io-ts here
 * that way we can ensure what we're passing to the parser is 100% expected input
 */
export const readSlippiReplayFile = (
  replayFile: string,
): SlippiGame  => {
  return new SlippiGame(replayFile);
}


/*
 * @params slippiGameFile runtime validated slippi game file
 * @returns ShineGrabGame with relevant information for analysis
 * all SlippiGame types are nullable which is not what we want for being type safe during analysis
 * going to have a lot of conversion methods.
 */
export const parseSlippiReplayFile = (
  slippiGameFile: SlippiGame,
) => {
  const gameSettings = slippiGameFile.getSettings();
  const shinePlayers: Array<ShinePlayer> = gameSettings.players.flatMap((el) => convertSlippiPlayerToShinePlayer(el));
}

export const convertSlippiPlayerToShinePlayer = (
  slippiPlayer: PlayerType,
): ShinePlayer => {
  const characterId = slippiPlayer.characterId ?? 0;
  let characterName = CHARACTER_ID_MAPPINGS.get(characterId);
  if (characterName === undefined) {
    console.log('Encountered invalid character id');
    characterName = 'INVALID_CHARACTER';
  }

  return {
    characterName,
    ...slippiPlayer
  }

}


export const _testing = {
  parseSlippiReplayFile
}