/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

interface Props {
  i: number;
}

function BroodCell(props: Props): JSX.Element {
  const i = props.i;
  return (
    <div className="BroodCell">
      Hello world {i} and pogfish pogfish oo oo oo
    </div>
  );
}

export default BroodCell;
