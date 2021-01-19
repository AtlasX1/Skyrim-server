import { utils } from "../utils/utils";
import { MP } from "../platform";
import { CellChangeEvent, ActivateEvent } from "types/Events";
import { mines } from "./data/locations/mines";
import { PROFFESSIONS } from "./data/professions";
import type { proffession, collectorNames } from "./data/professions";
import { invenotry } from "../types/Inventory";
// import { addItem } from "../helper";
declare const mp: MP;

const isMine = (name: string): boolean => {
  const findedMine = mines.find((el) => el.ruName === name);
  return findedMine ? true : false;
};

const addItem = (formId: number, baseId: number, count: number) => {
  if (count <= 0) return;

  const inv = mp.get(formId, "inventory");
  let added = false;
  for (const value of inv) {
    if (Object.keys(value).length == 2 && value.baseId == baseId) {
      value.count += count;
      added = true;
      break;
    }
  }
  if (!added) {
    inv.entries.push({ baseId, count });
  }
  mp.set(formId, "inventory", inv);
};

const deleteItem = (formId: number, baseId: number, count: number): boolean => {
  if (count <= 0) {
    utils.log("Error: deleteItem() - Count <= 0 !");
    return false;
  }
  const inv: invenotry = mp.get(formId, "inventory");
  let newInv: invenotry = { entries: [] };

  const deletedItemIndex = inv.entries.findIndex(
    (item) => item.baseId === baseId
  );
  const newCount = inv.entries[deletedItemIndex].count - count;

  if (deletedItemIndex === -1) {
    utils.log("Error: deleteItem() - Item not found!");
    return false;
  }
  if (newCount < 0) {
    utils.log("Error: deleteItem() - new item count below zero.");
    return false;
  }
  if (newCount === 0) {
    newInv.entries = inv.entries.filter((item) => item.baseId !== baseId);
    mp.set(formId, "inventory", newInv);
    return true;
  }
  if (newCount > 0) {
    newInv.entries = inv.entries;
    newInv.entries[deletedItemIndex].count = newCount;
    mp.set(formId, "inventory", newInv);
    return true;
  }

  return false;
};

const isInInventory = (pcFormId: number, itemId?: number): boolean => {
  if (!itemId) return false;
  let inv: invenotry = mp.get(pcFormId, "inventory");
  return inv.entries.find((el) => el.baseId === itemId) ? true : false;
};

const isEquip = (pcFormId: number, itemId: number): boolean => {
  const inv: invenotry = mp.get(pcFormId, "equipment");
  const item = inv.entries.find((item) => item.baseId === itemId);
  return item?.worn ?? false;
};

const deleteProfessionItems = (
  pcFormId: number,
  name: collectorNames
): boolean => {
  utils.log("deleteProfessionItems");
  const currentProf = PROFFESSIONS[name];
  if (!currentProf) {
    utils.log("Error: deleteProfessionItems() - Cannot find profession:", name);
    return false;
  }
  const actorHave: {
    tool: boolean;
    clothes: boolean;
    boots: boolean;
    helmet: boolean;
    gloves: boolean;
  } = {
    tool: isInInventory(pcFormId, currentProf.tool),
    clothes: isInInventory(pcFormId, currentProf.clothes),
    boots: isInInventory(pcFormId, currentProf.boots),
    helmet: isInInventory(pcFormId, currentProf.helmet),
    gloves: isInInventory(pcFormId, currentProf.gloves),
  };
  const canEndProfession = {
    tool: (actorHave.tool && currentProf.tool) || !currentProf.tool,
    clothes: (actorHave.clothes && currentProf.clothes) || !currentProf.clothes,
    boots: (actorHave.boots && currentProf.boots) || !currentProf.boots,
    helmet: (actorHave.helmet && currentProf.helmet) || !currentProf.helmet,
    gloves: (actorHave.gloves && currentProf.gloves) || !currentProf.gloves,
  };

  if (
    canEndProfession.tool &&
    canEndProfession.clothes &&
    canEndProfession.gloves &&
    canEndProfession.helmet &&
    canEndProfession.boots
  ) {
    if (currentProf.tool) {
      const isDeleted = deleteItem(pcFormId, currentProf.tool, 1);
      if (!isDeleted) {
        utils.log("Error: deleteProfessionItems() - error in deleteItem() ");
      }
    }
    if (currentProf.clothes) {
      const isDeleted = deleteItem(pcFormId, currentProf.clothes, 1);
      if (!isDeleted) {
        utils.log("Error: deleteProfessionItems() - error in deleteItem() ");
      }
    }
    if (currentProf.boots) {
      const isDeleted = deleteItem(pcFormId, currentProf.boots, 1);
      if (!isDeleted) {
        utils.log("Error: deleteProfessionItems() - error in deleteItem() ");
      }
    }
    if (currentProf.helmet) {
      const isDeleted = deleteItem(pcFormId, currentProf.helmet, 1);
      if (!isDeleted) {
        utils.log("Error: deleteProfessionItems() - error in deleteItem() ");
      }
    }
    if (currentProf.gloves) {
      const isDeleted = deleteItem(pcFormId, currentProf.gloves, 1);
      if (!isDeleted) {
        utils.log("Error: deleteProfessionItems() - error in deleteItem() ");
      }
    }
    return true;
  } else {
    utils.log(
      "Error: deleteProfessionItems() - Actor can not end profession! Must be all profession item`s."
    );
    return false;
  }
};
const addProfessionItems = (pcFormId: number, name: collectorNames): void => {
  utils.log("addProfessionItems");
  const currentProf = PROFFESSIONS[name];
  if (!currentProf) {
    utils.log("Error: addProfessionItems() -  Cannot find profession:", name);
    return;
  }
  if (currentProf.tool) addItem(pcFormId, currentProf.tool, 1);
  if (currentProf.clothes) addItem(pcFormId, currentProf.clothes, 1);
  if (currentProf.boots) addItem(pcFormId, currentProf.boots, 1);
  if (currentProf.helmet) addItem(pcFormId, currentProf.helmet, 1);
  if (currentProf.gloves) addItem(pcFormId, currentProf.gloves, 1);
};

const currentProfessionName = "miner";

export const init = () => {
  utils.hook("_onActivate", (pcFormId: number, event: ActivateEvent) => {
    try {
      utils.log("_onCurrentCellChange :::::::::::::>", event);
      if (event.target === 293316) {
        const activeProfession = mp.get(pcFormId, "activeProfession");
        const professionMiner = PROFFESSIONS[currentProfessionName];
        //Проверка сосдали ли мы профессию шахтер
        if (professionMiner) {
          if (!activeProfession) {
            mp.set(pcFormId, "activeProfession", {
              name: currentProfessionName,
              equipment: professionMiner,
            });
            addProfessionItems(pcFormId, "miner");
          } else {
            if (activeProfession.name === currentProfessionName) {
              const isDeleted = deleteProfessionItems(pcFormId, "miner");
              if (!isDeleted) {
                utils.log(
                  "Error: deleteProfessionItems() - error in deleteItem() "
                );
              } else {
                mp.set(pcFormId, "activeProfession", null);
              }
            }
          }
        }
      }
    } catch (err) {
      utils.log(err);
    }
  });
};
