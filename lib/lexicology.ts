import dictRaw, { Klass } from './dictRaw';
import { invalid } from './phonology';

export enum Formation {
  Simplex,
  Complex,
  Idiom,
}

export interface ValuePre {
  d: string;
  c: Klass;
  td: string;
  formation: Formation;
  o: string;
  t?: string;
  complex?: string[];
  idiom?: string[];
}

const dicPre = new Map<string, ValuePre>(
  Object.entries(dictRaw).flatMap(([k, { t: token, o, complex, idiom, ...vRest }]) => {
    const r = [];

    if (token) r.push([k, { formation: Formation.Simplex, o, t: token, ...vRest }]);
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

const toTokens = (ks: string[]) => ks.map((k) => (k.startsWith('$') ? k.substring(1) : dicPre.get(k)?.t ?? dicPre.get(k + '*')?.t ?? dicPre.get(k + '#')?.t));

const join = (tokens) => tokens.slice(1).reduce((joined, token) => (!invalid(joined) && invalid(joined + token) && !invalid(joined + 'a' + token) ? joined + 'a' + token : joined + token), tokens[0]);

// generate
for (let i = 0; i < dicPre.size + 1; i++)
  for (const [k, v] of dicPre.entries())
    if ('complex' in v) {
      if (v.complex.some((it) => !dicPre.has(k))) dicPre.delete(k);

      const tokens = toTokens(v.complex);

      if (tokens.every((it) => typeof it === 'string')) {
        delete v.complex;
        dicPre.set(k, {
          ...v,
          t: join(tokens),
        });
      }
    } else if ('idiom' in v) {
      if (v.idiom.some((it) => !dicPre.has(k))) dicPre.delete(k);

      const tokens = toTokens(v.idiom);

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

    if (dic.get(k0)?.t === dic.get(k1)?.t) console.error(`homograph: [${k0}, ${k1}] = ${dic.get(k0)?.t}`);
  }

for (const [k, { t: token, formation }] of dic.entries()) {
  if (formation === Formation.Simplex) if (7 <= token.length) console.error(`invalid: long simplex: .${k} = ${token}`);

  if (formation !== Formation.Idiom) {
    const invalidity = invalid(token);
    if (invalidity) console.error(`invalid: ${invalidity}: .${k} = ${token}`);
  }
}

export const translate = (code: string) => code.replace(/[a-z_]+\{?|[\[\]\}\*\#]|\,/g, (k) => dic.get(k)?.t ?? dic.get(k + '*')?.t ?? dic.get(k + '#')?.t ?? k);

export default dic;
