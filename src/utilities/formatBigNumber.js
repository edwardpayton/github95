export default function formatBigNumber(num) {
  if (num >= 10000) return "9999+";
  return num;
}
