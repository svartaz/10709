import { replaceEach } from './common';
import { invalid } from './phonology';

export const name = 'kxau';

const fromAcronym = (acronym: string) =>
  replaceEach(acronym.toUpperCase(), [
    [/A/g, 'za'],
    [/Ä/g, 'ja'],
    [/B/g, 'ba'],
    [/C/g, 'ca'],
    [/D/g, 'da'],
    [/E/g, 'je'],
    [/F/g, 'fa'],
    [/G/g, 'ga'],
    [/H/g, 'xo'],
    [/I/g, 'ji'],
    [/J/g, 'ja'],
    [/K/g, 'ka'],
    [/L/g, 'la'],
    [/M/g, 'ma'],
    [/N/g, 'na'],
    [/O/g, 'vo'],
    [/Ö/g, 'jo'],
    [/P/g, 'pa'],
    [/Q/g, 'ko'],
    [/R/g, 'ra'],
    [/S/g, 'sa'],
    [/T/g, 'ta'],
    [/U/g, 'vu'],
    [/V/g, 'va'],
    [/W/g, 'vi'],
    [/X/g, 'xa'],
    [/Y/g, 'ju'],
    [/Z/g, 'so'],

    [/(?<![iueoa])a$/g, ''],
  ]);

enum Klass {
  Case = 'case',
  Preverb = 'preverb',
  Verb = 'verb',
  Numeral = 'numeral',
  Joiner = 'joiner',
  Clause = 'clause',
  Other = 'other',
}

export enum Formation {
  Simplex,
  Complex,
  Idiom,
}

interface ValuePre {
  d: string;
  c: Klass;
  td: string;
  formation: Formation;
  o: string;
  t?: string;
  complex?: string[];
  idiom?: string[];
}

/*
proto indo european
*ḱ   x
*k   k
*kʷ  k
*bʰ  b
*dʰ  d
*ǵʰ  j
*gʰ  c
*gʷʰ c
*/

/*
- animate - subject, inanimate, object
- one thing - subject, many things - object
*/

const dicPre = new Map<string, ValuePre>(
  Object.entries({
    then: {
      d: '2025-02-06',
      c: Klass.Other,
      td: "separator ','",
      o: 'a priori',
      t: 'xi',
    },

    der: {
      d: '2024-02-13',
      c: Klass.Case,
      td: 'nominative',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fan%C4%93',
      t: 'fe',
    },
    den: {
      d: '2024-02-13',
      c: Klass.Case,
      td: 'accusative',
      o: 'https://en.wiktionary.org/wiki/%D8%B1%D8%A7#Persian',
      t: 're',
    },
    to: {
      d: '2024-02-13',
      c: Klass.Case,
      td: 'dative',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C5%8D',
      t: 'te',
    },
    with: {
      d: '2024-12-24',
      c: Klass.Case,
      td: 'unspecified case',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/midi',
      t: 'me',
    },
    ly: {
      d: '2024-02-13',
      c: Klass.Case,
      td: 'adverb',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-līkaz',
      t: 'ke',
    },

    done: {
      d: '2024-02-13',
      c: Klass.Preverb,
      td: '[voice] passive. foregoeth a case marker (default: accusative).',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ga-',
      t: 'ca',
    },
    repeat: {
      d: '2024-02-13',
      c: Klass.Preverb,
      td: '[aspect] frequentative',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-lōną',
      t: 'lo',
    },

    begin: {
      d: '2024-02-13',
      c: Klass.Preverb,
      td: '[aspect] inchoative. begineth to',
      t: 'xo',
    },
    end: {
      d: '2024-02-13',
      c: Klass.Preverb,
      td: '[aspect] completive. endeth to',
      o: 'https://en.wiktionary.org/wiki/по-#Russian',
      t: 'zo',
    },

    shall: {
      d: '2024-02-13',
      c: Klass.Preverb,
      td: '[tense] future',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skulan%C4%85',
      t: 'xu',
    },
    do: {
      d: '2024-02-13',
      c: Klass.Preverb,
      td: '[tense] present',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nu',
      t: 'nu',
    },
    did: {
      d: '2024-02-13',
      c: Klass.Preverb,
      td: '[tense] past',
      o: 'https://en.wiktionary.org/wiki/%E5%92%97#Chinese',
      t: 'zu',
    },

    would: {
      d: '2024-02-13',
      c: Klass.Preverb,
      td: '[mood] irrealis, optative, imperative',
      t: 'so',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swa',
    },

    may: {
      d: '2024-02-13',
      c: Klass.Preverb,
      t: 'mo',
      td: '[mood] may, possibly',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/maganą',
    },

    so: {
      d: '2024-02-13',
      c: Klass.Preverb,
      td: '[restrictiveness] which is, so (non-restrictive)',
      t: 'do',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/þus',
    },

    ever: {
      d: '2024-10-19',
      c: Klass.Preverb,
      td: '[essentiality] in essence, in a nominal sense',
      t: 'se',
      o: 'https://en.wiktionary.org/wiki/esse#Latin',
    },

    not: {
      d: '2024-02-13',
      c: Klass.Joiner,
      td: '[logic] not, negation',
      t: 'na',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ne',
    },
    and: {
      d: '2024-02-13',
      c: Klass.Joiner,
      td: '[logic] and, both, conjunction',
      t: 'be',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bai',
    },
    or: {
      d: '2024-02-13',
      c: Klass.Joiner,
      td: '[logic] or, at least one, disjunction',
      t: 'bo',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bai',
    },
    iff: {
      d: '2024-02-13',
      c: Klass.Joiner,
      td: '[logic] if and only iff, equivalence',
      t: 'ba',
      o: 'a priori',
    },
    xor: {
      d: '2025-01-02',
      c: Klass.Joiner,
      td: '[logic] either',
      idiom: ['not', 'iff'],
    },

    'which{': {
      d: '2024-02-13',
      c: Klass.Clause,
      td: 'openeth relative clause. @0 is that which @{sentence}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hwat',
      t: 'vi',
    },
    'that{': {
      d: '2024-02-13',
      c: Klass.Clause,
      td: 'openeth statement clause. @0 is the (event, statement) that @{sentence}',
      t: 'di',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEat',
    },
    'whether{': {
      d: '2024-07-28',
      c: Klass.Clause,
      td: 'openeth truthfulness clause. @0 is whether @{sentence}',
      t: 'ji',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ja',
    },
    'how_much{': {
      d: '2024-10-20',
      c: Klass.Clause,
      td: 'openeth extent clause. @0 is the extent how much @{sentence}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haiduz',
      t: 'xi',
    },
    '}': {
      d: '2024-02-13',
      c: Klass.Other,
      td: 'closeth clause',
      o: 'https://en.wiktionary.org/wiki/啦#Chinese',
      t: 'do',
    },

    called: {
      d: '2024-02-13',
      c: Klass.Other,
      td: '@0 is called @{name}',
      t: 'no',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/namô',
    },

    _0: {
      d: '2025-02-27',
      c: Klass.Other,
      td: 'bound variable 0',
      o: 'a priori',
      t: 'ku',
    },
    _1: {
      d: '2025-02-27',
      c: Klass.Other,
      td: 'bound variable 0',
      o: 'a priori',
      t: 'tu',
    },
    _2: {
      d: '2025-02-27',
      c: Klass.Other,
      td: 'bound variable 0',
      o: 'a priori',
      t: 'pu',
    },

    zero: {
      d: '2024-02-13',
      c: Klass.Numeral,
      td: '[digit] 0',
      t: 'ze',
      o: 'https://en.wiktionary.org/wiki/%D8%B5%D9%81%D8%B1#Arabic',
    },
    one: {
      d: '2024-02-13',
      c: Klass.Numeral,
      td: '[digit] 1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/Háykas',
      t: 'ka',
    },
    two: {
      d: '2024-02-13',
      c: Klass.Numeral,
      td: '[digit] 2',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/twai',
      t: 'tua',
    },
    three: {
      d: '2024-02-13',
      c: Klass.Numeral,
      td: '[digit] 3',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEr%C4%ABz',
      t: 'dre',
    },
    four: {
      d: '2024-02-13',
      c: Klass.Numeral,
      td: '[digit] 4',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fedw%C5%8Dr',
      t: 'for',
    },
    five: {
      d: '2024-02-13',
      c: Klass.Numeral,
      td: '[digit] 5',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/p%C3%A1n%C4%8Da',
      t: 'pan',
    },
    six: {
      d: '2024-02-13',
      c: Klass.Numeral,
      td: '[digit] 6',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-Iranian/%C5%A1w%C3%A1%C4%87%C5%A1',
      t: 'xek',
    },
    seven: {
      d: '2024-02-13',
      c: Klass.Numeral,
      td: '[digit] 7',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sebun',
      t: 'sef',
    },
    eight: {
      d: '2024-02-13',
      c: Klass.Numeral,
      td: '[digit] 8',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aht%C5%8Du',
      t: 'vak',
    },
    nine: {
      d: '2024-02-13',
      c: Klass.Numeral,
      td: '[digit] 9',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/newun',
      t: 'nin',
    },

    infinite: {
      d: '2024-09-06',
      c: Klass.Numeral,
      td: 'infinite, ∞',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sin-',
      t: 'sin',
    },
    kilo: {
      d: '2024-02-13',
      c: Klass.Numeral,
      td: "[separator] 1000, ','",
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BE%C5%ABsund%C4%AB',
      t: 'xilo',
    },
    deci: {
      d: '2024-02-13',
      c: Klass.Numeral,
      td: "[separator] decimal separator, '.'",
      o: 'https://en.wiktionary.org/wiki/pungo#Latin',
      t: 'dexi',
    },

    how_many: {
      d: '2024-02-13',
      c: Klass.Numeral,
      td: '[interogative] how many',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hw%C5%8D',
      t: 'vo',
    },

    each: {
      d: '2024-02-13',
      c: Klass.Numeral,
      td: 'each, every, all',
      o: 'https://en.wiktionary.org/wiki/%CF%80%E1%BE%B6%CF%82#Ancient_Greek',
      t: 'pa',
    },

    at_most: {
      d: '2024-02-13',
      c: Klass.Numeral,
      td: '[comparative] at most. ≤',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/l%C4%ABtilaz',
      t: 'lu',
    },
    less_than: {
      d: '2024-08-31',
      c: Klass.Numeral,
      td: '[comparative] less than. <',
      o: 'https://en.wiktionary.org/wiki/l%C3%A6s#Etymology_2_2',
      t: 'me',
    },

    plural: {
      d: '2024-09-17',
      c: Klass.Numeral,
      td: 'plural, at least two',
      idiom: ['two', 'at_most'],
    },

    _add: {
      d: '2024-02-13',
      c: Klass.Numeral,
      td: '[binary] addition, +',
      o: 'https://en.wiktionary.org/wiki/summa#Latin',
      t: 'sum',
    },
    _sub: {
      d: '2024-02-13',
      c: Klass.Numeral,
      td: '[binary] subtraction, -',
      o: 'https://en.wiktionary.org/wiki/differentia#Latin',
      t: 'dif',
    },
    _mul: {
      d: '2024-02-13',
      c: Klass.Numeral,
      td: '[binary] multiplication, *',
      o: 'https://en.wiktionary.org/wiki/productum#Latin',
      t: 'pro',
    },
    _div: {
      d: '2024-02-13',
      c: Klass.Numeral,
      td: '[binary] division, \u002F',
      o: 'https://en.wiktionary.org/wiki/quotiens#Latin',
      t: 'koti',
    },
    _mod: {
      d: '2024-08-24',
      c: Klass.Numeral,
      td: '[binary] modulo, %',
      o: 'https://en.wiktionary.org/wiki/modulus#Latin',
      t: 'modo',
    },
    _exp: {
      d: '2024-08-24',
      c: Klass.Numeral,
      td: '[binary] exponential, ^',
      o: 'https://en.wiktionary.org/wiki/potere#Latin',
      t: 'pote',
    },
    _log: {
      d: '2024-08-24',
      c: Klass.Numeral,
      td: '[binary] logarithm',
      o: 'https://en.wiktionary.org/wiki/logarithmo#Latin',
      t: 'loca',
    },

    _ord: {
      d: '2024-08-02',
      c: Klass.Other,
      td: '@0 is @{number}-th',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-i%C3%BE%C5%8D',
      t: 'te',
    },
    _card: {
      d: '2024-08-02',
      c: Klass.Other,
      td: '@0 contains @{number} elements',
      o: 'https://en.wiktionary.org/wiki/%E5%80%8B',
      t: 'ko',
    },

    first: {
      d: '2024-09-14',
      c: Klass.Verb,
      td: '@0 is (0th, first, primary)',
      idiom: ['_ord', 'zero'],
    },
    second: {
      d: '2024-09-14',
      c: Klass.Verb,
      td: '@0 is (1st, second, other)',
      idiom: ['_ord', 'one'],
    },
    last: {
      d: '2024-09-14',
      c: Klass.Verb,
      td: '@0 is (last, final)',
      idiom: ['_ord', 'each'],
    },

    i: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '@0 is me',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mek',
      t: 'ma',
    },
    thou: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '@0 is thee',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEek',
      t: 'da',
    },
    he: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '@0 is (him, it, this, that, the definite entity)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hiz',
      t: 'xa',
    },
    self: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '@0 is oneself',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sek',
      t: 'sa',
    },
    who: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[interogative] @0 is who',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hwaz',
      t: 'va',
    },

    this: {
      d: '2024-09-16',
      c: Klass.Verb,
      td: '@0 is this',
      idiom: ['he', 'near'],
    },
    yon: {
      d: '2024-09-16',
      c: Klass.Verb,
      td: '@0 is that',
      idiom: ['he', 'far'],
    },

    normal: {
      d: '2024-09-29',
      c: Klass.Verb,
      td: '[extent.subjective] @0 is of (normal, moderate, default, usual, ordinary) extent, at subjective norm',
      t: 'mes',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/gamet',
    },
    high: {
      d: '2024-09-29',
      c: Klass.Verb,
      td: '[extent.subjective] @0 is of (high, great) extent, above subjective norm',
      t: 'man',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/managaz',
    },
    low: {
      d: '2024-09-29',
      c: Klass.Verb,
      td: '[extent.subjective] @0 is of (low, small) extent, below subjective norm',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fawaz',
      t: 'fau',
    },
    positive: {
      d: '2024-09-29',
      c: Klass.Verb,
      td: '[extent.polarity] @0 is (positive, above objective norm)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wela',
      t: 'veu',
    },
    negative: {
      d: '2024-09-29',
      c: Klass.Verb,
      td: '[extent.polarity] @0 is (negative, below objective norm)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/missa-',
      t: 'mis',
    },
    up: {
      d: '2024-09-29',
      c: Klass.Verb,
      td: '[extent.dynamic] @0 is (riseth, goeth up, ascends) along with @1',
      t: 'ris',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C4%ABsan%C4%85',
    },
    down: {
      d: '2024-09-29',
      c: Klass.Verb,
      td: '[extent.dynamic] @0 is (falleth, goeth down, descends) along with @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fallan%C4%85',
      t: 'fau',
    },
    most: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[extent.extreme] @0 is (maximal, possibly highest)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/maiz',
      t: 'mai',
    },
    least: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[extent.extreme] @0 is (minimal, possibly lowest)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/minniz%C3%B4',
      t: 'min',
    },

    [name]: {
      d: '2024-02-17',
      c: Klass.Verb,
      td: `@0 is the language ${name}`,
      t: name,
      o: 'a priori',
    },

    // basic
    deny: {
      d: '2024-08-30',
      c: Klass.Verb,
      td: '@0 (contradicteth, negateth, denieth) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ne',
      t: 'nai',
    },
    let: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '@0 (causeth, leteth) @{1:result, effect}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/l%C4%93tan%C4%85',
      t: 'let',
    },
    back: {
      d: '2024-06-14',
      c: Klass.Verb,
      td: '@0 is temporally (inverse, opposite) of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Italic/wre-',
      t: 'rei',
    },
    counter: {
      d: '2024-06-14',
      c: Klass.Verb,
      td: '@0 (complementeth, is dual of) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ga-',
      t: 'jai',
    },
    relate: {
      d: '2024-09-14',
      c: Klass.Verb,
      td: '@0 is (related to @1, @1-ish), ',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/-l%C4%ABkaz',
      t: 'lix',
    },

    happen: {
      d: '2024-08-23',
      c: Klass.Verb,
      td: '@0 (existeth, happeneth, occureth, realiseth, is actual, is an event)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skehan%C4%85',
      t: 'skek',
    },

    make: {
      d: '2024-08-02',
      c: Klass.Verb,
      td: '@0 (maketh, buildeth, createth) @1 from @{2:material, component}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skapjan%C4%85',
      t: 'skaf',
    },
    break: {
      d: '2024-06-14',
      c: Klass.Verb,
      td: '@0 (breaketh, destructeth) @1 into @{2:pieces, components}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brekan%C4%85',
      t: 'brek',
      complex: ['back', 'make'],
    },

    have: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '@0 (hath, owneth) @{1:property}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/habjan%C4%85',
      t: 'kaf',
    },
    give: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '@0 giveth @1 to @{2:receiver}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/geban%C4%85',
      t: 'jif',
    },
    take: {
      d: '2024-08-24',
      c: Klass.Verb,
      td: '@0 {taketh, receiveth} @1 from @2',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/neman%C4%85',
      t: 'nem',
      complex: ['back', 'give'],
    },

    from: {
      d: '2024-08-26',
      c: Klass.Verb,
      td: '@0 (is, cometh) (from, since) @{1:source, origin, start}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fan%C4%93',
    },
    unto: {
      d: '2024-08-26',
      c: Klass.Verb,
      td: '@0 (is, goeth) (to, until) @{1:sink, destination, goal}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/til%C4%85',
      t: 'tiu',
    },
    through: {
      d: '2024-08-26',
      c: Klass.Verb,
      td: '@0 (is, passeth) (through, via) @{1:process, route, medium}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEurhw',
      t: 'dur',
    },
    at: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '@0 is at @{1:position, location, place}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wesan%C4%85',
      t: 'ves',
    },

    element: {
      d: '2024-08-06',
      c: Klass.Verb,
      td: '@0 is in @{1:collection, set, group, list}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/gad',
      t: 'cat',
    },
    part: {
      d: '2024-08-06',
      c: Klass.Verb,
      td: '@0 is a (part, component) of @{1:whole}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dailiz',
      t: 'dai',
    },
    complex: {
      d: '2024-08-25',
      c: Klass.Verb,
      td: '@0 (is complex, consisteth of many parts)',
      complex: ['done', 'part', 'high'],
    },
    simple: {
      d: '2024-08-25',
      c: Klass.Verb,
      td: '@0 (is simple, consisteth of few parts)',
      complex: ['done', 'part', 'low'],
    },
    atom: {
      d: '2024-08-25',
      c: Klass.Verb,
      td: '@0 is an atom',
      complex: ['done', 'part', 'one'],
    },

    contain: {
      d: '2024-08-02',
      c: Klass.Verb,
      td: '@0 is containeth @{1:within}',
      o: 'https://en.wiktionary.org/wiki/belucan#Old_English',
      t: 'luk',
    },
    full: {
      d: '2024-08-02',
      c: Klass.Verb,
      td: '@0 is full of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fullaz',
      complex: ['most', 'contain'],
      t: 'fou',
    },
    empty: {
      d: '2024-08-02',
      c: Klass.Verb,
      td: '@0 is empty of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C5%8Dmaz',
      complex: ['least', 'contain'],
      t: 'tom',
    },

    move: {
      d: '2024-08-31',
      c: Klass.Verb,
      td: '@0 (moveth, is dynamic)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wegan%C4%85',
      t: 'vex',
    },
    stop: {
      d: '2024-08-31',
      c: Klass.Verb,
      td: '@0 (stopeth, halteth, is static)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/stopp%C5%8Dn',
      complex: ['least', 'move'],
      t: 'stof',
    },

    point: {
      d: '2024-10-01',
      c: Klass.Verb,
      td: '@0 is a (point, position, dot)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bruzdaz',
      t: 'brut',
    },
    interval: {
      d: '2024-10-01',
      c: Klass.Verb,
      td: '@0 is (an interval, an area, a volume, a domain)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/braidaz',
      t: 'bret',
    },

    world: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '@0 is a (world, universe)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haimaz',
      t: 'xem',
    },
    space: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '@0 is the 3-dimensional physical spacial continuum',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C5%ABm%C4%85',
      t: 'rum',
    },
    time: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '@0 is the 1-dimensional physical temporal continuum',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%ABm%C3%B4',
      t: 'tim',
    },
    thing: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '@0 is a (thing, matter) located in a spacetime',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEing%C4%85',
      t: 'dink',
    },
    mass: {
      d: '2024-08-31',
      c: Klass.Verb,
      td: '@0 is mass of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/balk%C3%B4',
      t: 'baux',
    },

    energy: {
      d: '2024-08-31',
      c: Klass.Verb,
      td: '@0 is energy of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Italic/gn%C4%81wos',
      t: 'taka',
    },
    heat: {
      d: '2024-09-06',
      c: Klass.Verb,
      td: '@0 is heat in @1',
      complex: ['hot', 'energy'],
    },
    electric: {
      d: '2024-08-31',
      c: Klass.Verb,
      td: '@0 hath electric charge in @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sparkaz',
      t: 'spak',
    },
    force: {
      d: '2024-10-01',
      c: Klass.Verb,
      td: '@0 is force',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wald%C4%85',
      t: 'vaut',
    },

    wave: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '@{0:medium} waveth @{1:form}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bulgij%C5%8D',
      t: 'bux',
    },
    light: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[wave] @0 is (a light, an electromagnetic wave)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/leuht%C4%85',
      t: 'liut',
    },
    sound: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '[wave] @0 is a sound from @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/klingan%C4%85',
      t: 'klin',
    },
    turn: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '@0 (turneth, rotateth, spineth) around @{1:pivot, center}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEr%C4%93an%C4%85',
      t: 'dren',
    },

    fire: {
      d: '2024-12-08',
      c: Klass.Verb,
      td: '@0 burneth @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brandaz',
      t: 'brant',
    },

    // physical attribute
    big: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '@0 is (big, great)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/grautaz',
      t: 'crot',
    },
    small: {
      d: '2024-09-26',
      c: Klass.Verb,
      td: '@0 is small',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/smalaz',
      complex: ['low', 'big'],
      t: 'smau',
    },
    long: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '@0 is (long, big in 1 dimension and small in others)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/langaz',
      t: 'lank',
    },
    short: {
      d: '2024-09-26',
      c: Klass.Verb,
      td: '@0 is (short, small in 1 dimension and small in others)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skurtaz',
      complex: ['low', 'long'],
      t: 'skurt',
    },

    thick: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '@0 is thick',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEekuz',
      t: 'dik',
    },
    sharp: {
      d: '2024-07-28',
      c: Klass.Verb,
      td: '@{0:angle} is sharp',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skarpaz',
      t: 'skarf',
    },
    heavy: {
      d: '2024-07-14',
      c: Klass.Verb,
      td: '@0 is heavy',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sw%C4%93raz',
      t: 'suer',
    },
    dense: {
      d: '2024-07-15',
      c: Klass.Verb,
      td: '@0 is (dense, heavy per volume)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEinhtaz',
      t: 'dint',
    },

    swift: {
      d: '2024-06-18',
      c: Klass.Verb,
      td: '@0 is (swift, quick)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/snellaz',
      t: 'sneu',
    },
    slow: {
      d: '2024-09-06',
      c: Klass.Verb,
      td: '@0 is suau',
      t: 'slai',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/slaiwaz',
      complex: ['low', 'swift'],
    },
    rough: {
      d: '2024-08-24',
      c: Klass.Verb,
      td: '@0 (is rough, is coarse, hath high friction) against @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C5%ABhaz',
      t: 'ruk',
    },
    smooth: {
      d: '2024-09-26',
      c: Klass.Verb,
      td: '@0 (is smooth, is sleek, hath low friction) against @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sl%C4%ABkan%C4%85',
      complex: ['low', 'rough'],
      t: 'srik',
    },
    soft: {
      d: '2024-09-26',
      c: Klass.Verb,
      td: '@0 is soft against @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C4%ABkwan%C4%85',
      t: 'vik',
    },
    hard: {
      d: '2024-09-26',
      c: Klass.Verb,
      td: '@0 is (hard, firm) against @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fastuz',
      complex: ['low', 'soft'],
      t: 'fast',
    },
    hot: {
      d: '2024-08-30',
      c: Klass.Verb,
      td: '[temparature] @0 is (hot, warm)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haitaz',
      t: 'kait',
    },
    cold: {
      d: '2024-08-30',
      c: Klass.Verb,
      td: '[temparature] @0 (cold, cool)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kalan%C4%85',
      complex: ['low', 'hot'],
      t: 'kau',
    },
    far: {
      d: '2024-08-08',
      c: Klass.Verb,
      td: '[proximity] @0 is (far, distant, remote) from @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ferrai',
      t: 'fer',
    },
    near: {
      d: '2024-08-08',
      c: Klass.Verb,
      td: '[proximity] @0 is (near, close to) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/n%C4%93hwaz',
      complex: ['low', 'far'],
      t: 'nex',
    },
    contact: {
      d: '2024-08-08',
      td: '[proximity] @0 (toucheth, is adjacent, is in contact with) @1',
      c: Klass.Verb,
      complex: ['least', 'far'],
    },

    before: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[position.global] @0 is before @{1:after}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/furai',
      t: 'for',
    },
    below: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[position] @0 is below @{1:above, far against gravity}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ni%C3%BEan%C4%93',
      t: 'nit',
    },
    hind: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[position.local] @0 is behind @{1:front}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hinder',
      t: 'xint',
    },
    front: {
      d: '2025-02-07',
      c: Klass.Verb,
      td: '[position.local] @0 is in front of @{1:behind}',
      idiom: ['done', 'hind'],
    },
    left: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[position] @0 is to the left of @{1:right}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Old_High_German/link',
      t: 'link',
    },
    right: {
      d: '2025-02-07',
      c: Klass.Verb,
      td: '[position] @0 is to the right of @{1:left}',
      idiom: ['done', 'left'],
    },

    west: {
      d: '2024-08-24',
      c: Klass.Verb,
      td: '[position.global] @0 is to the west of @{1:to the east, far agaisnt rotation}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/westraz',
      t: 'vest',
    },
    east: {
      d: '2025-03-01',
      c: Klass.Verb,
      td: '[position.global] @0 is to the east of @{1:to the west, far along rotation}',
      idiom: ['done', 'west'],
    },
    north: {
      d: '2024-08-24',
      c: Klass.Verb,
      td: '[position.global] @0 is to the north of @{1:to the south}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nur%C3%BEraz',
      t: 'nurt',
    },
    south: {
      d: '2025-03-01',
      c: Klass.Verb,
      td: '[position.global] @0 is to the south of @{1:to the north}',
      idiom: ['done', 'north'],
    },

    solid: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[state-of-matter] @0 is solid',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/st%C4%ABfaz',
      t: 'stif',
    },
    liquid: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[state-of-matter] @0 is liquid',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/flut%C4%85',
      t: 'flut',
    },
    gas: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[state-of-matter] @0 is gas',
      o: 'https://en.wiktionary.org/wiki/gas#Dutch',
      t: 'cas',
    },
    plasm: {
      d: '2024-07-15',
      c: Klass.Verb,
      td: '[state-of-matter] @0 is plasm',
      o: 'https://en.wiktionary.org/wiki/flamma#Latin',
      t: 'flam',
    },

    water: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[matter] @0 is water',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wat%C5%8Dr',
      t: 'vat',
    },
    salt: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[matter] @0 is salt',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/salt%C4%85',
      t: 'saut',
    },
    stone: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '[matter] @0 is stone',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stainaz',
      t: 'sten',
    },
    smoke: {
      d: '2024-09-16',
      c: Klass.Verb,
      td: '[matter] @0 is smoke',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dwemr%C4%85',
      t: 'duem',
    },
    ash: {
      d: '2024-09-16',
      c: Klass.Verb,
      td: '[matter] @0 is ash',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ask%C7%AD',
      t: 'vask',
    },

    wet: {
      d: '2024-09-16',
      c: Klass.Verb,
      td: '@0 is (wet, moist)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C4%93taz',
      complex: ['contain', 'water'],
      t: 'vet',
    },
    dry: {
      d: '2024-09-16',
      c: Klass.Verb,
      td: '@0 is dry',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/druknaz',
      complex: ['low', 'contain', 'water'],
      t: 'drux',
    },

    color: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[color] @0 is the color of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/farwaz',
      t: 'far',
    },
    hue: {
      d: '2024-11-20',
      c: Klass.Verb,
      td: '[color] @0 is {a hue, a frequency of a light} of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hiwj%C4%85',
      t: 'xeu',
    },
    red: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[color.hue] @0 is red',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/raudaz',
      t: 'rot',
    },
    orange: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[color.hue] @0 is orange',
      o: 'https://en.wiktionary.org/wiki/%D9%86%D8%A7%D8%B1%D9%86%DA%AF#Persian',
      t: 'nara',
    },
    yellow: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[color.hue] @0 is yellow',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gulaz',
      t: 'cula',
    },
    green: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[color.hue] @0 is green',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gr%C5%8Dniz',
      t: 'cron',
    },
    blue: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[color.hue] @0 is blue',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C4%93waz',
      t: 'bleu',
    },
    purple: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[color.hue] @0 is purple',
      o: 'https://en.wiktionary.org/wiki/viola#Latin',
      t: 'viora',
    },
    vivid: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '[color.saturation] @0 is vivid-colored',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sk%C4%ABnan%C4%85',
      t: 'xin',
    },
    dull: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '[color.saturation] @0 is dull-colored',
      complex: ['low', 'vivid'],
    },
    gray: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '[color.saturation] @0 is gray',
      complex: ['least', 'vivid'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gr%C4%93waz',
      t: 'creu',
    },
    white: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[color.brightness] @0 is white',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hw%C4%ABtaz',
      t: 'xuit',
    },
    black: {
      d: '2024-04-26',
      c: Klass.Verb,
      td: '[color.brightness] @0 is black',
      complex: ['least', 'white'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swartaz',
      t: 'suart',
    },

    // light
    bright: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '@0 (is bright, reflecteth much light)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/berhtaz',
      t: 'bert',
    },
    dark: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '@0 is dark',
      complex: ['low', 'bright'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dimmaz',
      t: 'dim',
    },

    // celestial
    sun: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[celestial] @0 is sun',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sunn%C7%AD',
      t: 'sun',
    },
    earth: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[celestial] @0 is earth',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/er%C3%BE%C5%8D',
      t: 'zert',
    },
    moon: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[celestial] @0 is moon',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/m%C4%93n%C3%B4',
      t: 'men',
    },

    year: {
      d: '2024-08-30',
      c: Klass.Verb,
      td: '[celestial.interval] @0 is year of @{1:earth}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/j%C4%93r%C4%85',
      t: 'jer',
    },
    season: {
      d: '2024-08-30',
      td: '[celestial.time] @0 is season of @{1:earth}',
      c: Klass.Verb,
      complex: ['part', 'year'],
    },
    winter: {
      d: '2024-08-30',
      c: Klass.Verb,
      td: '@0 is (winter, coldest interval) of @{1:earth}',
      complex: ['season', 'low'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wintruz',
      t: 'vinter',
    },
    spring: {
      d: '2024-11-21',
      c: Klass.Verb,
      td: '@0 is (spring, second hottest interval) of @{1:earth}',
      complex: ['season', 'up'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wazr%C4%85',
      t: 'vazar',
    },
    summer: {
      d: '2024-08-30',
      c: Klass.Verb,
      td: '@0 is (summer, hottest interval) of @{1:earth}',
      complex: ['season', 'high'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sumaraz',
      t: 'sumar',
    },
    autumn: {
      d: '2024-11-21',
      c: Klass.Verb,
      td: '@0 is (autumn, second coldest interval) of @{1:earth}',
      complex: ['season', 'down'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/harbistaz',
      t: 'karbis',
    },

    day: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '[celestial.interval] @0 is day of @{1:earth}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%ABnaz',
      t: 'tin',
    },
    morning: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '[celestial.interval] @0 is (morning, daytime) of @{1:earth}',
      complex: ['part', 'day', 'bright'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/murginaz',
      t: 'murk',
    },
    night: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '[celestial.interval] @0 is night of @{1:earth}',
      complex: ['part', 'day', 'dark'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nahts',
      t: 'nat',
    },

    // terrain
    land: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[terrain] @0 is land',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/land%C4%85',
      t: 'lant',
    },
    sea: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[terrain] @0 is a sea',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mari',
      t: 'mar',
    },
    hill: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[terrain] @0 is a (mountain, hill)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bergaz',
      t: 'berx',
    },
    river: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[terrain] @0 is river',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/straumaz',
      t: 'srom',
    },
    sky: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '[terrain] @0 is sky',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skiwj%C4%85',
      t: 'skiu',
    },

    // weather
    cloud: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '[weather] @0 is cloud',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wulkn%C4%85',
      t: 'vouka',
    },
    fog: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '[weather] @0 is (fog, mist)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mihstaz',
      t: 'mista',
    },
    rain: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '[weather] @0 is rain',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/regn%C4%85',
      t: 'reina',
    },
    snow: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '[weather] @0 is snow',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sn%C4%ABwan%C4%85',
      t: 'sniva',
    },
    hail: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '[weather] @0 is hail',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haglaz',
      t: 'kacla',
    },
    thunder: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '[weather] @0 is thunder',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEunraz',
      t: 'dunra',
    },

    // feel
    feel: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '@0 (feeleth, senseth) @{1:stimulus}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Indo-European/sent-',
      t: 'sent',
    },
    hear: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[sense] @0 hears @{1:sound}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hleum%C3%B4',
      t: 'xleu',
    },
    see: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[sense] @0 sees @{1:sight}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wl%C4%ABtan%C4%85',
      t: 'vlit',
    },
    smell: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[sense] @0 smells @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/reukan%C4%85',
      t: 'riuk',
    },
    taste: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[sense] @0 tastes @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/smak%C4%93n',
      t: 'smak',
    },
    touch: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[sense] @0 (palpeth, toucheth) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/t%C4%93kan%C4%85',
      t: 'tek',
    },
    hurt: {
      d: '2025-03-01',
      c: Klass.Verb,
      td: '[sense] @0 (hurteth, feeleth pain) from @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sairaz',
      t: 'sair',
    },

    differ: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[comparison] @0 (differeth, varieth) from @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skiljan%C4%85',
      t: 'skiu',
    },
    same: {
      d: '2024-08-27',
      c: Klass.Verb,
      td: '[comparison] @0 is (the same as, identical to, equal to) @1',
      complex: ['least', 'differ'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/samaz',
      t: 'sam',
    },

    simulate: {
      d: '2024-08-27',
      c: Klass.Verb,
      td: '@{0} (simulateth, mimiceth, imitateth, mocketh, faketh) @{1:original}',
      o: 'https://en.wiktionary.org/wiki/mock#English',
      t: 'mok',
    },
    test: {
      d: '2024-07-26',
      c: Klass.Verb,
      td: '@0 (checketh, examineth, inspecteth) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/keusan%C4%85',
      t: 'xeus',
    },
    compare: {
      d: '2024-07-26',
      c: Klass.Verb,
      td: '@0 compares @{1:individuals}',
      complex: ['differ', 'test'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/metan%C4%85',
      t: 'met',
    },

    // life
    live: {
      d: '2024-02-13',
      c: Klass.Verb,
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/libjan%C4%85',
      td: '@0 (liveth, is alive)',
      t: 'lif',
    },
    die: {
      d: '2024-08-24',
      c: Klass.Verb,
      td: '@0 (dieth, is dead)',
      idiom: ['end', 'live'],
    },
    kill: {
      d: '2024-08-24',
      c: Klass.Verb,
      td: '@0 killeth @1',
      idiom: ['let', 'die'],
    },
    wake: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '@0 (waketh, is awake)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wakan%C4%85',
      t: 'vax',
    },
    sleep: {
      d: '2024-04-26',
      c: Klass.Verb,
      td: '@0 (sleepeth, is asleep)',
      complex: ['least', 'wake'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swefan%C4%85',
      t: 'suef',
    },

    // motion
    lie: {
      d: '2024-08-30',
      c: Klass.Verb,
      td: '[behavior] @0 (lieth, horizontally stays) on @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ligjan%C4%85',
      t: 'lik',
    },
    sit: {
      d: '2024-08-30',
      c: Klass.Verb,
      td: '[behavior] @0 sits on @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sitjan%C4%85',
      t: 'set',
    },
    stand: {
      d: '2024-08-30',
      c: Klass.Verb,
      td: '@0 stands on @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/st%C4%81n%C4%85',
      t: 'stan',
    },
    walk: {
      d: '2024-06-18',
      c: Klass.Verb,
      td: '[behavior] @0 walk on @{1:ground}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/walkan%C4%85',
      t: 'vauk',
    },
    run: {
      d: '2024-06-18',
      c: Klass.Verb,
      td: '[behavior] @0 run on @{1:ground}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rinnan%C4%85',
      t: 'rin',
    },
    leap: {
      d: '2024-07-28',
      c: Klass.Verb,
      td: '[behavior] @0 (jump, leap, skip, hop) over @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlaupan%C4%85',
      t: 'klauf',
    },
    crawl: {
      d: '2025-03-31',
      c: Klass.Verb,
      td: '[behavior] @0 crawleth on @{1:ground}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kreupan%C4%85',
      t: 'kreuf',
    },
    swim: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '[behavior] @0 (swimeth, flieth) in @{1:fluid}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swimman%C4%85',
      t: 'suim',
    },
    fly: {
      d: '2024-07-28',
      c: Klass.Verb,
      td: '[behavior] @0 flieth in @{1:air}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fleugan%C4%85',
      t: 'fleuk',
    },
    dream: {
      d: '2024-10-16',
      c: Klass.Verb,
      td: '[behavior] @0 dreameth @{1:dream}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/draumaz',
      t: 'draum',
    },

    // physiological
    eat: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[physiological] @0 eateth @{1:food}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/etan',
      t: 'zet',
    },
    bite: {
      d: '2024-08-24',
      c: Klass.Verb,
      td: '[physiological.eat] @0 biteth @{1:food}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/b%C4%ABtan%C4%85',
      t: 'bit',
    },
    chew: {
      d: '2024-08-24',
      c: Klass.Verb,
      td: '[physiological.eat] @0 cheweth @{1:food}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kewwan%C4%85',
      t: 'xeu',
    },
    swallow: {
      d: '2024-08-24',
      c: Klass.Verb,
      td: '[physiological.eat] @0 swalloweth @{1:food}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swelgan%C4%85',
      t: 'sueuk',
    },
    suck: {
      d: '2025-03-31',
      c: Klass.Verb,
      td: '[physiological.eat] @0 sucketh @{1:food}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/s%C5%ABkan%C4%85',
      t: 'suk',
    },
    lick: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '[body-interaction] @0 licketh @1',
      complex: ['touch', 'tongue'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/likk%C5%8Dn%C4%85',
      t: 'lix',
    },

    vomit: {
      d: '2024-06-14',
      c: Klass.Verb,
      td: '[physiological] @0 vomits @{1:excreta}',
      complex: ['back', 'eat'],
      o: 'https://en.wiktionary.org/wiki/puke',
      t: 'puk',
    },
    shit: {
      d: '2024-06-14',
      c: Klass.Verb,
      td: '[physiological] @0 shits @{1:excreta}',
      complex: ['counter', 'eat'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/drit%C4%85',
      t: 'drit',
    },
    digest: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[physiological] @0 digests @{1:food}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/meltan%C4%85',
      t: 'meut',
    },
    fuck: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[physiological] @0 fucketh A',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fukk%C5%8Dn%C4%85',
      t: 'fok',
    },
    sick: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[physiological] @0 (is sick, malfunctioneth)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/seukaz',
      t: 'seuk',
    },
    healthy: {
      d: '2024-08-24',
      c: Klass.Verb,
      td: '[physiological] @0 is healthy',
      complex: ['low', 'sick'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sundaz',
      t: 'sunt',
    },
    recover: {
      d: '2024-12-24',
      c: Klass.Verb,
      complex: ['down', 'sick'],
      td: '[physiological] @0 recovers',
    },

    // emotion
    emotion: {
      d: '2024-08-02',
      c: Klass.Verb,
      td: '@0 feeleth @{1:emotion, feeling}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hugiz',
      t: 'xuk',
    },
    bad: {
      d: '2024-08-02',
      c: Klass.Verb,
      td: '[emotion] @0 (disliketh, feeleth bad about, hath a negative impression of) @{1:bad} @{#:desired change of distance}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lai%C3%BEaz',
      t: 'rait',
    },
    good: {
      d: '2024-08-02',
      c: Klass.Verb,
      td: '[emotion] @0 (liketh, feeleth good about, hath a positive impression of) @{1:good}',
      complex: ['low', 'bad'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/g%C5%8Ddaz',
      t: 'cot',
    },
    sad: {
      d: '2024-09-10',
      c: Klass.Verb,
      td: '[emotion] @0 is (sad, depressed) about @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/surg%C5%8D',
      t: 'surk',
    },
    glad: {
      d: '2024-08-02',
      c: Klass.Verb,
      td: '[emotion] @0 is (happy, glad, merry) about @1',
      complex: ['low', 'sad'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/frawaz',
      t: 'frau',
    },

    care: {
      d: '2024-09-10',
      c: Klass.Verb,
      t: 'kar',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kar%C5%8D',
      td: '[emotion] @0 (regardeth, careth about) @{1:important}',
    },
    fear: {
      d: '2024-09-10',
      c: Klass.Verb,
      td: '[emotion.care] @0 (worries, feareth, is afraid of, negatively cares about) @1',
      complex: ['care', 'bad'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/furhtaz',
      t: 'fort',
    },
    respect: {
      d: '2024-09-10',
      c: Klass.Verb,
      td: '[emotion.care] @0 (respecteth, honoureth, positively cares about) @1',
      complex: ['care', 'good'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wer%C3%BEaz',
      t: 'vert',
    },
    neglect: {
      d: '2024-09-10',
      c: Klass.Verb,
      td: '[emotion] @0 (neglecteth, is indifferent to, cares less about) @1',
      complex: ['low', 'care'],
    },
    serene: {
      d: '2024-09-10',
      c: Klass.Verb,
      td: '[emotion.neglect] @0 is (calm about, serene about, positively neglects) @1',
      complex: ['neglect', 'good'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C5%8D%C5%8D',
      t: 'rou',
    },
    scorn: {
      d: '2024-09-10',
      c: Klass.Verb,
      td: '[emotion.neglect] @0 (scorneth, disdaineth, disrespecteth, negatively neglects) @1',
      complex: ['neglect', 'bad'],
    },
    hate: {
      d: '2024-09-10',
      c: Klass.Verb,
      td: '[emotion] @0 is (hateth, detests) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hataz',
      t: 'xat',
    },
    angry: {
      d: '2024-09-10',
      c: Klass.Verb,
      td: '[emotion] @0 is (angry with, mad at) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wrai%C3%BEaz',
      t: 'vrait',
    },
    expect: {
      d: '2024-09-10',
      c: Klass.Verb,
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/b%C4%ABdan%C4%85',
      td: '[emotion] @0 (expecteth, is not surprised at) @1',
      t: 'bit',
    },
    amaze: {
      d: '2024-08-02',
      c: Klass.Verb,
      td: '[emotion] @0 is (surprised, amazed) at @1',
      complex: ['low', 'expect'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wundr%C4%85',
      t: 'vont',
    },
    bore: {
      d: '2024-09-10',
      c: Klass.Verb,
      td: '[emotion] @0 (is bored with, is far from surprised with) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bur%C5%8Dn%C4%85',
      t: 'bur',
    },
    enjoy: {
      d: '2024-09-10',
      c: Klass.Verb,
      td: '[emotion] @0 enjoys @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/neutan%C4%85',
      t: 'neut',
    },
    trust: {
      d: '2024-08-02',
      c: Klass.Verb,
      td: '[emotion] @0 trusts @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tr%C5%ABw%C4%81n%C4%85',
      t: 'tru',
    },
    doubt: {
      d: '2024-09-10',
      c: Klass.Verb,
      td: '[emotion] @0 doubts @1',
      complex: ['low', 'trust'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tw%C4%ABflaz',
      t: 'tuif',
    },
    pride: {
      d: '2024-09-10',
      c: Klass.Verb,
      td: '[emotion] @0 is proud of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stultaz',
      t: 'sturt',
    },
    shame: {
      d: '2024-09-10',
      c: Klass.Verb,
      td: '[emotion] @0 is ashamed of @1',
      complex: ['low', 'pride'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skam%C5%8D',
      t: 'skam',
    },
    shun: {
      d: '2024-09-27',
      c: Klass.Verb,
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skeuhaz',
      td: '[emotion] @0 is (shuneth, avoideth) @1',
      t: 'skeu',
    },
    want: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[emotion] @0 wants @1',
      complex: ['low', 'shun'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wiljan%C4%85',
      t: 'viu',
    },
    love: {
      d: '2024-09-10',
      c: Klass.Verb,
      td: '[emotion] @0 (loveth, is romantically attracted to) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gernaz',
      t: 'jern',
    },
    randy: {
      d: '2024-09-12',
      c: Klass.Verb,
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gailaz',
      td: '[emotion] @0 is (randy, aroused, lustful, horny, sexual) for @1',
      t: 'caila',
    },
    envy: {
      d: '2024-09-12',
      c: Klass.Verb,
      o: 'https://en.wiktionary.org/wiki/zelo#Latin',
      td: '[emotion.hate] @0 envieth @1',
      t: 'zelo',
    },
    pity: {
      d: '2024-09-10',
      c: Klass.Verb,
      o: 'https://en.wiktionary.org/wiki/ginatha#Old_Dutch',
      td: '[emotion] @0 (pitieth, feel sympathy) @1',
      t: 'nata',
    },

    // facial
    laugh: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[facial-expression] @0 laugheth',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlahjan%C4%85',
      t: 'klak',
    },
    smile: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[facial-expression] @0 smileth',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sm%C4%ABlijan%C4%85',
      t: 'smiu',
    },
    frown: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[facial-expression] @0 frowneth',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skelhaz',
      t: 'skeu',
    },
    weep: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[facial-expression] @0 weepeth @{1:tear}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C5%8Dpijan%C4%85',
      t: 'vof',
    },
    yell: {
      d: '2024-06-14',
      c: Klass.Verb,
      t: 'stun',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stun%C5%8Dn%C4%85',
      td: '@0 (yelleth, crieth, shouteth) @{1:voice}',
    },

    // mental
    know: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[mental] @0 knoweth @{1:fact, idea}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/witan%C4%85',
      t: 'vit',
    },
    learn: {
      d: '2024-08-01',
      c: Klass.Verb,
      td: '[mental] @0 learneth @{1:idea}',
      idiom: ['begin', 'know'],
    },
    forget: {
      d: '2024-08-01',
      c: Klass.Verb,
      td: '[mental] @0 forgeteth @{1:idea}',
      idiom: ['end', 'know'],
    },

    think: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[mental] @0 thinketh @{1:idea}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEankijan%C4%85',
      t: 'dank',
    },
    reason: {
      d: '2024-08-31',
      c: Klass.Verb,
      td: '[mental] @0 hath @{1:reason}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ra%C3%BEj%C7%AD',
      t: 'rat',
    },

    // communicate
    name: {
      d: '2024-07-28',
      c: Klass.Verb,
      td: '[communicate] @0 (meaneth, signifieth, is a name of) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nam%C3%B4',
      t: 'nam',
    },
    speak: {
      d: '2024-06-14',
      c: Klass.Verb,
      td: '[communicate] @0 speaketh in @{1:language, protocol}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tal%C5%8D',
      t: 'tau',
    },
    language: {
      d: '2024-06-14',
      c: Klass.Verb,
      td: '[communicate] @0 language',
      idiom: ['done', 'speak'],
    },
    say: {
      d: '2024-06-14',
      c: Klass.Verb,
      t: 'sak',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sagjan%C4%85',
      td: '[communicate] @0 (sayeth, encodes) @{1:idea} as @{2:expression}',
    },
    understand: {
      d: '2024-06-14',
      c: Klass.Verb,
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hlustiz',
      td: '[communicate] @0 (understandeth, decodeth) @{1:idea} from @{2:expression}',
      complex: ['counter', 'say'],
      t: 'xlust',
    },
    write: {
      d: '2024-06-14',
      c: Klass.Verb,
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wr%C4%ABtan%C4%85',
      td: '[communicate] @0 writeth @{1:idea} to @{2:expression}',
      t: 'vrit',
    },
    read: {
      d: '2024-06-14',
      c: Klass.Verb,
      td: '[communicate] @0 readeth @{1:idea} from @{2:expression}',
      complex: ['counter', 'write'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C4%93dan%C4%85',
      t: 'ret',
    },
    ask: {
      d: '2024-07-28',
      c: Klass.Verb,
      td: '[communicate] @0 asketh @{1:question} to @{2:questionee}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fr%C4%93g%C5%8D',
      t: 'frex',
    },
    answer: {
      d: '2024-07-28',
      c: Klass.Verb,
      td: '[communicate] @0 answereth @{1:answer} to @{2:questioner}',
      complex: ['counter', 'ask'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/swar%C5%8Dn%C4%85',
      t: 'suar',
    },

    // performative
    greet: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[performative] @0 greeteth @{1:person}',
      o: 'https://en.wiktionary.org/wiki/salus#Latin',
      t: 'salo',
    },
    forgive: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[performative] @0 forgiveth @{1:event}',
      o: 'https://en.wiktionary.org/wiki/donare#Latin',
      t: 'dona',
    },
    thank: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[performative] @0 thanketh @{1:event}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEankaz',
      t: 'danka',
    },
    promise: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '[performative] @0 (promiseth, guaranteeth, voweth) @{1:event}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haitan%C4%85',
      t: 'kait',
    },
    command: {
      d: '2024-09-29',
      c: Klass.Verb,
      td: '[performative] @0 (command, request, recommend) @{1:must}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stiurijan%C4%85',
      t: 'stiur',
    },

    // culture
    sing: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[culture] @0 (singeth, playeth) @{1:music, song}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/singwan%C4%85',
      t: 'sink',
    },
    dance: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[culture] @0 danceth @{1:choreography}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/%C3%BEans%C5%8Dn',
      t: 'dans',
    },

    // biochemistry
    rot: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '@0 is rotten',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rut%C4%81n%C4%85',
      t: 'rut',
    },
    fresh: {
      d: '2024-07-24',
      c: Klass.Verb,
      td: '@0 is fresh',
      complex: ['low', 'rot'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/friskaz',
      t: 'frix',
    },

    // reproduce
    beget: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '@0 (beareth, reproducteth, is a parent of) @{1:child}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/burdiz',
      t: 'burt',
    },
    man: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '@0 (is male, produceth sperms)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gum%C3%B4',
      t: 'jum',
    },
    woman: {
      d: '2024-08-19',
      c: Klass.Verb,
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/w%C4%ABb%C4%85',
      td: '@0 (is female, produceth ova)',
      t: 'vif',
    },

    // familly
    sibling: {
      d: '2025-02-08',
      c: Klass.Verb,
      td: '@0 (is a sibiling of, shareth a parent with) @{1}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sibjaz',
      t: 'sif',
      complex: ['done', 'beget', 'same'],
    },
    family: {
      d: '2025-02-08',
      c: Klass.Verb,
      td: '@0 belongeth to the same family with @1',
      etymology:
        'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kunj%C4%85',
      t: 'xun',
    },

    // animal
    animal: {
      d: '2025-03-31',
      c: Klass.Verb,
      td: '[life] @0 is an animal',
      complex: ['live', 'move'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/deuz%C4%85',
      t: 'deur',
    },
    mammal: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[life.animal] @0 is a mammal',
      complex: ['animal', 'suck'],
      o: 'https://en.wiktionary.org/wiki/mammalis',
      t: 'mamali',
    },
    human: {
      d: '2024-02-13',
      c: Klass.Verb,
      t: 'man',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mann-',
      td: '[life.animal.mammal] @0 is a human',
    },
    rat: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[life.animal.mammal] @0 is a (rat, mouse)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/rattaz',
      t: 'rat',
    },
    hare: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[life.animal.mammal] @0 is a (hare, rabbit)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/has%C3%B4',
      t: 'xas',
    },
    cat: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[life.animal.mammal] @0 is a cat',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kattuz',
      t: 'kat',
    },
    fox: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[life.animal.mammal] @0 is a (fox, vixen)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fuhsaz',
      t: 'fox',
    },
    dog: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[life.animal.mammal] @0 is a {dog, bitch}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hundaz',
      t: 'xunt',
    },
    wolf: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[life.animal.mammal] @0 is a wolf',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wulfaz',
      t: 'vouf',
    },
    bear: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[life.animal.mammal] @0 is a bear',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ber%C3%B4',
      t: 'ber',
    },
    sheep: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[life.animal.mammal] @0 is a sheep',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sk%C4%93p%C4%85',
      t: 'skef',
    },
    goat: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[life.animal.mammal] @0 is a goat',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/gaits',
      t: 'cait',
    },
    deer: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[life.animal.mammal] @0 is a deer',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/raih%C3%B4',
      t: 'raik',
    },
    horse: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[life.animal.mammal] @0 is a {horse, stallion, mare}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hruss%C4%85',
      t: 'krus',
    },
    cow: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[life.animal.mammal] @0 is a cow',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/k%C5%ABz',
      t: 'kur',
    },
    pig: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[life.animal.mammal] @0 is a pig',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sw%C4%ABn%C4%85',
      t: 'suin',
    },

    reptile: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[life.animal] @0 is a reptile',
      complex: ['animal', 'crawl'],
      o: 'https://en.wiktionary.org/wiki/reptilis#Latin',
      t: 'reftili',
    },
    snake: {
      d: '2024-07-15',
      c: Klass.Verb,
      td: '[life.animal.reptile] @0 is a snake',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/snegan%C4%85',
      t: 'snek',
    },

    bird: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[life.animal] @0 is a bird',
      complex: ['animal', 'fly'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fuglaz',
      t: 'focl',
    },
    crow: {
      d: '2024-07-15',
      c: Klass.Verb,
      td: '[life.animal.bird] @0 is a (crow, raven)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hrabnaz',
      t: 'krafn',
    },

    amphibia: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[life.animal] @0 is a amphibia',
      complex: ['animal', 'wet'],
      o: 'https://en.wiktionary.org/wiki/amphibius#Latin',
      t: 'vanfibio',
    },
    frog: {
      d: '2024-07-15',
      c: Klass.Verb,
      td: '[life.animal.amphibia] @0 is a frog',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fruskaz',
      t: 'frusk',
    },

    fish: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[life.animal] @0 is a fish',
      complex: ['animal', 'swim'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fiskaz',
      t: 'fisk',
    },

    // plant
    plant: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '[life] @0 is a plant',
      complex: ['live', 'stop'],
      o: 'https://en.wiktionary.org/wiki/planta#Latin',
      t: 'plant',
    },
    tree: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '[life.plant] @0 is a tree',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bagmaz',
      t: 'baum',
    },
    grass: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '[life.plant] @0 is a grass',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bagmaz',
      t: 'cras',
    },

    // body
    body: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '@0 is a body',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hrefaz',
      t: 'kref',
    },
    bone: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[body] @0 is a bone',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bain%C4%85',
      t: 'bain',
    },
    spine: {
      d: '2025-02-06',
      c: Klass.Verb,
      td: '[body] @0 is a spine',
      o: 'https://en.wiktionary.org/wiki/spina#Latin',
      t: 'spina',
    },
    flesh: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[body] @0 is a (flesh, meat, muscle)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/flaiski',
      t: 'flaisk',
    },
    fat: {
      d: '2024-09-16',
      c: Klass.Verb,
      td: '[body] @0 is a fat',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/faitaz',
      t: 'fait',
    },
    skin: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[body] @0 is a (skin, peel)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/skin%C3%BE%C4%85',
      t: 'xin',
    },
    head: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[body] @0 is a head of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/haubud%C4%85',
      t: 'kaut',
    },
    neck: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[body] @0 is a neck of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hnakk%C3%B4',
      t: 'knak',
    },
    shoulder: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[body] @0 is a (shoulder, buttock) of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/skuldru',
      t: 'skut',
    },

    limb: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[body] @0 is a (limb, leg, arm, branch) of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/limuz',
      t: 'lim',
    },
    arm: {
      d: '2024-11-24',
      c: Klass.Verb,
      td: '[body.limb] @0 is an arm',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/armaz',
      t: 'larm',
    },
    leg: {
      d: '2024-11-24',
      c: Klass.Verb,
      td: '[body.limb] @0 is a leg',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lagjaz',
      t: 'lax',
    },

    //extremity: { d: '2024-02-13', c: Klass.Verb, t: 'and', o: 'https://en.wiktionary.org/wiki/reconstruction:proto-germanic/handuz', td: '[body] @0 is a (extremity, hand, foot) of @1' },
    foot: {
      d: '2024-11-24',
      c: Klass.Verb,
      td: '[body.extremity] @0 is a foot',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/f%C5%8Dts',
      t: 'fot',
    },
    hand: {
      d: '2024-11-24',
      c: Klass.Verb,
      td: '[body.extremity] @0 is a hand',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mund%C5%8D',
      t: 'munt',
    },
    trunk: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[body] @0 is a (trunk, torso, stem)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stamniz',
      t: 'stam',
    },
    breast: {
      d: '2024-09-22',
      c: Klass.Verb,
      td: '[body] @0 is a (chest, breast)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brusts',
      t: 'brust',
    },
    belly: {
      d: '2024-09-22',
      c: Klass.Verb,
      td: '[body] @0 is a (chest, breast)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kwe%C3%BEuz',
      t: 'kuet',
    },
    tail: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[body] @0 is a tail',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stertaz',
      t: 'stert',
    },
    hair: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[body] @0 is a (hair, fur)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hazdaz',
      t: 'kart',
    },
    horn: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[body] @0 is a horn',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hurn%C4%85',
      t: 'xurn',
    },
    tooth: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[body] @0 is a (tooth, fang)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tan%C3%BEs',
      t: 'tant',
    },
    nail: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[body] @0 is a (nail, claw)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/naglaz',
      t: 'nacla',
    },

    eye: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[body.face] @0 is (an eye, a visual sensor)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aug%C3%B4',
      t: 'zauc',
    },
    ear: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[body.face] @0 is (an ear, an audial sensor)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/aus%C3%B4',
      t: 'zaus',
    },
    nose: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[body.face] @0 is a nose',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nas%C5%8D',
      t: 'nas',
    },
    mouth: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[body.face] @0 is a mouth',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mun%C3%BEaz',
      t: 'munt',
    },
    lip: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[body.face] @0 is a lip',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lep%C3%B4',
      t: 'lef',
    },
    tongue: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[body.face] @0 is a tongue',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tung%C7%AD',
      t: 'tunx',
    },

    viscera: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[body] @0 is a (viscera, inner organ)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/%C3%BEarmaz',
      t: 'darm',
    },
    lung: {
      d: '2024-09-02',
      c: Klass.Verb,
      td: '[body.viscera] @0 is a lung',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/lung%C3%B4',
      t: 'lunk',
    },
    heart: {
      d: '2024-09-02',
      c: Klass.Verb,
      td: '[body.viscera] @0 is a heart of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hert%C3%B4',
      t: 'xert',
    },
    maw: {
      d: '2024-09-02',
      c: Klass.Verb,
      td: '[body.viscera] @0 is a (maw, stomach) of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mag%C3%B4',
      t: 'mak',
    },
    liver: {
      d: '2024-09-02',
      c: Klass.Verb,
      td: '[body.viscera] @0 is a liver of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/libr%C5%8D',
      t: 'lifr',
    },
    womb: {
      d: '2024-09-22',
      c: Klass.Verb,
      td: '[body.genitalia] @0 is a (prostate, womb) of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wamb%C5%8D',
      t: 'vamp',
    },
    vagina: {
      d: '2024-09-22',
      c: Klass.Verb,
      td: '[body.genitalia] @0 is a vagina of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fu%C3%BEiz',
      t: 'fot',
    },
    penis: {
      d: '2024-09-22',
      c: Klass.Verb,
      td: '[body.genitalia] @0 is a (penis, clitoris) of @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/pinti',
      t: 'pint',
    },

    egg: {
      d: '2024-09-16',
      c: Klass.Verb,
      td: '[body.egg] @0 is an egg',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ajj%C4%85',
      t: 'vai',
    },
    blood: {
      d: '2024-07-29',
      c: Klass.Verb,
      td: '[body.liquid] @0 is blood',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C5%8D%C3%BE%C4%85',
      t: 'blot',
    },
    milk: {
      d: '2024-08-31',
      c: Klass.Verb,
      td: '[body.liquid] @0 is milk',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/meluks',
      t: 'meluk',
    },
    lymph: {
      d: '2024-08-31',
      c: Klass.Verb,
      td: '[body.liquid] @0 is lymph',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dreuzaz',
      t: 'freur',
    },

    flower: {
      d: '2024-09-02',
      c: Klass.Verb,
      td: '[body.plant] @0 is a (flower, bloom, blossom)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/bl%C5%8Dan%C4%85',
      t: 'blou',
    },
    leaf: {
      d: '2024-09-02',
      c: Klass.Verb,
      td: '[body.plant] @0 is a leaf',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/laub%C4%85',
      t: 'lauf',
    },
    root: {
      d: '2024-09-02',
      c: Klass.Verb,
      td: '[body.plant] @0 is a root',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wr%C5%8Dts',
      t: 'vrot',
    },

    // civilization
    person: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '[civilisation] @0 is (a person, an individual, a citizen)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/liudiz',
      t: 'liut',
    },
    nation: {
      d: '2024-08-24',
      c: Klass.Verb,
      td: '[civilisation] @0 is a country',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/mark%C5%8D',
      t: 'marx',
    },
    rule: {
      d: '2024-07-28',
      c: Klass.Verb,
      td: '[civilisation] @0 (ruleth, ordereth, dictateth) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/r%C4%ABks',
      t: 'rix',
    },

    noble: {
      d: '2024-10-01',
      c: Klass.Verb,
      td: '@0 is noble',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/a%C3%BEal%C4%85',
      t: 'zadal',
    },
    humble: {
      d: '2024-10-01',
      c: Klass.Verb,
      td: '@0 is humble',
      complex: ['low', 'noble'],
      o: 'https://en.wiktionary.org/wiki/mj%C3%BAkr#Old_Norse',
      t: 'meuk',
    },

    work: {
      d: '2024-02-13',
      c: Klass.Verb,
      td: '@0 worketh @{1:operation}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/werk%C4%85',
      t: 'verx',
    },
    dwell: {
      d: '2024-12-20',
      c: Klass.Verb,
      td: '@0 dwelleth in @{1:house}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/b%C5%ABan%C4%85',
      t: 'buan',
    },
    use: {
      d: '2024-06-14',
      c: Klass.Verb,
      td: '@0 useth @{1:tool} for @{2:purpose}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/nut%C5%8D',
      t: 'nut',
    },
    help: {
      d: '2024-06-18',
      c: Klass.Verb,
      td: '@0 helpeth @{1:event}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/helpan%C4%85',
      t: 'xeuf',
    },
    harm: {
      d: '2024-08-19',
      c: Klass.Verb,
      td: '@0 (harmeth, hurteth, damageth) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/ska%C3%BE%C3%B4',
      t: 'skat',
    },

    wont: {
      d: '2024-09-01',
      c: Klass.Verb,
      td: '@0 is used to @{1:custom, habit, routine, usual, regular}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wun%C4%81n%C4%85',
      t: 'von',
    },
    lead: {
      d: '2024-09-01',
      c: Klass.Verb,
      t: 'drac',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/dragan%C4%85',
      td: '@0 (leadeth, guideth) @{1:follower}',
    },

    stab: {
      d: '2024-11-24',
      c: Klass.Verb,
      td: '@{0:sharp} stabeth into @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/stikan%C4%85',
      t: 'stik',
    },
    cut: {
      d: '2024-11-21',
      c: Klass.Verb,
      td: '@{0:sharp} cuteth @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sn%C4%AB%C3%BEan%C4%85',
      t: 'snit',
    },

    // human action
    pick: {
      d: '2024-09-09',
      c: Klass.Verb,
      td: '@0 (picketh, hunteth, gathereth, collects) @{1:harvest, prey}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/jakk%C5%8Dn%C4%85',
      t: 'jak',
    },

    kiss: {
      d: '2024-11-23',
      c: Klass.Verb,
      complex: ['lip', 'touch'],
      td: '[body-interaction] @0 kisseth @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/kussaz',
      t: 'kus',
    },
    caress: {
      d: '2024-11-23',
      c: Klass.Verb,
      td: '[body-interaction] @0 carresseth @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/streukan%C4%85',
      t: 'stiuk',
    },
    hug: {
      d: '2024-11-23',
      c: Klass.Verb,
      td: '[body-interaction] @0 hugeth @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fa%C3%BEmaz',
      t: 'fam',
    },
    hit: {
      d: '2024-11-23',
      c: Klass.Verb,
      td: '[body-interaction] @0 (hiteth, kicketh, puncheth) @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hittijan%C4%85',
      t: 'kit',
    },
    kick: {
      d: '2024-11-23',
      c: Klass.Verb,
      td: '[body-interaction] @0 kicketh @1',
      complex: ['hit', 'foot'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/spurnan%C4%85',
      t: 'spurn',
    },
    punch: {
      d: '2024-11-23',
      c: Klass.Verb,
      td: '[body-interaction] @0 puncheth @1',
      complex: ['hit', 'hand'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/slahan%C4%85',
      t: 'slak',
    },

    rope: {
      d: '2025-02-08',
      c: Klass.Verb,
      td: '[artifact] @0 is a {rope, cord, string}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/raipaz',
      t: 'raif',
    },
    knife: {
      d: '2024-07-28',
      c: Klass.Verb,
      td: '[artifact] @{0:sword, knife, blade} cuteth @1',
      complex: ['cut', 'done', 'use'],
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sahs%C4%85',
      t: 'saks',
    },
    scissor: {
      d: '2024-07-28',
      c: Klass.Verb,
      td: '[artifact] @0 is a pair of scissors',
      complex: ['two', 'knife'],
    },
    spear: {
      d: '2024-07-28',
      c: Klass.Verb,
      td: '[artifact] @{0:spear, pin} stingeth @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/speru',
      t: 'sper',
    },
    rod: {
      d: '2024-07-28',
      c: Klass.Verb,
      td: '[artifact] @{0:rod, stuff, wand, club} supporteth @1',
      o: 'https://en.wiktionary.org/wiki/rod',
      t: 'rot',
    },
    dish: {
      d: '2024-12-23',
      c: Klass.Verb,
      td: '[artifact] @{0:dish, bowl, cup, container} containeth @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/hnappaz',
      t: 'knaf',
    },
    fork: {
      d: '2024-12-23',
      c: Klass.Verb,
      td: '[artifact] @{0:fork} stingeth @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Celtic/gabl%C4%81',
      t: 'caf',
    },
    spoon: {
      d: '2024-12-23',
      c: Klass.Verb,
      td: '[artifact] @{0:spoon, scoop} scoopeth @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/sp%C4%93nuz',
      t: 'spen',
    },
    tong: {
      d: '2024-12-23',
      c: Klass.Verb,
      td: '[artifact] @{0:tong, plier, chopstick} grabeth @1',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/tang%C5%8D',
      t: 'tank',
    },
    money: {
      d: '2024-08-25',
      c: Klass.Verb,
      td: '[artifact] @0 is (money, coin, bill)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/fehu',
      t: 'fex',
    },
    ship: {
      d: '2024-10-05',
      c: Klass.Verb,
      td: '[artifact] @0 is a (ship, boat)',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/baitaz',
      t: 'bait',
    },
    bridge: {
      d: '2025-02-08',
      c: Klass.Verb,
      td: '@0 {is a bridge between, connects} of @{1}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/brugj%C7%AD',
      t: 'bruk',
    },

    // misc
    knot: {
      d: '2024-12-23',
      c: Klass.Verb,
      td: '@0 is a (knot, tangle, tie, bond) of @{1}',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/knutt%C3%B4',
      t: 'knut',
    },

    sentence: {
      d: '2024-10-05',
      c: Klass.Verb,
      td: '[grammar] @0 is a sentence',
      o: 'https://en.wiktionary.org/wiki/%CF%86%CF%81%CE%AC%CF%83%CE%B9%CF%82#Ancient_Greek',
      t: 'fras',
    },
    clause: {
      d: '2024-10-05',
      c: Klass.Verb,
      td: '[grammar] @0 is a clause',
      o: 'https://en.wiktionary.org/wiki/clauso#Latin',
      t: 'klaus',
    },
    word: {
      d: '2024-10-05',
      c: Klass.Verb,
      td: '[grammar] @0 is a word',
      o: 'https://en.wiktionary.org/wiki/Reconstruction:Proto-Germanic/wurd%C4%85',
      t: 'vort',
    },

    verb: {
      d: '2024-10-05',
      c: Klass.Verb,
      td: '[grammar] @0 is a verb',
      complex: ['word', 'trunk'],
      o: 'https://en.wiktionary.org/wiki/verbo#Latin',
      t: 'verf',
    },
    case: {
      d: '2024-10-05',
      c: Klass.Verb,
      td: '[grammar] @0 is an case of @1',
      o: 'https://en.wiktionary.org/wiki/casu#Latin',
      t: 'kas',
    },
    nominative: {
      d: '2024-12-23',
      c: Klass.Verb,
      td: '[grammar] @0 is nominative',
      complex: ['verb', 'head'],
    },
    oblique: {
      d: '2024-12-23',
      c: Klass.Verb,
      td: '[grammar] @0 is oblique',
      complex: ['verb', 'arm'],
    },
    accusative: {
      d: '2024-12-23',
      c: Klass.Verb,
      td: '[grammar] @0 is accusative',
      complex: ['verb', 'zero', '_ord', 'arm'],
    },
    dative: {
      d: '2024-12-23',
      c: Klass.Verb,
      td: '[grammar] @0 is dative',
      complex: ['verb', 'one', '_ord', 'arm'],
    },

    continent_eurasia: {
      d: '2025-02-28',
      c: Klass.Verb,
      td: '@0 is the continent eurasia',
      t: 'zeuras',
    },
    continent_africa: {
      d: '2025-02-28',
      c: Klass.Verb,
      td: '@0 is the continent africa',
      etymology: 'https://en.wiktionary.org/wiki/africus#Latin',
      t: 'zafrik',
    },
    continent_north_america: {
      d: '2025-02-28',
      c: Klass.Verb,
      td: '@0 is the continent north america',
      etymology: 'https://en.wiktionary.org/wiki/australis#Latin',
      complex: ['$zamrika', 'north'],
    },
    continent_australia: {
      d: '2025-02-28',
      c: Klass.Verb,
      td: '@0 is the continent australia',
      etymology: 'https://en.wiktionary.org/wiki/australis#Latin',
      t: 'zaustur',
    },
    continent_south_america: {
      d: '2025-02-28',
      c: Klass.Verb,
      td: '@0 is the continent south america',
      etymology: 'https://en.wiktionary.org/wiki/australis#Latin',
      complex: ['$zamrika', 'done', 'north'],
    },

    // country
    ...Object.fromEntries(
      [
        [
          'us',
          'the united states',
          '2024-08-25',
          //'amrik',
          //'https://en.wiktionary.org/wiki/America#Latin',
        ],
        [
          'cn',
          'china',
          '2024-08-25',
          //'zjugcok',
          //'https://en.wiktionary.org/wiki/%E4%B8%AD%E5%9C%8B',
        ],
        [
          'de',
          'germany',
          '2024-08-25',
          //'devdisk',
          //'https://en.wiktionary.org/wiki/Reconstruction:Proto-West_Germanic/%C3%BEiudisk',
        ],
        [
          'jp',
          'japan',
          '2024-08-25',
          //'nitfon',
          //'https://en.wiktionary.org/wiki/%E6%97%A5%E6%9C%AC',
        ],
        [
          'in',
          'india',
          '2024-11-22',
          //'varat',
          //'https://en.wiktionary.org/wiki/%E0%A4%AD%E0%A4%BE%E0%A4%B0%E0%A4%A4#Sanskrit',
        ],
        [
          'gb',
          'the united kingdom',
          '2024-08-25',
          //'britan',
          //'https://en.wiktionary.org/wiki/Britannia#Latin',
        ],
        [
          'fr',
          'france',
          '2024-08-25',
          //'fragk',
          //'https://en.wiktionary.org/wiki/Francia#Latin',
        ],
        [
          'it',
          'italy',
          '2024-11-22',
          //'ital',
          //'https://en.wiktionary.org/wiki/Italia#Latin',
        ],
        [
          'ca',
          'canada',
          '2024-11-22',
          //'kanat',
          //'https://en.wiktionary.org/wiki/kanata#Laurentian',
        ],
        [
          'br',
          'brazil',
          '2024-11-22',
          //'brasil',
          //'https://en.wiktionary.org/wiki/Brasil#Portuguese',
        ],
        [
          'ru',
          'russia',
          '2025-02-08',
          //'rusi',
          //'https://en.wiktionary.org/wiki/%D0%A0%D1%83%D1%81%D1%8C#Old_East_Slavic',
        ],
        ['tw', 'taiwan', '2025-02-28'],
      ].map(([iso, name, date]) => [
        `nation_${iso.toLowerCase()}`,
        {
          date,
          c: Klass.Verb,
          td: `[country] @0 is ${name} (${iso})`,
          o: 'ISO 3166-1 alpha-2',
          //idiom: ['nation', 'called', '$' + fromAcronym(iso)],
          complex: ['nation', '$' + fromAcronym(iso)],
        },
      ])
    ),

    // language
    ...Object.fromEntries(
      [
        ['eng', '2024-08-31', 'english'],
        ['cmn', '2024-08-31', 'mandarin'],
        ['hin', '2024-08-31', 'hindustani (hindi, urdu) '],
        ['spa', '2024-08-31', 'spanish'],
        ['ara', '2024-08-31', 'arabic'],
        ['fra', '2024-08-31', 'french'],
        ['rus', '2024-08-31', 'russian'],
        ['deu', '2024-08-31', 'german'],
        ['jpn', '2024-08-31', 'japanese'],
      ].map(([iso, date, adjective]) => [
        `language_${iso}`,
        {
          date,
          c: Klass.Verb,
          complex: ['done', 'speak', '$' + fromAcronym(iso)],
          td: `[language] @0 is ${adjective} language (${iso})`,
        },
      ])
    ),
  }).flatMap(([k, { t: token, o, complex, idiom, ...vRest }]) => {
    const r = [];

    if (token)
      r.push([k, { formation: Formation.Simplex, o, t: token, ...vRest }]);
    if (complex)
      r.push([
        k + '*',
        {
          ...vRest,
          ...(token ? { td: `=${k}` } : {}),
          formation: Formation.Complex,
          o: complex.join('+'),
          complex,
        },
      ]);
    else if (idiom)
      r.push([
        k + '#',
        {
          ...vRest,
          ...(token ? { td: `=${token}` } : {}),
          formation: Formation.Idiom,
          o: idiom.join('␣'),
          idiom,
        },
      ]);

    return r;
  })
);

const toBetokeners = (ks: string[]) =>
  ks.map((k) =>
    k.startsWith('$')
      ? k.substring(1)
      : dicPre.get(k)?.t ?? dicPre.get(k + '*')?.t ?? dicPre.get(k + '#')?.t
  );

// generate
for (let i = 0; i < dicPre.size + 1; i++)
  for (const [k, v] of dicPre.entries())
    if ('complex' in v) {
      if (v.complex.some((it) => !dicPre.has(k))) dicPre.delete(k);

      const tokens = toBetokeners(v.complex);

      if (tokens.every((it) => typeof it === 'string')) {
        delete v.complex;
        dicPre.set(k, {
          ...v,
          t: tokens
            .join('-')
            .replace(/(.)-\1/g, (_, it) => it)
            .replace(/(?<=[^aiueo])-j(?=[aueo])/g, 'i')
            .replace(/(?<=[^aiueo])-v(?=[aieo])/g, 'u')
            .replace(/-/g, ''),
        });
      }
    } else if ('idiom' in v) {
      if (v.idiom.some((it) => !dicPre.has(k))) dicPre.delete(k);

      const tokens = toBetokeners(v.idiom);

      if (tokens.every((it) => typeof it === 'string')) {
        delete v.idiom;
        dicPre.set(k, {
          ...v,
          t: tokens.join(' '),
        });
      }
    }

// delete failed
for (const k of dicPre.keys())
  if (!dicPre.get(k).t) {
    dicPre.delete(k);
    console.warn(`.${k} deleted`);
  }

interface Value {
  d: string;
  c: string;
  td: string;
  formation: Formation;
  o: string;
  t: string;
}

const dic = dicPre as Map<string, Value>;

// check homograph
const keys = [...dic.keys()];
for (let i = 0; i < dic.size; i++)
  for (let j = i + 1; j < dic.size; j++) {
    const k0: string = keys[i];
    const k1: string = keys[j];

    if (dic.get(k0)?.t === dic.get(k1)?.t)
      console.error(`homograph: [${k0}, ${k1}] = ${dic.get(k0)?.t}`);
  }

for (const [k, { t: token, formation }] of dic.entries()) {
  if (formation === Formation.Simplex)
    if (7 <= token.length)
      console.error(`invalid: long simplex: .${k} = ${token}`);

  if (formation !== Formation.Idiom) {
    const invalidity = invalid(token);
    if (invalidity) console.error(`invalid: ${invalidity}: .${k} = ${token}`);
  }
}

export const translate = (code: string) =>
  code.replace(
    /[a-z_]+\{?|[\[\]\}\*\#]|\,/g,
    (k) => dic.get(k)?.t ?? dic.get(k + '*')?.t ?? dic.get(k + '#')?.t ?? k
  );

export default dic;
