export function range(arg1, arg2, arg3, isRight = false) {
  const start = arg2 ? arg1 : 0;
  const end = arg2 || arg1;
  const step = arg3 || Math.sign(end - start);

  const array = [];
  for (
    let i = start;
    step !== 0 ? i !== end : array.length < end - start;
    i += step
  ) {
    if (isRight) {
      array.unshift(i);
    } else {
      array.push(i);
    }
  }
  return array;
}
