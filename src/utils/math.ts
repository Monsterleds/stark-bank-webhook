export function generateRandomNumberBetween8and12() {
    return Math.floor(Math.random() * (12 - 8 + 1)) + 8;
}

export function generateRandomValues(numbers: number) {
    return Math.floor(+(Math.random() * 10**numbers).toFixed(2));
  }