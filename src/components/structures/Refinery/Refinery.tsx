/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { useEffect } from 'react';

import Button from '../../Button/Button';

import { staticConstants } from '../../../constants/constants';

interface Props {
  honey: number;
  setHoney: React.Dispatch<React.SetStateAction<number>>;
  nectar: number;
  setNectar: React.Dispatch<React.SetStateAction<number>>;
  canRefineNectar: boolean;
  setCanRefineNectar: React.Dispatch<React.SetStateAction<boolean>>;
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

  // re-evaluate if we can refine nectar to honey when relevant vars change
  const calcCanRefineNectar = () => {
    return props.nectar >= staticConstants.NECTAR_TO_HONEY_COST;
  };
  useEffect(() => {
    props.setCanRefineNectar(calcCanRefineNectar());
  }, [props.honey, props.nectar]);

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
