# bee game

kittens game inspired idle game, but with bees! you're the queen bee in charge of a small hive - guide your bees to becoming the dominant species of the galaxy, mass producing honey by the barrel.

- collect nectar and turn it into honey!
- nurture baby bees into becoming productive workers!
- allocate workers into jobs as you see fit!
- watch the funny numbers go up!

## how to play

- go here: https://lukelavan.github.io/SD-D-TeamIdle/
- buzz buzz buzz to collect nectar
- refiners turn nectar into honey at the refinery
- (un)assign worker bee(s) to(/from) vacant job opportunities
- architects work at the factory to turn honey into honeycomb
- use honeycomb to build and upgrade structures
- the number of available jobs at a structure is equal to the upgrade level of the structure
- construct homes to make room for more bees
- raise new bees from egg to adulthood (to do your bidding)

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
