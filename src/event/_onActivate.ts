import { EVENTS_NAME } from "helper";
import { CTX, MP } from "../platform";
import { consoleOutput } from "../property/consoleOutput";
import { actorValues } from "../sync";
import { getFunctionText, utils } from "../utils/utils";

declare const mp: MP;
declare const ctx: CTX;

export const init = () => {
  mp.makeEventSource(
    "_onActivate",
    getFunctionText(() => {
      ctx.sp.on("activate", (e: any) => {
        try {
          if (e.source && ctx.sp.Spell.from(e.source)) return;
          const target = ctx.getFormIdInServerFormat(e.target.getFormId());
          ctx.sendEvent({ target });
        } catch (e) {
          ctx.sp.printConsole("Catch", e);
        }
      });
    })
  );

  utils.hook("_onActivate", (pcFormId: number, eventData: any) => {
    utils.log(pcFormId, eventData);
  });
};
