import { CTX, MP } from "../platform";
import { getFunctionText } from "../utils";
import { PROFFESSIONS } from "../mechanics/data/professions";

declare const mp: MP;
declare const ctx: CTX;

function setActiveProfession() {
  try {
    if (ctx.value !== ctx.state.activeProfession) {
      ctx.state.activeProfession = ctx.value;
      if (ctx.value) {
        const player = ctx.sp.Game.getPlayer();
        Object.keys(ctx.value.equipment).forEach((item) => {
          const currentItemId = ctx.value.equipment[item];
          const currentItem = ctx.sp.Game.getFormEx(currentItemId);
          ctx.sp.printConsole(currentItem);
          if (!player.isEquipped(currentItemId)) {
            player.equipItem(currentItem, false, false);
          }
        });
      }
      ctx.sp.printConsole(ctx.value);
    }
  } catch (e) {
    ctx.sp.printConsole(e);
  }
}

export const init = () => {
  mp.makeProperty("activeProfession", {
    isVisibleByOwner: true,
    isVisibleByNeighbors: true,
    updateOwner: getFunctionText(setActiveProfession),
    updateNeighbor: "",
  });
};
