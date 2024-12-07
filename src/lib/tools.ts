export function debounce(
  func: (...args: any[]) => any,
  duration: number = 1000
) {
  let debounceTimer: any = undefined;

  return (...args: any[]) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func(...args), duration);
  };
}
