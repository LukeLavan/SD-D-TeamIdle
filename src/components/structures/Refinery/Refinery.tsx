/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Button from '../../Button/Button';

import { staticConstants } from '../../../constants/constants';

interface Props {
  honey: number;
  setHoney: React.Dispatch<React.SetStateAction<number>>;
  setNectar: React.Dispatch<React.SetStateAction<number>>;
  canRefineNectar: boolean;
}

function Refinery(props: Props): JSX.Element {
  const incrementHoney = () => {
    props.setHoney((previousHoney) => previousHoney + 1);
  };
  const refineNectar = () => {
    if (props.canRefineNectar) {
      props.setNectar(
        (previousNectar) =>
          previousNectar - staticConstants.NECTAR_TO_HONEY_COST
      );
      incrementHoney();
    }
  };

  return (
    <div className="Refinery">
      honey: {props.honey} <br />
      <Button disabled={!props.canRefineNectar} onClick={refineNectar}>
        refine that nectar!
      </Button>
      cost of honey: {staticConstants.NECTAR_TO_HONEY_COST} nectar <br />
    </div>
  );
}

export default Refinery;
