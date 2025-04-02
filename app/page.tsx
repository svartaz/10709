import { CSSProperties } from 'react';
import dic, { Formation, translate } from '../lib/lexicology';
import { invalid, toIpa } from '../lib/phonology';
import { replaceEach } from '../lib/common';
import orthography from '../lib/orthography';
import { Letter } from '../lib/letter';
import { toDayString } from '../lib/date';
import { name } from '../lib/dictRaw';

const Target = ({ children }: { children: string }) =>
  true ? (
    <span className="target" title={children}>
      {orthography(children)}
    </span>
  ) : (
    <TargetLetter>{children}</TargetLetter>
  );

const TargetLetter = (props: { children: string; title?: string; style?: CSSProperties }) => (
  <Letter title={props.children} className="target" {...props}>
    {replaceEach(props.children.toLowerCase(), [
      [/[ktcdgnlriueoa]/g, (it) => it.toLowerCase()],
      [/h/g, 'x'],
      [/x/g, 'S'],
      [/j/g, 'Z'],
    ])}
  </Letter>
);

const Ipa = ({ children }: { children: string }) => <span className="ipa">{toIpa(children)}</span>;

const term = {
  style: {
    paddingInline: '.5rex',
    backgroundColor: '#0002',
    borderRadius: '.5rex',
  } as CSSProperties,
};

export default () => (
  <>
    <h1 style={{ textAlign: 'center' }}>
      <Target>{name}</Target>
    </h1>

    <div
      style={{
        inlineSize: 'fit-content',
        marginInline: 'auto',
      }}
    >
      <Target>{translate('language done make der called sumi')}</Target>
    </div>

    <h2>phonology</h2>
    <table className="c">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>velar</th>
          <th>palatal</th>
          <th>dental</th>
          <th>labial</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th colSpan={2}>nasal</th>
          <td className="target">
            g<sub className="ipa">{toIpa('g').substring(0, 1)}</sub>
          </td>
          <td></td>
          <td className="target">n</td>
          <td className="target">m</td>
        </tr>
        <tr>
          <th rowSpan={2}>plosive</th>
          <th>voiced</th>
          <td className="target">
            c<sub className="ipa">{toIpa('c').substring(0, 1)}</sub>
          </td>
          <td></td>
          <td className="target">d</td>
          <td className="target">b</td>
        </tr>
        <tr>
          <th rowSpan={2}>unvoiced</th>
          <td className="target">k</td>
          <td></td>
          <td className="target">t</td>
          <td className="target">p</td>
        </tr>
        <tr>
          <th rowSpan={2}>fricative</th>
          <td></td>
          <td className="target">
            x<sub className="ipa">{toIpa('x').substring(0, 1)}</sub>
          </td>
          <td className="target">s</td>
          <td className="target">f </td>
        </tr>
        <tr>
          <th>voiced</th>
          <td></td>
          <td className="target">
            j<sub className="ipa">{toIpa('ja').substring(0, 1)}</sub>
          </td>
          <td className="target">z</td>
          <td className="target">v</td>
        </tr>
        <tr>
          <th colSpan={2}>approcsimant</th>
          <td></td>
          <td className="target">j</td>
          <td className="target">
            r<sub className="ipa">{toIpa('r')}</sub> l
          </td>
          <td className="target">
            v<sub className="ipa">{toIpa('kva').substring(1, 2)}</sub>
          </td>
        </tr>
        <tr>
          <th rowSpan={2}>vowel</th>
          <th>non-mid</th>
          <td className="target">a</td>
          <td className="target">i</td>
          <td></td>
          <td className="target">u</td>
        </tr>
        <tr>
          <th>mid</th>
          <td></td>
          <td className="target">e</td>
          <td></td>
          <td className="target">o</td>
        </tr>
      </tbody>
    </table>

    <ul>
      <li>
        {'{'}
        <Target>j, v</Target>
        {'}'} is
      </li>
      <ul>
        <li>a fricative between vowels.</li>
        <li>an approcsimant otherwise.</li>
      </ul>
      <li>a word can't</li>
      <ul>
        <li>begin with a vowel.</li>
        <ul>
          <li>
            <Target>z</Target> is put before a loan word that begineth with a vowel.
          </li>
        </ul>
        <li>end with a voiced obstruent.</li>
      </ul>
    </ul>

    <h2>sentences</h2>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {[
        [
          ['my name is sumi', 'i called $sumi'],
          ['i am speaking a language which i am making', 'i speak den done make der i'],

          ['(someone) giveth (something) (to someone)', 'give'],
          ['(someone) giveth water (to someone)', 'give den water'],
          ['(someone) giveth water to a cat', 'give den water to cat'],
          ['a person giveth water to a cat', 'person give den water to cat'],
          ['a tall person giveth fresh water to a black cat', 'person long give den water fresh to cat black'],
          ['a person giving fresh water to a black cat is tall', 'person give den water fresh to cat black then long'],
          ['water given is fresh', 'water done give fresh'],
          ['water given by a person is fresh', 'water done give der person then fresh'],
          ['? water is given by a fresh person', 'water done give der person fresh'],
          ['water given to a cat by a person is fresh', 'water done give der person to cat then fresh'],
          ['a cat given water is black', 'cat done to give den water then black'],
          ['a cat given water by a person is black', 'cat done to give der person den water then fresh'],

          ['i am a cat', 'i cat'],
          ['i am not a cat', 'i not cat'],

          ['no person is loved by every person', 'zero person done love der each person'],
          ['for no person 𝑜, for any person 𝑠, 𝑠 loves 𝑜', 'zero person _0 each person _1 _1 love der _0'],
        ].map(([en, code]) => (
          <table className="sample">
            <tbody>
              <tr>
                <td>
                  {code.split(/(?<=\s+)|(?=\s+)/g).map((chunk, i, self) => {
                    if (chunk.startsWith('$')) return <span className="target">{chunk.slice(1)}</span>;
                    else if (dic.has(chunk)) {
                      const token = dic.get(chunk)?.t;
                      const orth = orthography(token);
                      const ipa = toIpa(token);

                      return orth === ipa ? (
                        <ruby>
                          <span className="target">{orth}</span>
                          <rt className="code">{chunk}</rt>
                        </ruby>
                      ) : (
                        <ruby>
                          <ruby>
                            <span className="target">{orth}</span>
                            <rt className="ipa">{ipa}</rt>
                          </ruby>
                          <rt className="code">{chunk}</rt>
                        </ruby>
                      );
                    } else return chunk;
                  })}
                </td>
                <td>{en}</td>
              </tr>
            </tbody>
          </table>
        )),
      ]}
    </div>

    <h2>words</h2>

    {(() => {
      const dateToKeys = {};
      for (const k of dic.keys()) {
        const { d: date } = dic.get(k);
        if (date in dateToKeys) dateToKeys[date].push(k);
        else dateToKeys[date] = [k];
      }

      let sum = 0;
      for (const date in dateToKeys) {
        dateToKeys[date] = dateToKeys[date].filter((k, i, self) => (!k.endsWith('*') || !self.includes(k.replace(/\*$/, ''))) && (!k.endsWith('#') || !self.includes(k.replace(/\#$/, ''))));
        sum += dateToKeys[date].length;
      }

      const date0 = Object.keys(dateToKeys).reduce((acc, d) => (d < acc ? d : acc), '9999-99-99');

      let acc = 0;
      return (
        <table className="progress">
          <tbody>
            {Object.keys(dateToKeys)
              .sort()
              .map((date) => {
                acc += dateToKeys[date].length;
                const percent = (acc / sum) * 100;
                return (
                  <tr>
                    <th style={{ textWrap: 'nowrap' }}>{toDayString(new Date(date))}</th>
                    <td>{(new Date(date).getTime() - new Date(date0).getTime()) / 1000 / 60 / 60 / 24}</td>
                    <td
                      style={{
                        background: `linear-gradient(to right, #0001 0%, #0001 ${percent}%, transparent ${percent}%, transparent 100%)`,
                      }}
                      className="code"
                    >
                      {dateToKeys[date].join(' ')}
                    </td>
                    <td style={{ textWrap: 'nowrap' }}>+{dateToKeys[date].length}</td>
                    <td style={{ textWrap: 'nowrap' }}>{acc}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      );
    })()}

    <table className="dictionary">
      <thead className="h">
        <tr>
          <th></th>
          <th>token</th>
          <th>sound</th>
          <th>class</th>
          <th>tokened</th>
          <th>origin</th>
          <th>!</th>
        </tr>
      </thead>
      <tbody>
        {[...dic.entries()].map(([key, { t: token, td: tokened, c: klass, o: origin, formation }]) => (
          <tr id={'entry-' + key} style={token.split(' ').some(invalid) ? { backgroundColor: 'lightcoral' } : {}}>
            <td className="code">{key}</td>
            <td>
              <Target>{token}</Target>
            </td>
            <td>
              <Ipa>{token}</Ipa>
            </td>
            <td>{klass}</td>
            {tokened.startsWith('=') ? (
              <td>
                =
                <a href={'#entry-' + key.substring(1)}>
                  <Target>{translate(tokened.substring(1))}</Target>
                </a>
              </td>
            ) : (
              <td>
                {tokened.split(/(?<=@\d+|@\{.+?\})|(?=@\d+|@\{.+?\})/g).map((s: string) =>
                  /@\d+|@\{.+?\}/.test(s) ? (
                    <span {...term}>
                      {replaceEach(s, [
                        [/^@\{?/, ''],
                        [/\}$/, ''],
                      ])}
                    </span>
                  ) : (
                    s
                  )
                )}{' '}
              </td>
            )}
            <td style={{ fontSize: 'xx-small' }} className={formation === Formation.Simplex ? '' : 'code'}>
              {origin?.startsWith('https://') ? <a href={origin}>{decodeURI(origin).replace(/^https?:\/\//, '')}</a> : origin}
            </td>
            <td style={{ fontSize: 'xx-small' }}>{token.split(' ').map(invalid)}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <h2>letter</h2>

    <div
      style={{
        inlineSize: 'fit-content',
        marginInline: 'auto',
      }}
    >
      <Letter>{['K k T t P p', 'C c D d B b', 'X x S s F f', 'H h Z z V v', 'G g N n M m', '      j r    w', '      i I u U', '      e E o O', 'A a'].join('\n')}</Letter>
    </div>
  </>
);
