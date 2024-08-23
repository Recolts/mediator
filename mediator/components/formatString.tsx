export default function formatString(input: string) {
  const firstpart = input.slice(0, 6);
  const lastpart = input.slice(-4);

  const result = firstpart + "..." + lastpart;

  return result;
}
