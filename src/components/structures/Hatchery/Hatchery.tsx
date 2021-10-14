/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

interface Props {
  bees: number;
  canBuyNextBee: boolean;
  costOfNextBeeHoney: number;
  setCostOfNextBeeHoney: React.Dispatch<React.SetStateAction<number>>;
  costOfNextBeeRoyalJelly: number;
  setCostOfNextBeeRoyalJelly: React.Dispatch<React.SetStateAction<number>>;
  royalJelly: number;
  setRoyalJelly: React.Dispatch<React.SetStateAction<number>>;
  setBees: React.Dispatch<React.SetStateAction<number>>;
  setHoney: React.Dispatch<React.SetStateAction<number>>;
}

import Button from '../../Button/Button';

function Hatchery(props: Props): JSX.Element {
  const buyNextBee = () => {
    if (props.canBuyNextBee) {
      props.setBees((previousBees) => previousBees + 1);
      props.setHoney(
        (previousHoney) => previousHoney - props.costOfNextBeeHoney
      );
      props.setRoyalJelly(
        (previousRoyalJelly) =>
          previousRoyalJelly - props.costOfNextBeeRoyalJelly
      );
    }
  };

  return (
    <div className="Hatchery">
      bees: {props.bees} <br />
      <Button disabled={!props.canBuyNextBee} onClick={buyNextBee}>
        gain a bee!
      </Button>
      cost of next bee: {props.costOfNextBeeHoney} honey,{' '}
      {props.costOfNextBeeRoyalJelly.toFixed(2)} royal jelly
      <br /> <br /> <br />
      royal jelly: {props.royalJelly.toFixed(2)}
    </div>
  );
}

export default Hatchery;
