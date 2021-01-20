import { CTX, MP } from "../platform";
import { Message } from "../platform/skyrimPlatform";
import { getFunctionText } from "../utility";

declare const mp: MP;
declare const ctx: CTX;

function setActiveProfession() {
  try {
    if (ctx.value !== ctx.state.activeProfession) {
      ctx.state.activeProfession = ctx.value;
      if (ctx.value) {
        ctx.sp.Debug.notification(`Ты теперь работяга.`);
        const player = ctx.sp.Game.getPlayer();

        player.unequipAll();
        if (ctx.value.equipment) {
          const equipItems = Object.keys(ctx.value.equipment);

          equipItems.forEach((item) => {
            const currentItem = ctx.sp.Game.getFormEx(
              ctx.value.equipment[item]
            );

            if (!player.isEquipped(currentItem)) {
              player.equipItem(currentItem, false, false);
            }
          });
        }
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
