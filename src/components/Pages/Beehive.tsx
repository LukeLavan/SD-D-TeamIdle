/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import './Beehive.css';

import { useBetween } from 'use-between';
import CustomResourceHook from '../tools/CustomResourceHook';

import Honey from '../Resources/Honey/honey';
import Nectar from '../Resources/Nectar/nectar';
import Honeycomb from '../Resources/Honeycomb/honeycomb';
import Royaljelly from '../Resources/Royaljelly/royaljelly';

import Bees from '../Bees/bees';
import Foragers from '../Bees/foragers';
import Refiners from '../Bees/refiners';

import Button from '../Button/Button';
import Structures from '../Structures/structure';
import Architects from '../Bees/architects';
import Nurses from '../Bees/nurses';

import Weather from '../Weather/weather';

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
            <Nectar />
            <Honey />
            <Honeycomb />
            <Royaljelly />
          </div>
        </div>
        <div id="BeeTypeTable">
          <div>
            <Bees />
            <Foragers />
            <Refiners />
            <Architects />
            <Nurses />
          </div>
        </div>
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
        <Structures></Structures>
      </div>
    </div>
  );
}

export default Beehive;
