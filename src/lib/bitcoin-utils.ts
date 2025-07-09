// Bitcoin difficulty and binary conversion utilities

// This is the compact "nBits" representation of the target used in Bitcoin block headers
const genesisNBits = 0x1d00ffff;

// Converts the compact nBits representation to the full 256-bit target
export function nBitsToTarget(nBits: number): bigint {
  // Extract the exponent (first byte) and the coefficient (last 3 bytes)
  const exponent = (nBits >>> 24) & 0xff;
  const coefficient = nBits & 0x007fffff;

  if (nBits & 0x00800000) {
    throw new Error("Negative targets are not allowed.");
  }

  // Compute the full target as: coefficient * 2^(8*(exponent - 3)) = coefficient << (8 * (exponent - 3))
  const shift = BigInt(8 * (exponent - 3));
  return BigInt(coefficient) << shift;
}

// Get the target from the genesis nBits
const genesisTarget = nBitsToTarget(genesisNBits);

// The original Bitcoin genesis difficulty is 1
export const genesisDifficulty = 1;

// Calculate how many leading zero bits are needed in a hash to satisfy a given difficulty
export function calculateRequiredLeadingBinaryZeroes(difficulty: number): number {
  // Convert difficulty to target using the formula: new_target = genesis_target / difficulty
  if (difficulty <= 0) {
    throw new Error("Difficulty must be greater than 0.");
  }
  
  let target;
  // If difficulty is less than 1, and not an integer, we need to use the formula: new_target = genesis_target * floor(1 / difficulty)
  if (difficulty < 1 && difficulty % 1 !== 0) {
    target = genesisTarget * BigInt(Math.floor(1 / difficulty));
  } else {
    // Truncate the difficulty to an integer since it's insignificant and we need an integer to create a BigInt.
    difficulty = Math.floor(difficulty);
    target = genesisTarget / BigInt(difficulty);
  }
  
  // Convert the target to a binary string
  const binaryString = target.toString(2).padStart(256, "0");
  
  // Count how many leading zeroes are in the binary string
  let leadingZeroCount = 0;
  for (const bit of binaryString) {
    if (bit === "0") {
      leadingZeroCount++;
    } else {
      break;
    }
  }

  return leadingZeroCount;
}

// Calculate the target hash threshold from difficulty
export function calculateTargetFromDifficulty(difficulty: number): bigint {
  if (difficulty <= 0) {
    throw new Error("Difficulty must be greater than 0.");
  }
  
  let target;
  if (difficulty < 1 && difficulty % 1 !== 0) {
    target = genesisTarget * BigInt(Math.floor(1 / difficulty));
  } else {
    difficulty = Math.floor(difficulty);
    target = genesisTarget / BigInt(difficulty);
  }
  
  return target;
}

// Format target as hex string
export function formatTargetAsHex(target: bigint): string {
  return '0x' + target.toString(16).padStart(64, '0');
}

// Calculate difficulty from leading binary zeroes (reverse conversion)
export function calculateDifficultyFromLeadingZeroes(leadingZeroes: number): number {
  if (leadingZeroes < 0 || leadingZeroes >= 256) {
    throw new Error("Leading zeroes must be between 0 and 255.");
  }
  
  // Create a target with the specified number of leading zeroes
  // This creates a number with 1 followed by (255 - leadingZeroes) bits
  const remainingBits = 256 - leadingZeroes;
  let target: bigint;
  
  if (remainingBits === 0) {
    target = BigInt(0);
  } else {
    target = BigInt(1) << BigInt(remainingBits - 1);
  }
  
  // Calculate difficulty = genesis_target / target
  if (target === BigInt(0)) {
    return Infinity;
  }
  
  const difficulty = Number(genesisTarget / target);
  return difficulty;
}

// Unit conversion utilities
export const DIFFICULTY_UNITS = {
  'units': { name: 'Units', multiplier: 1 },
  'K': { name: 'Kilo', multiplier: 1e3 },
  'M': { name: 'Mega', multiplier: 1e6 },
  'G': { name: 'Giga', multiplier: 1e9 },
  'T': { name: 'Tera', multiplier: 1e12 },
  'P': { name: 'Peta', multiplier: 1e15 },
  'E': { name: 'Exa', multiplier: 1e18 },
} as const;

export type DifficultyUnit = keyof typeof DIFFICULTY_UNITS;

export function formatDifficulty(value: number, unit: DifficultyUnit): string {
  const displayValue = value / DIFFICULTY_UNITS[unit].multiplier;
  return displayValue.toFixed(6).replace(/\.?0+$/, '');
}

export function parseDifficulty(displayValue: string, unit: DifficultyUnit): number {
  const numValue = parseFloat(displayValue);
  if (isNaN(numValue)) return 0;
  return numValue * DIFFICULTY_UNITS[unit].multiplier;
}

// Large number formatting utilities
const LARGE_NUMBER_UNITS = [
  { name: 'million', value: 1e6 },
  { name: 'billion', value: 1e9 },
  { name: 'trillion', value: 1e12 },
  { name: 'quadrillion', value: 1e15 },
  { name: 'quintillion', value: 1e18 },
  { name: 'sextillion', value: 1e21 },
  { name: 'septillion', value: 1e24 },
  { name: 'octillion', value: 1e27 },
  { name: 'nonillion', value: 1e30 },
  { name: 'decillion', value: 1e33 },
  { name: 'undecillion', value: 1e36 },
  { name: 'duodecillion', value: 1e39 },
];

export function formatLargeNumber(num: number): string {
  if (num < 1e6) {
    return num.toLocaleString();
  }

  // Find the largest unit that fits
  for (let i = LARGE_NUMBER_UNITS.length - 1; i >= 0; i--) {
    const unit = LARGE_NUMBER_UNITS[i];
    if (num >= unit.value) {
      const value = num / unit.value;
      const formattedValue = value < 10 ? value.toFixed(1) : Math.round(value).toString();
      return `${formattedValue} ${unit.name}`;
    }
  }

  return num.toLocaleString();
}