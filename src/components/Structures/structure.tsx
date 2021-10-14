/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { Honeycomb, Hexagon } from 'react-honeycomb';
import './structures.css';

const ITEMS = [
  'Dance Floor',
  'Library',
  'BLANK',
  'Wax Factory',
  'Honey Homes',
  'Storage Cells',
  'Refinery',
  'Other'
];

function Structures(): JSX.Element {
  return (
    <div>
      <Honeycomb
        columns={3}
        size={110}
        items={ITEMS}
        renderItem={(item) => (
          <Hexagon className={item}>
            <div className="imageText">{item}</div>
            <div className="imageTextAmount">0</div>
            <div className="backgroundHex"></div>
          </Hexagon>
        )}
      />
    </div>
  );
}

export default Structures;
