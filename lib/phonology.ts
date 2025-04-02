import { replaceEach } from './common';

export const glide = (word) =>
  replaceEach(word, [
    [/^j/g, 'J'],
    [/^v/g, 'V'],
    [/(?<=[aiueo])jj(?=[aiueo])/g, 'ĭJ'],
    [/(?<=[aiueo])jv(?=[aiueo])/g, 'ĭV'],
    [/(?<=[aiueo])vj(?=[aiueo])/g, 'wJ'],
    [/(?<=[aiueo])vv(?=[aiueo])/g, 'wV'],
    [/(?<=^|[aiueo])j(?=[waiueo])/g, 'J'],
    [/(?<=^|[aiueo])v(?=[ĭaiueo])/g, 'V'],

    [/j/g, 'ĭ'],
    [/v/g, 'w'],
    [/J/g, 'j'],
    [/V/g, 'v'],
  ]);

export const toIpa = (s: string): string =>
  s.replace(/[a-z]+/g, (it) =>
    replaceEach(it, [
      [/.+/, (it) => glide(it).toUpperCase()],

      [/(?<=[ĬWAIUEO])N(?![ĬWAIUEO])/g, '\u0303'],
      [/Ĭ/g, 'j'],
      [/W/g, 'w'],
      [/G/g, 'ŋ'],
      [/C/g, 'g'],
      [/X/g, 'ɕ'],
      [/J/g, 'ʑ'],
      [/R/g, 'ɾ'],

      [/.+/, (it) => it.toLowerCase().normalize('NFKC')],
    ])
  );

const checkSonority = (word: string) =>
  word.split(/[iueoaw]+/g).every((consonants, i, self) => {
    if (i === 0) return /^[xsfjzv]?[cdbktp]?[xsfjzv]?[gnm]?r?$/.test(consonants);
    else if (i === self.length - 1) return /^r?[gnm]?[jzv]?[xsf]?[cdb]?[ktp]?[xsf]?[jzv]?$/.test(consonants);
    else return /^r?[gnm]?[xsfjzv]?[cdbktp]?[jzvxsf]?[gnm]?r?$/.test(consonants);
  });

export const invalid = (word: string): string | null => {
  for (const [item, pattern] of [
    ['empty', /^$/],
    ['repeat', /(.)\1/],
    ['non-alphabet', /[^gnmcdbktpxsfjzvrlĭwaiueo]/],
    ['initial', /^[aiueo]/],
    ['final', /[^nmktxsfrĭwaiueo]$/],
    ['coda', /l(?![ĭwaiueo])/],

    // vowel or consonant
    ['2 vowels', /[aiueo]{2}/],
    ['3 consonants', /[^ĭwaiueo]{3}/],

    // place
    ['velar front', /[gck]i/],
    ['palatal front', /[xj]ĭ/],
    ['labial back', /[mbpfv]w/],

    ['velar plosive nasal', /[ck]g/],
    ['dental plosive nasal', /[dt]n/],
    ['labial plosive nasal', /[bp]m/],

    ['palatal glide', /(?<![xj])iw/],
    ['labial glide', /(?<![mbpfv])uĭ/],

    // manner
    ['sibilant', /xs|sx/],
    ['nasal', /[gnm]{2}/],
    ['plosive +v', /[cdb][gnmcdbktpxsfjzv]/],
    ['plosive -v', /[ktp][cdbktpjzv]/],
    ['fricative -v', /[xsf][cdbjzv]/],
    ['fricative +v', /[jzv][cdbktpxsfjzv]/],
  ] as [string, RegExp][])
    if (pattern.test(glide(word))) return item;

  //if (!checkSonority(phonetic)) return 'sonority';

  return null;
};
