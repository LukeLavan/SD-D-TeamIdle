/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { Honeycomb, Hexagon } from 'react-honeycomb';
import DanceFloor from './DanceFloor';
import Refinery from './Refinery';
import Homes from './Homes';
import Hatchery from './Hatchery';
import Factory from './Factory';
import Library from './Library';
import Storage from './Storage';
import './structures.css';

const ITEMS = [
  'Dance Floor',
  'Refinery',
  'BLANK',
  'Factory',
  'Storage',
  'Homes',
  'Library',
  'Hatchery'
];

function Structures(): JSX.Element {
  const renderItem = (item: string): JSX.Element => {
    switch (item) {
      case 'Dance Floor':
        return <DanceFloor />;
      case 'Refinery':
        return <Refinery />;
      case 'Factory':
        return <Factory />;
      case 'Storage':
        return <Storage />;
      case 'Homes':
        return <Homes />;
      case 'Hatchery':
        return <Hatchery />;
      case 'Library':
        return <Library />;
      default:
        return <>{item}</>;
    }
  };

  return (
    <div className="structures">
      <Honeycomb
        columns={3}
        size={100}
        items={ITEMS}
        renderItem={(item) => (
          <Hexagon className={item}>
            <div className="backgroundHex">{renderItem(item)}</div>
          </Hexagon>
        )}
      />
    </div>
  );
}

export default Structures;
