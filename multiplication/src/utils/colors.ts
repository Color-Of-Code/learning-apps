function hex (input: number): string {
  const x = input.toString(16);
  return x.length === 1 ? '0' + x : x;
}

function getValue (input: string, position: number): number {
  return parseInt(input.substring(position, position + 2), 16);
}

function interpolateValue (
  value1: number,
  value2: number,
  ratio: number
): number {
  return Math.ceil(value1 * ratio + value2 * (1 - ratio));
}

export function interpolateColor (
  color1: string,
  color2: string,
  ratio: number
): string {
  const rgb = [0, 2, 4].map(x =>
    interpolateValue(getValue(color1, x), getValue(color2, x), ratio)
  );
  return '#' + rgb.map(hex).join('');
}
