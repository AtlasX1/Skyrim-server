/**
 * Built-in events
 */
type SystemEventName = "onDeath" | "onInit" | "onReinit";

/**
 * Custom events
 */
type CustomEventName =
<<<<<<< HEAD
  | "_"
  | "_onBash"
  | "_onConsoleCommand"
  | "_onCurrentCellChange"
  | "_onHit"
  | "_onLocalDeath"
  | "_onPowerAttack"
  | "_onActorValueFlushRequiredhealth"
  | "_onActorValueFlushRequiredstamina"
  | "_onActorValueFlushRequiredmagicka"
  | "_onSprintStateChange"
  | "_onHitScale"
  | "_onActivate";
=======
	| '_'
	| '_onBash'
	| '_onConsoleCommand'
	| '_onCurrentCellChange'
	| '_onHit'
	| '_onLocalDeath'
	| '_onPowerAttack'
	| '_onActorValueFlushRequiredhealth'
	| '_onActorValueFlushRequiredstamina'
	| '_onActorValueFlushRequiredmagicka'
	| '_onSprintStateChange'
	| '_onHitScale'
	| '_onInputTest';
>>>>>>> 93596608c9ee5d3408ae2de5a249856a097abb75

export type EventName = SystemEventName | CustomEventName;
