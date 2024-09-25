import { range } from "./range.js";

export function rangeRight(start: number, end: number, step: number): number[] {
  return range(start, end, step, true);
}
