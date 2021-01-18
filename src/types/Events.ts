export interface CellChangeEvent {
  hasError: boolean;
  err?: string;
  cell?: any;
}
export interface ActivateEvent {
  target: number;
  caster: number;
  isCrimeToActivate: boolean;
}
