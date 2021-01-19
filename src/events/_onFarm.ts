import { CTX, MP } from "../platform";
import { getFunctionText, utils } from "../utility";

declare const mp: MP;
declare const ctx: CTX;

export const init = () => {
  mp.makeEventSource(
    "_onFarm",
    getFunctionText(() => {
      ctx.sp.on("activate", (e: any) => {
        try {
          if (e.source && ctx.sp.Spell.from(e.source)) return;
          const target = ctx.getFormIdInServerFormat(e.target.getFormId());
          ctx.sendEvent({ target });
        } catch (e) {
          ctx.sp.printConsole("Catch _onFarm", e);
        }
      });
    })
  );

  utils.hook("_onFarm", (pcFormId: number, eventData: any) => {
    utils.log(pcFormId);
  });
};
