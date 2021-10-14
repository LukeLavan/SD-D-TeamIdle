/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Button from '../../Button/Button';

import { staticConstants } from '../../../constants/constants';

interface Props {
  nectar: number;
  setNectar: React.Dispatch<React.SetStateAction<number>>;
  levelDanceFloor: number;
  workersAssignedDanceFloor: number;
  workersAssignedRefinery: number;
}

function DanceFloor(props: Props): JSX.Element {
  const incrementNectarClicked = () => {
    props.setNectar(
      (previousNectar: number) => previousNectar + props.levelDanceFloor
    );
  };

  return (
    <div className="DanceFloor">
      nectar: {props.nectar} <br />
      <Button onClick={incrementNectarClicked} color="yellow">
        buzz buzz buzz
      </Button>
      {props.workersAssignedDanceFloor > 0 ||
      props.workersAssignedRefinery > 0 ? (
        <>
          nectar per second:{' '}
          {props.workersAssignedDanceFloor * staticConstants.NECTAR_BY_BEE -
            props.workersAssignedRefinery *
              staticConstants.NECTAR_TO_HONEY_COST}
        </>
      ) : (
        <br />
      )}
    </div>
  );
}

export default DanceFloor;
