/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import './ResourceTableRow.css';

interface Props {
  name: string;
  value: number;
  max: number;
  rate: number;
}
function Honey(props: Props): JSX.Element {
  return (
    <div>
      <table id="ResourceTableRow">
        <tbody>
          <tr>
            <td className="resourcetd">{props.name}</td>
            <td id={'num' + props.name} className="resourcetd">
              {/* truncate to hundredths and remove trailing 0s */}
              {(+props.value)
                .toFixed(2)
                .replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1')}
            </td>
            <td className="resourcetd">/{props.max}</td>
            <td className="resourcetd">
              {props.rate > 0 ? '+' : ''}
              {props.rate}/s
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Honey;
