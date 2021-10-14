/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import './allBees.css';

import { useBetween } from 'use-between';

import { BsPatchPlusFill, BsPatchMinusFill } from 'react-icons/bs';
import CustomBeeHook from './beeHooks';

function Foragers(): JSX.Element {
  const { bees, setBees, foragers, setForagers } = useBetween(CustomBeeHook);
  const NAME = 'Foragers';

  const gainAForager = () => {
    if (bees >= 1) {
      setForagers((previousForagers) => previousForagers + 1);
      setBees((previousBees) => previousBees - 1);
    }
  };

  const lossAForager = () => {
    if (foragers <= 0) {
      return;
    }
    setForagers((previousForagers) => previousForagers - 1);
    setBees((previousBees) => previousBees + 1);
  };

  return (
    <div>
      <table id="ForagersTable">
        <tr>
          <td className="ForagerId">{NAME}</td>
          <td className="ForagerId">{foragers}</td>
          <td className="ForagerId">/MAX</td>
          <td className="ForagerIdButtons">
            <button className="plusButton" onClick={gainAForager}>
              <BsPatchPlusFill className="ButtonIcon" size="3em" />
            </button>
          </td>
          <td className="ForagerIdButtons">
            <button className="minusButton" onClick={lossAForager}>
              <BsPatchMinusFill className="ButtonIcon" size="3em" />
            </button>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default Foragers;
