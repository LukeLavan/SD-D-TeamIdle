/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import './Button.css';

interface Props {
  color?: string;
  size?: string;
  children: string;
  onClick: () => void;
  disabled?: boolean;
}

const calcButtonClass = (color = 'purple', size = 'medium') => {
  return color + ' ' + size;
};

function Button(props: Props): JSX.Element {
  return (
    <div className="Button">
      <button
        className={calcButtonClass(props.color, props.size)}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </div>
  );
}

export default Button;
