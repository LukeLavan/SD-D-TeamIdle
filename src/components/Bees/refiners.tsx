/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import './allBees.css';

import { useBetween } from 'use-between';

import { BsPatchPlusFill, BsPatchMinusFill } from 'react-icons/bs';
import CustomBeeHook from './beeHooks';

function Refiners(): JSX.Element {
  const { bees, setBees, refiners, setRefiners } = useBetween(CustomBeeHook);
  const NAME = 'Refiners';

  const gainARefiner = () => {
    if (bees >= 1) {
      setRefiners((previousRefiners) => previousRefiners + 1);
      setBees((previousBees) => previousBees - 1);
    }
  };

  const lossARefiner = () => {
    if (refiners <= 0) {
      return;
    }
    setRefiners((previousRefiners) => previousRefiners - 1);
    setBees((previousBees) => previousBees + 1);
  };

  return (
    <div>
      <table id="RefinersTable">
        <tr>
          <td className="RefinerId">{NAME}</td>
          <td className="RefinerId">{refiners}</td>
          <td className="RefinerId">/MAX</td>
          <td className="RefinerIdButtons">
            <button className="plusButton" onClick={gainARefiner}>
              <BsPatchPlusFill size="2em" style={{ color: '#f0d264' }} />
            </button>
          </td>
          <td className="RefinerIdButtons">
            <button className="minusButton" onClick={lossARefiner}>
              <BsPatchMinusFill size="2em" style={{ color: '#f0d264' }} />
            </button>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default Refiners;
