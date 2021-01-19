import { utils } from "../utility";
import { MP } from "../platform";
import { CellChangeEvent, ActivateEvent } from "../types/Events";
import { mines } from "./dataMechanics/locations/mines";
import { PROFFESSIONS } from "./dataMechanics/professions";
import { invenotry } from "../types/Inventory";
import type { proffession, collectorNames } from "./dataMechanics/professions";

declare const mp: MP;
export const init = () => {
  utils.hook("_onFarm", (pcFormId: number, event: ActivateEvent) => {
    try {
      utils.log("_onFarm", event);
    } catch (e) {}
  });
};
