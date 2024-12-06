export function debounce(func: (...args: any[]) => void, duration: number = 1000) {
  let debounceTimer: any = undefined;

  return function debounce() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(func, duration);
  }
}
