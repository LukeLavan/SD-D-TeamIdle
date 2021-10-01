/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import './Button.css';

interface Props {
  color: string;
  size: string;
  textToDisplay: string;
  clickFunction: () => void;
  disabledFunction?: () => boolean;
}

const setButtonName = (color: string, size: string) => {
  return color + ' ' + size;
};

function Button(props: Props): JSX.Element {
  const b = setButtonName(props.color, props.size);
  return (
    <div className="Button">
      <button
        className={b}
        disabled={props.disabledFunction && props.disabledFunction()}
        onClick={props.clickFunction}
      >
        {props.textToDisplay}
      </button>
    </div>
  );
}

export default Button;
