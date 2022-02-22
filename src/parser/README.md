# ShineGrab
## Description 
This holds all of the backend logic for parsing of SLP files and analysis on gameplay states.  

## Structure
 * src/
    * core/
        * anal/
    * shared/
        * types/

## TODO Ideas:
### Optimal punish comparisons (Super Stretch):
    * Given a state: {
        character,
        enemy%
        frame,
        input,
        stage,
        xpos,
        ypos,
        facing_dir,   
    }
    * we can determine what the absolute optimal punish on a given character -> character
    * compare that to the punish saved in the slippi game settings combo map to show "%lost/opening"

### Missed Angles:
    * With Spacies
    * given a state: {
        character,
        input,
        stage,
        xpos
        ypos,
        facing_dir,
    }
    * we can calculate if a perfectly optimal firefox angle would've reached the stage
    * show # of missed Firefoxes/game

### Stage Hot Zones:
    * given a state: {
        character,
        input,
        stage,
        %,
        xpos,
        ypos,
    }
    * Over the course of a game we can chunk the stage into a grid and map damage player has done in that area
    * to determine stage hotzones for where they are strongest

### 