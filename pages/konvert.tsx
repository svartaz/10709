import Layout from '@/components/layout';
import { translate } from '@/lib/dictionary'
import { CSSProperties, useState } from 'react';

const style: CSSProperties = {
  width: '100%',
  height: '8em',
  resize: 'none',
  outline: 'none',
};

export default () => {
  const defaultValue = 'SPEAK THOU _AUTONYM';
  const [out, setOut] = useState(translate(defaultValue));

  return <Layout>
    <textarea style={style} className='code' defaultValue={defaultValue} onChange={event => setOut(translate(event.target.value))} />
    <textarea style={{ ...style, fontFamily: 'inherit' }} className='language' value={out} />
  </Layout>
};
