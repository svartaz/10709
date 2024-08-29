import { replaceAll } from "@/lib/sundry";

export interface Entry {
  signifier: string,
  date: string,
  signified: string,
  etym: string,
  compound?: boolean,
};

export const orth = (s: string): string => replaceAll(s, true ? [] : [
  [/g/g, 'ң'],
  [/ṅ/g, 'њ'],
  [/n/g, 'н'],
  [/m/g, 'м'],

  [/c/g, 'г'],
  [/d/g, 'д'],
  [/b/g, 'б'],

  [/q/g, 'к'],
  [/k/g, 'ч'],
  [/t/g, 'т'],
  [/p/g, 'п'],

  [/h/g, 'х'],
  [/x/g, 'ш'],
  [/s/g, 'с'],
  [/f/g, 'ф'],

  [/j/g, 'ж'],
  [/z/g, 'з'],
  [/v/g, 'в'],

  [/j/g, 'й'],
  [/r/g, 'р'],
  [/l/g, 'л'],
  [/w/g, 'ў'],

  [/a/g, 'а'],
  [/i/g, 'и'],
  [/y/g, 'ѵ'],
  [/u/g, 'у'],

  [/ǝ/g, 'ъ'],
  [/e/g, 'є'],
  [/ø/g, 'ꙕ'],
  [/o/g, 'о'],
]);

export const literal = (s: string): string => replaceAll(s, [
  [/[GCQHKXJNDTSRLMBPFV]/g, it => it.toLowerCase() + 'a'],
  [/Z/g, 'su'],

  [/I/g, 'zi'],
  [/E/g, 'ze'],
  [/A/g, 'za'],
  [/O/g, 'zo'],
  [/U/g, 'zu'],

  [/Y/g, 'ju'],
  [/W/g, 'vi'],
])

const dayPersonalCreate =
  (new Date('2023-12-17').getTime() - new Date('1995-07-25').getTime()) / 1000 / 60 / 60 / 24;

const componentsAutonym = [...dayPersonalCreate.toString(12)].map(it => ({
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  A: 'ten',
  B: 'eleven',
})[it]);

const from = (replacements) => (etym: string) => ({
  signifier: replaceAll(decodeURIComponent(etym), [
    // extract from URL
    [/^.+\//, ''],
    [/#.+$/, ''],

    ...replacements,

    [/(?<!^)z/g, 's'],
    [/(?<=[ieaou].*)[ieaou]$/g, ''],
    [/n(?=[cqx])/g, 'g'],
  ]),
  etym,
});

const fromGem = from([
  // remove suffix
  [/ōr$|[iau]z$|i?janą$|[ōa]ną$|j?ą$|(ō|ô|ǭ)$|ā$/, ''],

  // simplify vowel
  [/[eao]i/g, 'e'],
  [/[eao]u/g, 'o'],
  [/ī/g, 'i'],
  [/ē/g, 'e'],
  [/ā/g, 'a'],
  [/ō/g, 'o'],
  [/ū/g, 'u'],

  // simple substitution
  [/(.)\1/, '$1'],
  [/k/g, 'q'],
  [/þ/g, 'd'],
  [/g/g, 'c'],
  [/nc/g, 'g'],
  [/w/g, 'v'],
  [/sq/g, 'x'],

  // sound change
  //[/(?<=[ieaou])h(?=[^ieaou])/g, ''],
  [/^h(?=[gnmrlv])/g, ''],
  //[/(?<=[^ieaou])v$/g, ''],
  [/ts$/g, 't'],
  [/sk$/g, 'x'],
  [/mn(?![ieaou])/g, 'm'],
  [/(?<=[ieaou])ndr/g, 'dr'],

  // phonotactics
  [/(?<=[ieaou])u/g, 'v'],
  [/(?<![ieaou])j$/g, ''],
]);

const fromIne = from([
  [/-$/g, ''],

  [/e|ē/g, 'e'],
  [/o|ō/g, 'o'],

  [/y/g, 'j'],
  [/w/g, 'v'],

  [/kʷ|k/g, 'q'],
  [/ḱ/g, 'k'],

  [/gʷ/g, 'g'],
  [/ǵ/g, 'c'],

  [/gʰ|gʷʰ/g, 'h'],
  [/ǵʰ/g, 'x'],
  [/dʰ/g, 's'],
  [/bʰ/g, 'f'],

  [/bʰ/g, 'f'],

  [/(?<![ieaou])h₁|h₂|h₃(?![ieaou])/g, ''],
  [/h₁|h₂|h₃/g, 'a'],
]);


const fromLat = from([
  // remove suffix
  [/((ā|ē|e|ī)re|ā|i?ō|e|ū|iē)$/, ''],

  // simplify vowel
  [/ī/g, 'i'],
  [/ē/g, 'e'],
  [/ā/g, 'a'],
  [/ō/g, 'o'],
  [/ū/g, 'u'],

  [/ae/g, 'e'],
  [/au/g, 'o'],
  [/ei/g, 'i'],
  [/ev/g, 'u'],
  [/oe/g, 'e'],

  // simple substitution
  [/c|k/g, 'q'],
  [/g/g, 'c'],

  //palatalise
  [/q(?=[ie])/g, 'k'],
  [/c(?=[ie])/g, 'j'],
]);

const dict = new Map<string, any>(Object.entries({
  Autonym: { date: '2024-02-17', signified: 'verb/the-language', signifier: componentsAutonym, etym: '' },

  Period: { date: '2024-02-13', signified: 'other/(period)', signifier: 'lo', etym: 'https://en.wiktionary.org/wiki/%E5%9B%89#Etymology_2' },

  not: { date: '2024-02-13', signified: 'logic/not', signifier: 'ne', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ne' },
  and: { date: '2024-02-13', signified: 'logic/and', signifier: 'e', etym: 'https://en.wiktionary.org/wiki/et#Latin' },
  or: { date: '2024-02-13', signified: 'logic/or', signifier: 'o', etym: 'https://en.wiktionary.org/wiki/aut#Latin' },
  iff: { date: '2024-02-13', signified: 'logic/iff', signifier: 'a', etym: '' },

  begin: { date: '2024-02-13', signified: 'preverb/aspect/inchoative', signifier: 'ci', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ginnan%C4%85' },
  keep: { date: '2024-02-13', signified: 'preverb/aspect/progressive', signifier: 'li', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/l%C4%ABban%C4%85' },
  end: { date: '2024-02-13', signified: 'preverb/aspect/perfective', signifier: 'ha', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ga-' },

  did: { date: '2024-02-13', signified: 'preverb/tense/past', signifier: 'fu', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/furai' },
  now: { date: '2024-02-13', signified: 'preverb/tense/present', signifier: 'nu', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/d%C5%8Dn%C4%85' },
  shall: { date: '2024-02-13', signified: 'preverb/tense/future', signifier: 'xu', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skulan%C4%85' },

  would: { date: '2024-02-13', signified: 'preverb/mood/irrealis', signifier: 'me', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/magan%C4%85' },

  done: { date: '2024-02-13', signified: 'preverb/accusative', signifier: 'ra', etym: '' },
  doneTo: { date: '2024-02-13', signified: 'preverb/dative', signifier: 're', etym: '' },

  so: { date: '2024-02-13', signified: 'preverb/non-restrictive', signifier: 're', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/%C3%BEus' },

  Acc: { date: '2024-02-13', signified: 'postverb/accusative', signifier: '-a', etym: '' },
  Dat: { date: '2024-02-13', signified: 'postverb/to', signifier: '-o', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C5%8D' },
  Adv: { date: '2024-02-13', signified: 'postverb/adverb', signifier: '-i', etym: '' },

  Name: { date: '2024-02-13', signified: 'nameToVerb/is-called-$', signifier: 'na', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nam%C3%B4' },

  // clause
  what: { date: '2024-02-13', signified: 'other/clause/relative', signifier: 've', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hwat' },
  that: { date: '2024-02-13', signified: 'other/clause/statement', signifier: 'de', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEat' },
  whether: { date: '2024-07-28', signified: 'other/clause/truth', signifier: 'je', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ja' },

  // pronoun
  i: { date: '2024-02-13', signified: 'verb/pronoun/i', signifier: 'ma', etym: 'https://en.wiktionary.org/wiki/me#Latin' },
  thou: { date: '2024-02-13', signified: 'verb/pronoun/thou', signifier: 'ta', etym: 'https://en.wiktionary.org/wiki/te#Latin' },
  he: { date: '2024-02-13', signified: 'verb/pronoun/he', signifier: 'la', etym: 'https://en.wiktionary.org/wiki/le#Old_French' },
  self: { date: '2024-02-13', signified: 'verb/pronoun/self', signifier: 'sa', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/se-' },
  who: { date: '2024-02-13', signified: 'verb/pronoun/who', signifier: 'va', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hwaz' },

  // base numeral
  zero: { date: '2024-02-13', signified: 'numeral/0', signifier: 'zif', etym: 'https://en.wiktionary.org/wiki/%D8%B5%D9%81%D8%B1#Arabic' },
  one: { date: '2024-02-13', signified: 'numeral/1', signifier: 'ven', etym: 'https://en.wiktionary.org/wiki/vienas#Lithuanian' },
  two: { date: '2024-02-13', signified: 'numeral/2', signifier: 'dov', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Hellenic/d%C3%BAw%C5%8D' },
  three: { date: '2024-02-13', signified: 'numeral/3', signifier: 'ter', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/tr%C3%A9yes' },
  four: { date: '2024-02-13', signified: 'numeral/4', signifier: 'qet', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/k%CA%B7etw%C3%B3res' },
  five: { date: '2024-02-13', signified: 'numeral/5', signifier: 'pen', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/p%C3%A9nk%CA%B7e' },
  six: { date: '2024-02-13', signified: 'numeral/6', signifier: 'xax', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/%C5%A1w%C3%A1%C4%87%C5%A1' },
  seven: { date: '2024-02-13', signified: 'numeral/7', signifier: 'sep', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/sept%E1%B8%BF%CC%A5' },
  eight: { date: '2024-02-13', signified: 'numeral/8', signifier: 'hax', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/Ha%C5%A1t%C4%81%CC%81' },
  nine: { date: '2024-02-13', signified: 'numeral/9', signifier: 'non', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/h%E2%82%81n%C3%A9wn%CC%A5' },
  ten: { date: '2024-02-13', signified: 'numeral/10', signifier: 'req', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/d%C3%A9%E1%B8%B1m%CC%A5' },
  eleven: { date: '2024-02-13', signified: 'numeral/11', signifier: 'lif', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ainalif' },

  howMany: { date: '2024-02-13', signified: 'numeral/how-many', signifier: 'vo', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hw%C5%8D' },

  atLeast: { date: '2024-02-13', signified: 'numeral/less-than', signifier: 'mer', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/maiz%C3%B4' },
  each: { date: '2024-02-13', signified: 'numeral/each, every, all, max', signifier: 'pan', etym: 'https://en.wiktionary.org/wiki/%CF%80%E1%BE%B6%CF%82#Ancient_Greek' },

  many: { date: '2024-02-13', signified: 'numeral/subjective/many', signifier: 'miq', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mikilaz' },
  few: { date: '2024-02-13', signified: 'numeral/subjective/few', signifier: 'fav', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fawaz' },

  // arithmetic
  // 2 + 3 - 3 = 2
  // 2 * 3 / 3 = 2
  // 2 _ (2 ^ 3) = 3 -- log 2 (2 ^ 3) = 3
  // (2 ^ 3) √ 3 = 2 -- root 3 (2 ^ 3) = 2
  Add: { date: '2024-02-13', signified: 'numeral/arithmetic/plus', signifier: 'pul', etym: 'https://en.wiktionary.org/wiki/plus#Latin' },
  Mul: { date: '2024-02-13', signified: 'numeral/arithmetic/times', signifier: 'mul', etym: 'https://en.wiktionary.org/wiki/multiplicare#Latin' },
  Sub: { date: '2024-02-13', signified: 'numeral/arithmetic/minus', signifier: 'min', etym: 'https://en.wiktionary.org/wiki/minor#Latin' },
  Div: { date: '2024-02-13', signified: 'numeral/arithmetic/divide', signifier: 'div', etym: 'https://en.wiktionary.org/wiki/dividere#Latin' },
  Mod: { date: '2024-08-24', signified: 'numeral/arithmetic/modulo', signifier: 'mod', etym: 'https://en.wiktionary.org/wiki/modulo#Latin' },
  Exp: { date: '2024-08-24', signified: 'numeral/arithmetic/exponential', signifier: 'pot', etym: 'https://en.wiktionary.org/wiki/potere#Latin' },
  Log: { date: '2024-08-24', signified: 'numeral/arithmetic/log', signifier: 'loc', etym: 'https://en.wiktionary.org/wiki/logarithmo#Latin' },
  Root: { date: '2024-08-24', signified: 'numeral/arithmetic/root', signifier: 'rad', etym: 'https://en.wiktionary.org/wiki/radice#Latin' },

  Card: { date: '2024-08-02', signified: 'number-to-verb/cardinal', signifier: 'fe', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/felu' },
  th: { date: '2024-08-02', signified: 'number-to-verb/ordinal', signifier: 'do', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-i%C3%BE%C5%8D' },

  back: { date: '2024-06-14', signified: 'verb/reverse-of A', signifier: 'baq', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bak%C4%85' },
  counter: { date: '2024-06-14', signified: 'verb/dual-of A', signifier: 'qom', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/%E1%B8%B1%C3%B3m' },

  // basic verb
  exist: { date: '2024-02-13', signified: 'verb/exist', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/beun%C4%85') },
  happen: { date: '2024-08-23', signified: 'verb/happen, occur', signifier: ['begin', 'exist'] },
  let: { date: '2024-02-13', signified: 'verb/cause A(result, effect), let', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/l%C4%93tan%C4%85') },
  make: { date: '2024-08-02', signified: 'verb/make A', signifier: ['let', 'exist'] }, // https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skapjan%C4%85
  break: { date: '2024-06-14', signified: 'verb/break A', signifier: ['back', 'make'] },
  have: { date: '2024-08-19', signified: 'verb/have A, own, include', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/habjan%C4%85') },
  get: { date: '2024-08-23', signified: 'verb/get A, take, acquire', signifier: ['begin', 'have'] },
  lose: { date: '2024-08-23', signified: 'verb/lose A', signifier: ['end', 'have'] },
  remove: { date: '2024-08-24', signified: 'verb/remove D from A', signifier: ['let', 'end', 'have'] },
  give: { date: '2024-02-13', signified: 'verb/give A(gift) D(receiver)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/geban%C4%85') },

  from: { date: '2024-08-26', signified: 'verb/is-from A(source, origin)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/kwallj%C4%81') },
  to: { date: '2024-08-26', signified: 'verb/is-to A(sink, destination)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/til%C4%85') },
  at: { date: '2024-08-26', signified: 'verb/is-at (position, location, place)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stadiz') },
  in: { date: '2024-08-19', signified: 'verb/is-in A(range, area)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sleutan%C4%85') },
  on: { date: '2024-08-26', signified: 'verb/is-on A(surface, border)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ligjan%C4%85') },

  member: { date: '2024-08-06', signified: 'verb/is-member-of A(group, collection, set)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kruppaz') },
  part: { date: '2024-08-06', signified: 'verb/is-part-of A(whole)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dailiz') },
  complex: { date: '2024-08-25', signified: 'verb/is-complex', signifier: ['done', 'part', 'many'] },
  simple: { date: '2024-08-25', signified: 'verb/is-simple, just', signifier: ['done', 'part', 'few'] },

  // physics
  world: { date: '2024-02-13', signified: 'verb/world, universe', signifier: 'velt', etym: 'https://en.wiktionary.org/wiki/Welt' },
  space: { date: '2024-02-13', signified: 'verb/space', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C5%ABm%C4%85') },
  time: { date: '2024-02-13', signified: 'verb/time', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%ABdiz') },
  thing: { date: '2024-02-13', signified: 'verb/thing', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEing%C4%85') },
  wave: { date: '2024-08-19', signified: 'verb/wave', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C4%93gaz') },
  light: { date: '2024-02-13', signified: 'verb/light', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/leuht%C4%85') },
  sound: { date: '2024-08-19', signified: 'verb/sound', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/klingan%C4%85') },
  turn: { date: '2024-08-19', signified: 'verb/turn around A(pivot, center), rotate', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/spinnan%C4%85') },
  spin: { date: '2024-08-19', signified: 'verb/spin', signifier: ['self', 'turn'] },

  // physical attribute
  big: { date: '2024-02-13', signified: 'verb/big, great', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/grautaz') },
  long: { date: '2024-02-13', signified: 'verb/long, big in 1 dimension', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/langaz') },
  thick: { date: '2024-02-13', signified: 'verb/thick', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEekuz') },
  sharp: { date: '2024-07-28', signified: 'verb/sharp', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skarpaz') },
  heavy: { date: '2024-07-14', signified: 'verb/heavy', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sw%C4%93raz') },
  dense: { date: '2024-07-15', signified: 'verb/dense, heavy-per-volume', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEinhtaz') },
  swift: { date: '2024-06-18', signified: 'verb/swift, fast, quick', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/snellaz') },
  rough: { date: '2024-08-24', signified: 'verb/rough', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C5%ABhaz') },
  far: { date: '2024-08-08', signified: 'verb/far from A, remote', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ferrai') },
  near: { date: '2024-08-08', signified: 'verb/near A, close', signifier: ['few', 'far'] },
  touch: { date: '2024-08-08', signified: 'verb/touch A, contact', signifier: ['zero', 'far'] },

  // position
  below: { date: '2024-02-13', signified: 'verb/position/below A(above)', signifier: 'nid', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ni%C3%BEan%C4%93' },
  hind: { date: '2024-02-13', signified: 'verb/position/behind A(front)', signifier: 'hind', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hinder' },
  left: { date: '2024-02-13', signified: 'verb/position/left-of A(right)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rehtaz') },

  // direction
  east: { date: '2024-08-24', signified: 'verb/direction/is-east-of A(west)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/austraz') },
  north: { date: '2024-08-24', signified: 'verb/direction/is-north-of A(south)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nur%C3%BEraz') },

  // state of matters
  solid: { date: '2024-02-13', signified: 'verb/state-of-matter/solid', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/st%C4%ABfaz') },
  liquid: { date: '2024-02-13', signified: 'verb/state-of-matter/liquid', ...fromLat('līquēre'), etym: 'https://en.wiktionary.org/wiki/liquere#Latin' },
  gas: { date: '2024-02-13', signified: 'verb/state-of-matter/gas', signifier: 'cas', etym: 'https://en.wiktionary.org/wiki/gas#Dutch' },
  plasm: { date: '2024-07-15', signified: 'verb/state-of-matter/plasm', signifier: 'plasm', etym: 'https://en.wiktionary.org/wiki/%CF%80%CE%BB%CE%AC%CF%83%CE%BC%CE%B1#Ancient_Greek' },

  // matter
  water: { date: '2024-02-13', signified: 'verb/matter/water', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wat%C5%8Dr') },
  salt: { date: '2024-02-13', signified: 'verb/matter/salt', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/salt%C4%85') },
  stone: { date: '2024-08-19', signified: 'verb/matter/stone', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stainaz') },

  // colour
  colour: { date: '2024-02-13', signified: 'verb/colour/have-colour-of A(coloured)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/farwaz') },
  red: { date: '2024-02-13', signified: 'verb/colour/hue/red', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/reudan%C4%85') },
  orange: { date: '2024-02-13', signified: 'verb/colour/hue/orange', signifier: 'narag', etym: 'https://en.wiktionary.org/wiki/%D9%86%D8%A7%D8%B1%D9%86%DA%AF#Persian' },
  yellow: { date: '2024-02-13', signified: 'verb/colour/hue/yellow', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gelwaz') },
  green: { date: '2024-02-13', signified: 'verb/colour/hue/green', signifier: 'cron', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gr%C5%8Dniz' },
  blue: { date: '2024-02-13', signified: 'verb/colour/hue/blue', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C4%93waz') },
  purple: { date: '2024-02-13', signified: 'verb/colour/hue/purple', signifier: 'porfur', etym: 'https://en.wiktionary.org/wiki/%CF%80%CE%BF%CF%81%CF%86%CF%8D%CF%81%CE%B1#Ancient_Greek' },
  vivid: { date: '2024-08-19', signified: 'verb/colour/saturation/is-vivid', ...fromGem('blīwą') },
  gray: { date: '2024-08-19', signified: 'verb/colour/saturation/gray', signifier: ['zero', 'vivid'] },
  white: { date: '2024-02-13', signified: 'verb/colour/brightness/white', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hw%C4%ABtaz') },
  black: { date: '2024-04-26', signified: 'verb/colour/brightness/black', signifier: ['zero', 'white'] },

  // light
  bright: { date: '2024-08-19', signified: 'verb/is-bright, light', signifier: ['done', 'from', 'light'] },
  dark: { date: '2024-08-19', signified: 'verb/is-dark', signifier: ['zero', 'bright'] },

  // celestial
  sun: { date: '2024-02-13', signified: 'verb/celestial/sun', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sunn%C7%AD') },
  earth: { date: '2024-02-13', signified: 'verb/celestial/earth', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/er%C3%BE%C5%8D') },
  moon: { date: '2024-02-13', signified: 'verb/celestial/moon', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/m%C4%93n%C3%B4') },

  // time in planet
  //day: { date: '2024-08-19', signified: 'verb/celestial/day', signifier: ['earth', 'spin', 'time'] },
  day: { date: '2024-08-19', signified: 'verb/celestial/day', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dagaz') },
  night: { date: '2024-08-19', signified: 'verb/celestial/night', signifier: ['zero', 'sun', 'time'] }, //etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sunn%C7%AD'
  daytime: { date: '2024-08-19', signified: 'verb/celestial/daytime', signifier: ['sun', 'time'] }, // etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sunn%C7%AD'

  // terrain
  land: { date: '2024-02-13', signified: 'verb/terrain/land', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/land%C4%85') },
  sea: { date: '2024-02-13', signified: 'verb/terrain/sea', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mari') },
  mountain: { date: '2024-02-13', signified: 'verb/terrain/mountain', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bergaz') },
  river: { date: '2024-02-13', signified: 'verb/terrain/river', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fleutan%C4%85') },
  sky: { date: '2024-08-19', signified: 'verb/terrain/sky', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/himinaz') },

  // weather
  cloud: { date: '2024-08-19', signified: 'verb/weather/cloud', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skiwj%C4%85') },
  fog: { date: '2024-08-19', signified: 'verb/weather/fog', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mihstaz') },
  rain: { date: '2024-08-19', signified: 'verb/weather/rain', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/regn%C4%85') },
  snow: { date: '2024-08-19', signified: 'verb/weather/snow', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/snaiwaz') },
  hail: { date: '2024-08-19', signified: 'verb/weather/hail', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haglaz') },
  thunder: { date: '2024-08-19', signified: 'verb/weather/thunder', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEunraz') },

  // feel
  feel: { date: '2024-02-13', signified: 'verb/feel A(stimulus)', signifier: 'fol', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/f%C5%8Dlijan' },
  hear: { date: '2024-02-13', signified: 'verb/feel/hear A(sound)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hauzijan%C4%85') },
  //hear_: { date: '2024-02-13', signified: 'verb/feel/hear A(sound)', signifier: ['sound', 'feel'] },
  see: { date: '2024-02-13', signified: 'verb/feel/see A(sight)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sehwan%C4%85') },
  //see_: { date: '2024-02-13', signified: 'verb/feel/see A(sight)', signifier: ['light', 'feel'] },
  smell: { date: '2024-02-13', signified: 'verb/feel/smell A', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/reukan%C4%85') },
  taste: { date: '2024-02-13', signified: 'verb/feel/taste A', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/smakkuz') },
  tactile: { date: '2024-02-13', signified: 'verb/feel/feel-touch-of A', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tukk%C5%8Dn%C4%85') },

  differ: { date: '2024-02-13', signified: 'verb/differ A', ...fromLat('vārō'), etym: 'https://en.wiktionary.org/wiki/varus#Latin' },
  similar: { date: '2024-08-27', signified: 'verb/is-similar-to A, resemble', signifier: ['few', 'differ'] },
  same: { date: '2024-08-27', signified: 'verb/is-same-as A, equal, identical', signifier: ['zero', 'differ'] },
  simulate: { date: '2024-08-27', signified: 'verb/simulate A, imitate, fake', signifier: ['let', 'similar'] },
  examine: { date: '2024-07-26', signified: 'verb/check A, examine, inspect', ...fromLat('specere'), etym: 'https://en.wiktionary.org/wiki/specio#Latin' },
  compare: { date: '2024-07-26', signified: 'verb/compare A', signifier: ['differ', 'examine'] },

  // modal
  may: { date: '2024-02-13', signified: 'verb/modal/may be', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/magan%C4%85') },
  must: { date: '2024-02-13', signified: 'verb/modal/must be', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skulan%C4%85') },

  // life
  live: { date: '2024-02-13', signified: 'verb/live', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/libjan%C4%85') },
  die: { date: '2024-08-24', signified: 'verb/die', signifier: ['end', 'live'] },
  kill: { date: '2024-08-24', signified: 'verb/kill A(alive)', signifier: ['let', 'die'] },
  wake: { date: '2024-02-13', signified: 'verb/wake', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wakan%C4%85') },
  sleep: { date: '2024-04-26', signified: 'verb/sleep', signifier: ['begin', 'zero', 'wake'] },

  // go
  go: { date: '2024-02-13', signified: 'verb/go to A(destination), come to, move to', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kweman%C4%85') },
  walk: { date: '2024-06-18', signified: 'verb/go/walk on A(ground)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/walkan%C4%85') },
  run: { date: '2024-06-18', signified: 'verb/go/run on A(ground)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rinnan%C4%85') },
  leap: { date: '2024-07-28', signified: 'verb/go/jump over A, leap, skip, hop', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlaupan%C4%85') },
  fly: { date: '2024-07-28', signified: 'verb/go/fly in A(air)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fleugan%C4%85') },
  swim: { date: '2024-08-19', signified: 'verb/go/swim in A(water)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swimman%C4%85') },

  // physiological
  eat: { date: '2024-02-13', signified: 'verb/physiological/eat A(food)', signifier: 'iat', etym: 'https://en.wiktionary.org/wiki/mando#Latin:_chew' },
  bite: { date: '2024-08-24', signified: 'verb/physiological/eat/bite A(food)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/b%C4%ABtan%C4%85') },
  chew: { date: '2024-08-24', signified: 'verb/physiological/eat/chew A(food)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kewwan%C4%85') },
  swallow: { date: '2024-08-24', signified: 'verb/physiological/eat/swallow A(food)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swelgan%C4%85') },
  vomit: { date: '2024-06-14', signified: 'verb/physiological/vomit A(excreta)', signifier: ['back', 'eat'] },
  shit: { date: '2024-06-14', signified: 'verb/physiological/shit A(excreta)', signifier: ['counter', 'eat'] },
  digest: { date: '2024-02-13', signified: 'verb/physiological/digest A(food)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/meltan%C4%85') },
  fuck: { date: '2024-02-13', signified: 'verb/physiological/fuck A', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fukk%C5%8Dn%C4%85#Etymology_2') },
  sick: { date: '2024-02-13', signified: 'verb/physiological/sick', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/seukaz') },
  healthy: { date: '2024-08-24', signified: 'verb/physiological/sick', signifier: ['zero', 'sick'] },

  // emotion
  happy: { date: '2024-08-02', signified: 'verb/be-happy-with A', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/frawaz') },
  amaze: { date: '2024-08-02', signified: 'verb/be-amazed-by A', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wundr%C4%85') },
  trust: { date: '2024-08-02', signified: 'verb/trust A', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tr%C5%ABw%C4%81n%C4%85') },
  fear: { date: '2024-08-02', signified: 'verb/fear A', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/furhtaz') },
  love: { date: '2024-02-13', signified: 'verb/love A, like', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lub%C5%8D') },
  wonder: { date: '2024-08-24', signified: 'verb/wonder A, curious', signifier: ['will', 'know'] },

  // facial
  laugh: { date: '2024-02-13', signified: 'verb/facial-expression/laugh', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlahjan%C4%85') },
  smile: { date: '2024-02-13', signified: 'verb/facial-expression/smile', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sm%C4%ABlijan%C4%85') },
  frown: { date: '2024-02-13', signified: 'verb/facial-expression/frown', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skelhaz') },
  weep: { date: '2024-02-13', signified: 'verb/facial-expression/weep A(tear)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C5%8Dpijan%C4%85') },
  yell: { date: '2024-06-14', signified: 'verb/yell A(voice), cry, shout', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stun%C5%8Dn%C4%85') },

  // mental
  know: { date: '2024-02-13', signified: 'verb/mental/know A', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lizan%C4%85') },
  learn: { date: '2024-08-01', signified: 'verb/mental/learn A', signifier: ['begin', 'know'] },
  forget: { date: '2024-08-01', signified: 'verb/mental/forget A', signifier: ['end', 'know'] },
  think: { date: '2024-02-13', signified: 'verb/mental/think A(idea)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEankijan%C4%85') },
  will: { date: '2024-02-13', signified: 'verb/want A(event)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wiljan%C4%85') },

  // communicate
  name: { date: '2024-07-28', signified: 'verb/communicate/mean A, signify, name', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nam%C3%B4') },
  speak: { date: '2024-06-14', signified: 'verb/communicate/speak A(language, protocol)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sprekan%C4%85') },
  say: { date: '2024-06-14', signified: 'verb/communicate/say A(idea) D(expression)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sagjan%C4%85') },
  understand: { date: '2024-06-14', signified: 'verb/communicate/understand A(idea) D(expression)', signifier: ['counter', 'say'] },
  write: { date: '2024-06-14', signified: 'verb/communicate/write A(idea) D(expression)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wr%C4%ABtan%C4%85') },
  read: { date: '2024-06-14', signified: 'verb/communicate/read A(idea) D(expression)', signifier: ['counter', 'write'] },
  ask: { date: '2024-07-28', signified: 'verb/communicate/ask D A(sentence), question', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fr%C4%93g%C5%8D') },
  answer: { date: '2024-07-28', signified: 'verb/communicate/answer D(questioner) A(question)', signifier: ['counter', 'ask'] },

  // performative
  greet: { date: '2024-02-13', signified: 'verb/performative/greet A(person)', ...fromLat('salūte'), etym: 'https://en.wiktionary.org/wiki/salute#Latin' },
  forgive: { date: '2024-02-13', signified: 'verb/performative/forgive A(event)', ...fromLat('dōnāre'), etym: 'https://en.wiktionary.org/wiki/donare#Latin' },
  thank: { date: '2024-02-13', signified: 'verb/performative/thank A(event)', ...fromLat('grātō'), etym: 'https://en.wiktionary.org/wiki/grato#Latin' },
  promise: { date: '2024-08-19', signified: 'verb/performative/promise A(event), guarantee, vow', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haitan%C4%85') },

  // culture
  sing: { date: '2024-02-13', signified: 'verb/culture/sing A(music, song), play', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/singwan%C4%85') },
  dance: { date: '2024-02-13', signified: 'verb/culture/dance A(choreography)', signifier: 'dans', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/%C3%BEans%C5%8Dn' },

  // biochemistry
  rot: { date: '2024-02-13', signified: 'verb/rot', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rut%C4%81n%C4%85') },
  fresh: { date: '2024-07-24', signified: 'verb/fresh', signifier: ['zero', 'rot'] },

  // reproduction
  beget: { date: '2024-08-19', signified: 'verb/bear A(child), parent', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fad%C4%93r') },
  man: { date: '2024-08-19', signified: 'verb/man, male', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gum%C3%B4') },
  woman: { date: '2024-08-19', signified: 'verb/woman, female', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C4%ABb%C4%85') },
  //egg: { date: '2024-08-24', signified: 'verb/egg', ...fromGem('') },

  // animal
  mammal: { date: '2024-02-13', signified: 'verb/life/animal/mammal', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/s%C5%ABgan%C4%85') },
  human: { date: '2024-02-13', signified: 'verb/life/animal/mammal/human', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Italic/hem%C5%8D') },
  rat: { date: '2024-02-13', signified: 'verb/life/animal/mammal/rat, mouse', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rattaz') },
  hare: { date: '2024-02-13', signified: 'verb/life/animal/mammal/hare, rabbit', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/has%C3%B4') },
  cat: { date: '2024-02-13', signified: 'verb/life/animal/mammal/cat', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kattuz') },
  fox: { date: '2024-02-13', signified: 'verb/life/animal/mammal/fox', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fuhsaz') },
  dog: { date: '2024-02-13', signified: 'verb/life/animal/mammal/dog', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hundaz') },
  wolf: { date: '2024-02-13', signified: 'verb/life/animal/mammal/wolf', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wulfaz') },
  bear: { date: '2024-02-13', signified: 'verb/life/animal/mammal/bear', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ber%C3%B4') },
  sheep: { date: '2024-02-13', signified: 'verb/life/animal/mammal/sheep', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sk%C4%93p%C4%85') },
  goat: { date: '2024-02-13', signified: 'verb/life/animal/mammal/goat', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gaits') },
  deer: { date: '2024-02-13', signified: 'verb/life/animal/mammal/deer', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/raih%C3%B4') },
  horse: { date: '2024-02-13', signified: 'verb/life/animal/mammal/horse', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hruss%C4%85') },
  cow: { date: '2024-02-13', signified: 'verb/life/animal/mammal/cow', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/k%C5%ABz') },
  pig: { date: '2024-02-13', signified: 'verb/life/animal/mammal/pig', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sw%C4%ABn%C4%85') },
  reptile: { date: '2024-02-13', signified: 'verb/life/animal/reptile', signifier: 'reptil', etym: 'https://en.wiktionary.org/wiki/reptile#Latin' },
  snake: { date: '2024-07-15', signified: 'verb/life/animal/reptile/snake', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/snak%C5%8D') },
  bird: { date: '2024-02-13', signified: 'verb/life/animal/bird', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fuglaz') },
  crow: { date: '2024-07-15', signified: 'verb/life/animal/bird/crow, raven', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hrabnaz') },
  fish: { date: '2024-02-13', signified: 'verb/life/animal/fish', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fiskaz') },
  amphibia: { date: '2024-02-13', signified: 'verb/life/animal/amphibia', signifier: 'amfib', etym: 'https://en.wiktionary.org/wiki/%E1%BC%80%CE%BC%CF%86%CE%AF%CE%B2%CE%B9%CE%BF%CF%82#Ancient_Greek' },
  frog: { date: '2024-07-15', signified: 'verb/life/animal/amphibia/frog', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fruskaz') },

  // plant
  plant: { date: '2024-08-19', signified: 'verb/life/plant', ...fromLat('plantā'), etym: 'https://en.wiktionary.org/wiki/planta#Latin' },
  tree: { date: '2024-08-19', signified: 'verb/life/plant/tree', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bagmaz') },

  // body
  body: { date: '2024-02-13', signified: 'verb/body', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hrefaz') },
  blood: { date: '2024-07-29', signified: 'verb/body/blood', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C5%8D%C3%BE%C4%85') },
  bone: { date: '2024-02-13', signified: 'verb/body/bone', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bain%C4%85') },
  flesh: { date: '2024-02-13', signified: 'verb/body/flesh, meat, muscle', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/flaiski') },
  viscera: { date: '2024-02-13', signified: 'verb/body/viscera', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEarmaz') },
  skin: { date: '2024-02-13', signified: 'verb/body/skin, peel', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skin%C3%BE%C4%85') },
  head: { date: '2024-02-13', signified: 'verb/body/head', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haubud%C4%85') },
  neck: { date: '2024-02-13', signified: 'verb/body/throat, neck', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hnakk%C3%B4') },
  shoulder: { date: '2024-02-13', signified: 'verb/body/shoulder, buttock', signifier: 'squld', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/skuldru' },
  arm: { date: '2024-02-13', signified: 'verb/body/limb, leg, arm', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/limuz') },
  hand: { date: '2024-02-13', signified: 'verb/body/hand, foot', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/handuz') },
  trunk: { date: '2024-02-13', signified: 'verb/body/trunk, torso, stem', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stamniz') },
  tail: { date: '2024-02-13', signified: 'verb/body/tail', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stertaz') },
  hair: { date: '2024-02-13', signified: 'verb/body/hair, fur', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/h%C4%93r%C4%85') },
  horn: { date: '2024-02-13', signified: 'verb/body/horn', signifier: 'qorn', etym: 'https://en.wiktionary.org/wiki/cornu#Latin' },
  tooth: { date: '2024-02-13', signified: 'verb/body/tooth, fang', signifier: 'tund', etym: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tan%C3%BEs' },
  nail: { date: '2024-02-13', signified: 'verb/body/nail, claw', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/naglaz') },
  eye: { date: '2024-02-13', signified: 'verb/body/face/eye', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aug%C3%B4') },
  ear: { date: '2024-02-13', signified: 'verb/body/face/ear', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aus%C3%B4') },
  nose: { date: '2024-02-13', signified: 'verb/body/face/nose', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nas%C5%8D') },
  mouth: { date: '2024-02-13', signified: 'verb/body/face/mouth', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mun%C3%BEaz') },
  lip: { date: '2024-02-13', signified: 'verb/body/face/lip', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lep%C3%B4') },
  tung: { date: '2024-02-13', signified: 'verb/body/face/tong', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tung%C7%AD') },

  // tool
  knife: { date: '2024-07-28', signified: 'verb/tool/sword, knife, blade', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sahs%C4%85') },
  scissor: { date: '2024-07-28', signified: 'verb/tool/scissors', signifier: ['two', 'knife'] },
  spear: { date: '2024-07-28', signified: 'verb/tool/spear, pin', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/speru') },
  rod: { date: '2024-07-28', signified: 'verb/tool/rod, stuff, wand, club', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stikk%C3%B4') },
  money: { date: '2024-08-25', signified: 'verb/tool/money', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fehu') },

  // civilization
  person: { date: '2024-02-13', signified: 'verb/civilisation/person, individual, citizen', ...fromLat('cīvī'), etym: 'https://en.wiktionary.org/wiki/civi#Latin' },
  country: { date: '2024-08-24', signified: 'verb/civilisation/country', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mark%C5%8D') },
  rule: { date: '2024-07-28', signified: 'verb/civilisation/rule A, order', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stiurijan%C4%85') },

  // other
  full: { date: '2024-08-02', signified: 'verb/full-of A, perfect, complete', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fullaz') },
  kind: { date: '2024-07-15', signified: 'verb/kind-of', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kin%C3%BEiz') },
  work: { date: '2024-02-13', signified: 'verb/work A(operation)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/werk%C4%85') },
  use: { date: '2024-06-14', signified: 'verb/use A(tool) D(purpose)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nut%C5%8Dn%C4%85') },
  help: { date: '2024-06-18', signified: 'verb/help A(event)', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/helpan%C4%85') },
  //lick: { date: '2024-08-08', signified: 'verb/lick A', signifier: ['tongue', 'touch'] },
  harm: { date: '2024-08-19', signified: 'verb/harm A, hurt, damage', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/harmaz') },
  heal: { date: '2024-08-19', signified: 'verb/help A', signifier: ['back', 'harm'] },
  //fake: { date: '2024-08-26', signified: 'verb/simulate A(genuine, authentic), imitate, fake', signifier: ['back', 'harm'] },

  // country
  japan: { date: '2024-08-25', signified: 'verb/country/japan', signifier: 'nitpon', etym: 'https://en.wiktionary.org/wiki/%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93' },
  taiwan: { date: '2024-08-25', signified: 'verb/country/taiwan', signifier: 'devan', etym: 'https://en.wiktionary.org/wiki/%E8%87%BA%E7%81%A3' },
  unitedStates: { date: '2024-08-25', signified: 'verb/country/united-states', signifier: 'ameriq', etym: 'https://en.wiktionary.org/wiki/America#Latin' },
  unitedKingdom: { date: '2024-08-25', signified: 'verb/country/united-kingdom', signifier: 'britan', etym: 'https://en.wiktionary.org/wiki/Britannia#Latin' },
  germany: { date: '2024-08-25', signified: 'verb/country/germany', ...fromGem('https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEiudiskaz') },
  france: { date: '2024-08-25', signified: 'verb/country/france', ...fromLat('https://en.wiktionary.org/wiki/franco#Latin') },
  china: { date: '2024-08-25', signified: 'verb/country/china', signifier: 'jugcvoq', etym: 'https://en.wiktionary.org/wiki/%E4%B8%AD%E5%9C%8B' },
  russia: { date: '2024-08-25', signified: 'verb/country/russia', signifier: 'ros', etym: '' },
}));

console.log()

// generate compounds
for (let i = 0; i < 1000; i++)
  for (const [k, v] of dict.entries())
    if (Array.isArray(v.signifier)) {
      const components = v.signifier.map(component =>
        /^[A-Z]+$/.test(component)
          ? component.toLowerCase()
          : dict.get(component)?.signifier);
      if (components.every(component => typeof component === 'string')) {
        v.compound = true;
        v.etym = v.etym || v.signifier.join('+');
        v.signifier = components.join('-')
          .replace(/[^ieaou]-(?![ieaou])/g, '')
          .replace(/-/g, '');
        dict.set(k, v);
      }
      else if (i === 1000 - 1)
        console.error(`generating ${k}: component missing: ${v.signifier.filter(component => !dict.has(component))}`);
    }

// homophone
const entries = [...dict.entries()];
for (let i = 0; i < dict.size; i++)
  for (let j = i + 1; j < dict.size; j++) {
    const [k0, v0] = entries[i];
    const [k1, v1] = entries[j];
    if (v0.signifier === v1.signifier)
      console.error(`homophone=${v0.signifier}, keys=(${k0}, ${k1})`);
  }

// phonotactics
const consonants = 'gnmcdbqtpxksfhjzvrl';
const vowels = 'aiueo';

for (const [k, { signifier, compound }] of dict.entries()) {
  const s = signifier.replace(/\-/g, '');

  if (!compound) {
    for (const [message, re] of [
      ['geminate', `([${consonants + vowels}])\\1+`],
      ['VV', `[${vowels}]{2,}`],
      ['CCCC$', `[${consonants}]{4,}$`],
      ['hetero-nasal', `[nm][cqh]|[gm][kxjdtszrl]|[gn][bpfv]`],
      ['^NasCon', `^[gnmlr][${consonants}]`],
      //['^UnvoVo', `[qtpxksf][cdbhjzv]`],
      //['^VoUnvo', `[cdbhjzv][qtpxksf]`],
      //['Vo^', `[gmcdbhjzv]$`],
    ])
      if (new RegExp(re).test(s))
        console.warn('phonotactics:', message, k, signifier)
  }
}

export const name = dict.get('Autonym').signifier;
export default dict;