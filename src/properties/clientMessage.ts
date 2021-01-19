import { CTX, MP } from "../platform";
import { getFunctionText } from "../utility";

declare const mp: MP;
declare const ctx: CTX;

function sendMessage() {
  try {
    if (ctx.value !== ctx.state.message) {
      ctx.state.message = ctx.value;
      if (ctx.value) {
        ctx.sp.Debug.notification(ctx.value);
      }
    }
  } catch (e) {
    ctx.sp.printConsole(e);
  }
}

export const init = () => {
  mp.makeProperty("message", {
    isVisibleByOwner: true,
    isVisibleByNeighbors: false,
    updateOwner: getFunctionText(sendMessage),
    updateNeighbor: "",
  });
};
