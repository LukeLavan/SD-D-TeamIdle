/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { useEffect } from 'react';

import Button from '../../Button/Button';
import { staticConstants } from '../../../constants/constants';

interface Props {
  honeycomb: number;
  setHoneycomb: React.Dispatch<React.SetStateAction<number>>;
  canBuyHoneycomb: boolean;
  setCanBuyHoneycomb: React.Dispatch<React.SetStateAction<boolean>>;
  honey: number;
  setHoney: React.Dispatch<React.SetStateAction<number>>;
}

function Factory(props: Props): JSX.Element {
  const buyHoneycomb = () => {
    if (props.canBuyHoneycomb) {
      props.setHoneycomb((previousHoneycomb) => previousHoneycomb + 1);
      props.setHoney(
        (previousHoney) =>
          previousHoney - staticConstants.HONEY_TO_HONEYCOMB_COST
      );
    }
  };

  // re-evaluate if we can buy honeycomb when relevant vars change
  const calcCanBuyHoneycomb = () => {
    return props.honey >= staticConstants.HONEY_TO_HONEYCOMB_COST;
  };
  useEffect(() => {
    props.setCanBuyHoneycomb(calcCanBuyHoneycomb());
  }, [props.honey]);

  return (
    <div className="Factory">
      honeycombs: {props.honeycomb} <br />
      <Button
        disabled={!props.canBuyHoneycomb}
        onClick={buyHoneycomb}
        color="yellow"
      >
        make some honeycombs!
      </Button>
      cost of honeycombs: {staticConstants.HONEY_TO_HONEYCOMB_COST} honey
    </div>
  );
}

export default Factory;
