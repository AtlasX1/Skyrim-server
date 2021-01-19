import { utils } from "../utility";
import { MP } from "../platform";
import { ActivateEvent } from "../types/Events";
import { mines } from "./data/locations/mines";
import { PROFFESSIONS } from "./data/professions";
import { invenotry } from "../types/Inventory";
import type { collectorNames, proffession } from "../data/professions";

export const init = (mp: MP, currentProfessionName: proffession) => {
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
