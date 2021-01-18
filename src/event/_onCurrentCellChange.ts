import { CellChangeEvent } from 'types/Events';
import { CTX, MP } from '../platform';
import { getFunctionText, utils } from '../utils';

declare const mp: MP;
declare const ctx: CTX;

function _onCurrentCellChange() {
	ctx.sp.on('update', () => {
		try {
			let result: CellChangeEvent = { hasError: false };
			const currentCell = ctx.sp.Game.getPlayer().getParentCell();
			if (ctx.state.currentCellId !== currentCell.getFormID()) {
				if (ctx.state.currentCellId !== undefined) {
					result.cell = {
						id: currentCell.getFormID(),
						name: currentCell.getName(),
					};
					ctx.sendEvent(result);
				}
				ctx.state.currentCellId = currentCell.getFormID();
			}
		} catch (err) {
			ctx.sendEvent({
				hasError: true,
				err: err.toString(),
			});
		}
	});
}

export const init = () => {
	mp.makeEventSource(
		'_onCurrentCellChange',
		getFunctionText(_onCurrentCellChange)
	);
	utils.hook(
		'_onCurrentCellChange',
		(pcformId: number, event: CellChangeEvent) => {
			if (!event.hasError) {
				utils.log('[_onCurrentCellChange]', pcformId, event.cell);
			}
		}
	);
};