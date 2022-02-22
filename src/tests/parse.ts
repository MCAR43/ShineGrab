import { parseSlippiReplayFile, readSlippiReplayFile, _testing } from "../parser/core/parse";
import * as T from 'chai'
import { gameAnalysis } from "../parser/core/analysis/analysis";
 
describe('Slippi File Parsing Utils', () => {
    it('baseline parsing of file', () => {
       const content = readSlippiReplayFile("src/resources/testfiles/fox_shiek.slp");
       const slippiGame = parseSlippiReplayFile(content); 
       const res = gameAnalysis(slippiGame); 
        console.log
    });
});
