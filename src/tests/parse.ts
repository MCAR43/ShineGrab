import { parseSlippiReplayFile, readSlippiReplayFile, _testing } from "../parser/core/parse";
import * as T from 'chai'
 
describe('Slippi File Parsing Utils', () => {
    it('Correctly returns data from valid slip file', () => {
       const content = readSlippiReplayFile("src/resources/testfiles/fox_shiek.slp");
       parseSlippiReplayFile(content); 
    });
});
