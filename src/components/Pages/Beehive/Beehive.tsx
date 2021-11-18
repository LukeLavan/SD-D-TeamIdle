/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import './Beehive.css';

import { useBetween } from 'use-between';
import CustomResourceHook from '../../tools/CustomResourceHook';

import Resources from '../../Resources/resources';
import Bees from '../../Bees/bees';
import Structures from '../../Structures/structures';
import Weather from '../../Weather/weather';
import Button from '../../Button/Button';

/**
 * Beehive page
 * @returns component containing Resources, Bees, and Structures
 */
function Beehive(): JSX.Element {
  const { setNectar, maxNectar } = useBetween(CustomResourceHook);

  const incrementNectarClicked = () => {
    setNectar((previousNectar) => {
      const nextNectar = previousNectar + 1;
      if (nextNectar > maxNectar) return previousNectar;
      return nextNectar;
    });
  };

  return (
    <div>
      <div id="Left_Side_Beehive">
        <div id="ResourceTable">
          <div>
            <Resources />
          </div>
        </div>
        <Bees />
      </div>
      <div id="Right_Side_Beehive">
        <div id="Weather">
          <Weather />
        </div>
        <div id="buzzBuzzBuzzButton">
          <Button onClick={incrementNectarClicked} color="yellow">
            Buzz Buzz Buzz
          </Button>
        </div>
        <Structures />
      </div>
    </div>
  );
}

export default Beehive;
