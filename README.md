# bee game
Link to the game: https://lukelavan.github.io/SD-D-TeamIdle/

kittens game inspired idle game, but with bees! you're the queen bee in charge of a small hive - guide your bees to becoming the dominant species of the galaxy, mass producing honey by the barrel.

- collect nectar and turn it into honey!
- nurture baby bees into becoming productive workers!
- allocate workers into jobs as you see fit!
- watch the funny numbers go up!

## how to play

### Nectar collection
As with most idle games, the first thing to do is spam the big fun button. In this game, the button labeled "Buzz Buzz Buzz" will give you your first few units of nectar. This button is can be found on the top right of the Beehive page. You'll notice that your nectar will get automatically converted into honey. This is where the bee specialties come in

### Worker bees and drones
As you get more bee workers, you can assign them to several jobs in your hive to improve nectar collection and refinement. A summary of the bees you have available can be found in the bottom left portion of the Beehive page. You can freely reassign workers to the various specialities, depending on what you're trying to accomplish. The jobs and what they do are as follows:
- Foragers automatically collect nectar
- Refiners convert nectar to honey
- Architects convert honey to honeycombs
- Nurses are required to raise more bees
- Scientists are required to research technology  

Separate from the worker bees are the drones. Their only purpose is to constantly harvest royal jelly. Workers cannot become drones, and drones cannot become workers.

### Structures
The large hexagonal icons on the righthand side of the Beehive page are the structures. These are necessary to improve the capacities of your resources and bees. In order to upgrade a structure, you need a number of honeycombs equal to the cost shown on the structure. The structures and what they improve are as follows:
- The Dance Floor increases the total capacity of foragers
- The Refinery increases the total capacity of refiners
- The Factory increases the total capacity of architects
- The Storage increases the capacities of nectar, honey, honeycombs, and royal jelly
- The Homes increases the number of total bees you can have (Drones and worker bees)
- The Library incrases the total capacity of scientists
- The Hatchery increases the total capacity of nurses

### The Hatchery
This page is where you will raise new bees for the colony. In order to raise a new bee, you first need at least one worker assigned to the nurse job. Once you have a nurse, one of the cells on the righthand side will be filled with an egg. You choose now whether the bee will permanently become a drone or a worker. Workers cost 5 royal jelly to grow. Drones cost nothing. Once you have made your decision, some time will pass before the larva matures into a fully-grown bee. Make sure you have enough homes to support your new bees!

### The Tech Tree
If you have one or more bees assigned to the scientist role, you can begin researching technologies! Technologies cost nothing but time. To begin research, simply click on one of the available options. Note that you must always have at least one active scientist for the research to progress. The more scientists you have, the faster the progress

### Settings
As of now, the only setting is the Reset button. This will Reset *all* of your progress, so be careful!

## how to build

- clone the repo
- `cd` into the repo's root directory
- `yarn` to install dependencies, etc.
- `yarn start` to build and launch

## how to contribute

if you're a contributor:

- clone the repo

if you're not:

- fork the repo
- clone your fork

then:

- run `yarn` in the root folder of the repo (or the equivalent for whatever package manager you use)
- code some cool stuff
  - check the issues tab on this GitHub page for anything needed
  - follow the linting/formatting rules
    - use the `yarn lint` and `yarn prettier-format` scripts
    - use an editor extension to automatically lint and format for automation goodness
    - husky pre-commit hooks should prevent committing code that doesn't adhere to the rules
  - please add unit tests for any new code
    - use the `yarn test` script
    - make sure all old and new tests still pass (husky should also enforce this)
  - follow other coding best practices
- submit a pull request
  - [link relevant issues for automation goodness](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue)
  - be nice during the review process

## license

this repo is licensed under the [Mozilla Public License v2.0](https://www.mozilla.org/en-US/MPL/2.0/) - see [their FAQ](https://www.mozilla.org/en-US/MPL/2.0/FAQ/) for what that means
