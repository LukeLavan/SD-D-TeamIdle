/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { useBetween } from 'use-between';
import { staticConstants } from '../../constants/constants';

import { Honeycomb, Hexagon } from 'react-honeycomb';

import Architects from '../Bees/architects';
import Bees from '../Bees/bees';
import Foragers from '../Bees/foragers';
import Nurses from '../Bees/nurses';
import Refiners from '../Bees/refiners';
import BroodCell from '../BroodCell/BroodCell';
import CustomBeeHook from '../tools/CustomBeeHook';
import CustomHatcheryHook from '../tools/CustomHatcheryHook';
import CustomResourceHook from '../tools/CustomResourceHook';
import CustomStructureHook from '../tools/CustomStructureHook';

import './Hatchery.css';
import Button from '../Button/Button';

function Hatchery(): JSX.Element {
  const beeData = useBetween(CustomBeeHook);
  const hatcheryData = useBetween(CustomHatcheryHook);
  const resourceData = useBetween(CustomResourceHook);
  const { levelHomes } = useBetween(CustomStructureHook);
  const calcTotalAdults = () => {
    return (
      beeData.bees +
      beeData.idleWorkers +
      beeData.drones +
      beeData.workersAssignedDanceFloor +
      beeData.workersAssignedFactory +
      beeData.workersAssignedHatchery +
      beeData.workersAssignedRefinery
    );
  };
  const ITEMS = ['1', '2', 'BLANK', '3', '4', '5', '6', '7'];
  const renderItem = (item: string): JSX.Element => {
    if (item === 'BLANK') return <>{item}</>;
    const cellNum = parseInt(item);
    return <BroodCell i={cellNum} />;
  };
  return (
    <div>
      <div id="Hatchery_Left">
        <div id="BeeTypeTable">
          <div>
            <Bees />
            <Foragers />
            <Refiners />
            <Architects />
            <Nurses />
          </div>
        </div>
      </div>
      <div id="Hatchery_Right">
        <div style={{ visibility: 'hidden' }}>
          <Button
            onClick={() => {
              return;
            }}
          >
            Buzz Buzz Buzz
          </Button>
        </div>
        <Honeycomb
          columns={3}
          size={100}
          items={ITEMS}
          renderItem={(item) => (
            <Hexagon className={item}>
              <div className="backgroundHex">{renderItem(item)}</div>
            </Hexagon>
          )}
        />
      </div>
    </div>
  );
  // return (
  //   <div>
  //     <table>
  //       <tbody>
  //         <tr>
  //           <td>current royal jelly: </td>
  //           <td>{resourceData.royalJelly.toFixed(2)}</td>
  //         </tr>
  //         <tr>
  //           <td>current drones:</td>
  //           <td>{beeData.drones}</td>
  //         </tr>
  //         <tr>
  //           <td>pupae per drone per second:</td>
  //           <td>{staticConstants.PUPAE_BY_DRONE}</td>
  //         </tr>
  //         <tr>
  //           <td>pupae per second: </td>
  //           <td>{staticConstants.PUPAE_BY_DRONE * beeData.drones}</td>
  //         </tr>
  //         <tr>
  //           <td>current pupae: </td>
  //           <td>{hatcheryData.pupae.toFixed(2)}</td>
  //         </tr>
  //         <tr>
  //           <td>current larvae: </td>
  //           <td>{hatcheryData.larvae}</td>
  //           <td>
  //             <Button
  //               onClick={() => {
  //                 let canTransform = false;
  //                 resourceData.setRoyalJelly((previousRoyalJelly) => {
  //                   const nextRoyalJelly =
  //                     previousRoyalJelly - staticConstants.PUPAE_TO_LARVAE_COST;
  //                   if (nextRoyalJelly < 0) return previousRoyalJelly;
  //                   canTransform = true;
  //                   return nextRoyalJelly;
  //                 });
  //                 if (canTransform) {
  //                   hatcheryData.setPupae((previousPupae) => previousPupae - 1);
  //                   hatcheryData.setLarvae(
  //                     (previousLarvae) => previousLarvae + 1
  //                   );
  //                 }
  //               }}
  //               size="mini"
  //             >
  //               +
  //             </Button>
  //           </td>
  //           <td>
  //             cost: {staticConstants.PUPAE_TO_LARVAE_COST} royal jelly, 1 larva
  //           </td>
  //         </tr>
  //         <tr>
  //           <td>current Homes level: </td>
  //           <td>{levelHomes}</td>
  //           <td>total adults: </td>
  //           <td>{calcTotalAdults()}</td>
  //           <td>room for adults left: </td>
  //           <td>{calcTotalAdults() - levelHomes}</td>
  //         </tr>
  //         <tr>
  //           <td>unassigned adults: </td>
  //           <td>{beeData.bees}</td>
  //           <td>
  //             <Button
  //               onClick={() => {
  //                 if (levelHomes <= calcTotalAdults()) return;
  //                 let canTransform = false;
  //                 resourceData.setRoyalJelly((previousRoyalJelly) => {
  //                   const nextRoyalJelly =
  //                     previousRoyalJelly - staticConstants.LARVAE_TO_BEE_COST;
  //                   if (nextRoyalJelly < 0) return previousRoyalJelly;
  //                   canTransform = true;
  //                   return nextRoyalJelly;
  //                 });
  //                 if (canTransform) {
  //                   hatcheryData.setLarvae(
  //                     (previousLarvae) => previousLarvae - 1
  //                   );
  //                   beeData.setBees((previousBees) => previousBees + 1);
  //                 }
  //               }}
  //               size="mini"
  //             >
  //               +
  //             </Button>
  //           </td>
  //           <td>
  //             cost: {staticConstants.LARVAE_TO_BEE_COST} royal jelly, 1 pupa
  //           </td>
  //         </tr>
  //         <tr>
  //           <td>convert unassigned bee into idle worker:</td>
  //           <td></td>
  //           <td>
  //             <Button
  //               onClick={() => {
  //                 let canTransform = false;
  //                 beeData.setBees((previousBees) => {
  //                   const nextBees = previousBees - 1;
  //                   if (nextBees < 0) return previousBees;
  //                   canTransform = true;
  //                   return nextBees;
  //                 });
  //                 if (canTransform) {
  //                   beeData.setIdleWorkers(
  //                     (previousIdleWorkers) => previousIdleWorkers + 1
  //                   );
  //                 }
  //               }}
  //               size="mini"
  //             >
  //               +
  //             </Button>
  //           </td>
  //           <td>
  //             <Button
  //               onClick={() => {
  //                 let canTransform = false;
  //                 beeData.setIdleWorkers((previousIdleWorkers) => {
  //                   const nextIdleWorkers = previousIdleWorkers - 1;
  //                   if (nextIdleWorkers < 0) return previousIdleWorkers;
  //                   canTransform = true;
  //                   return nextIdleWorkers;
  //                 });
  //                 if (canTransform) {
  //                   beeData.setBees((previousBees) => previousBees + 1);
  //                 }
  //               }}
  //               size="mini"
  //             >
  //               -
  //             </Button>
  //           </td>
  //         </tr>
  //         <tr>
  //           <td>convert unassigned bee into drone:</td>
  //           <td></td>
  //           <td>
  //             <Button
  //               onClick={() => {
  //                 let canTransform = false;
  //                 beeData.setBees((previousBees) => {
  //                   const nextBees = previousBees - 1;
  //                   if (nextBees < 0) return previousBees;
  //                   canTransform = true;
  //                   return nextBees;
  //                 });
  //                 if (canTransform) {
  //                   beeData.setDrones((previousDrones) => previousDrones + 1);
  //                 }
  //               }}
  //               size="mini"
  //             >
  //               +
  //             </Button>
  //           </td>
  //           <td>
  //             <Button
  //               onClick={() => {
  //                 let canTransform = false;
  //                 beeData.setDrones((previousDrones) => {
  //                   const nextDrones = previousDrones - 1;
  //                   if (nextDrones < 0) return previousDrones;
  //                   canTransform = true;
  //                   return nextDrones;
  //                 });
  //                 if (canTransform) {
  //                   beeData.setBees((previousBees) => previousBees + 1);
  //                 }
  //               }}
  //               size="mini"
  //             >
  //               -
  //             </Button>
  //           </td>
  //         </tr>
  //       </tbody>
  //     </table>
  //   </div>
  // );
}

export default Hatchery;
