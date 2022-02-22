import SlippiGame, { ActionCountsType, FramesType, GameStartType, PlayerType, StatsType } from '@slippi/slippi-js';
import { CHARACTER_ID_MAPPINGS, CHARACTER_IMAGE_FILE_PATH } from '../shared/constants';
import { ShineGame, ShinePlayer, ShinePlayerStats } from '../shared/types';

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
): ShineGame => {
  console.log('parsing input file')
  const gameSettings: GameStartType = slippiGameFile.getSettings();
  const gameFrames: FramesType = slippiGameFile.getFrames();
  const gameStats: StatsType = slippiGameFile.getStats();

  // Conversions
  const players: Array<ShinePlayer> = gameSettings.players.flatMap((el) => convertSlippiPlayerToShinePlayer(el, gameStats));
  return {
    players,
    gameSettings,
    gameFrames,
    gameStats
  }
}

export const convertSlippiPlayerToShinePlayer = (
  slippiPlayer: PlayerType,
  gameStats: StatsType,
): ShinePlayer => {
  const characterId = slippiPlayer.characterId ?? 0;
  const characterColor = slippiPlayer.characterColor ?? 0;
  let characterName = CHARACTER_ID_MAPPINGS.get(characterId);
  if (characterName === undefined) {
    console.log('Encountered invalid character id');
    characterName = 'INVALID_CHARACTER';
  }
  const characterImagePath = `${CHARACTER_IMAGE_FILE_PATH + characterName.replace(' ', '_')}_${characterColor}.png` 
  let defaultPlayerStats = gameStats.actionCounts.filter((el) => el.playerIndex === slippiPlayer.playerIndex).pop();
  defaultPlayerStats = defaultPlayerStats === undefined ? getBaseActionStats(slippiPlayer.playerIndex) : defaultPlayerStats

  return {
    characterName,
    characterImagePath,
    ...slippiPlayer,
    playerBaseStats: getBaseShinePlayerStats(defaultPlayerStats), 
  }
}

export const getBaseShinePlayerStats = (defaultStats: ActionCountsType): ShinePlayerStats => {
  return {
    ...defaultStats,
    techsHit: 0,
    techsMissed: 0,
  }
}

export const getBaseActionStats = (playerIndex: number): ActionCountsType => {
  return {
    playerIndex,
    opponentIndex: 0,
    wavedashCount: 0,
    wavelandCount: 0,
    airDodgeCount: 0,
    dashDanceCount: 0,
    spotDodgeCount: 0,
    ledgegrabCount: 0,
    rollCount: 0,
  } 
} 



export const _testing = {
  parseSlippiReplayFile
}