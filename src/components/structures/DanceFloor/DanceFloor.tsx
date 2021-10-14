/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Button from '../../Button/Button';

interface Props {
  nectar: number;
  setNectar: React.Dispatch<React.SetStateAction<number>>;
}

function DanceFloor(props: Props): JSX.Element {
  const incrementNectarClicked = () => {
    props.setNectar((previousNectar: number) => previousNectar + 1);
  };

  return (
    <div className="DanceFloor">
      nectar: {props.nectar} <br />
      <Button onClick={incrementNectarClicked} color="yellow">
        buzz buzz buzz
      </Button>
    </div>
  );
}

export default DanceFloor;
