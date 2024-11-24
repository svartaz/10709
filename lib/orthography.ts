import { replaceEach } from "./common";

const orthography = (s: string) => replaceEach(s, [
  [/k/g, '𐌺'],
  [/t/g, 'τ'],
  [/p/g, 'π'],

  [/c/g, '𐌲'],
  [/d/g, '𐌳'],
  [/b/g, '𐌱'],

  [/h/g, '𐌷'],
  [/x/g, 'ϲ'],
  [/s/g, 'ξ'],
  [/f/g, 'φ'],

  [/j/g, '𐌾'],
  [/z/g, '𐌶'],
  [/v/g, 'ϝ'],

  [/g/g, 'ν'],
  [/n/g, '𐌽'],
  [/m/g, '𐌼'],

  [/l/g, '𐌻'],
  [/r/g, 'ρ'],

  [/i/g, '𐌹'],
  [/y/g, '𐌿'],
  [/u/g, 'ω'],
  [/e/g, '𐌴'],
  [/o/g, 'ο'],
  [/a/g, '𐌰'],
])