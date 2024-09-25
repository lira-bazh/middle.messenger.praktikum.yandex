import { range } from "./range.js";

export function rangeRight(start, end, step) {
  return range(start, end, step, true);
}
