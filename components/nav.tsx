import Link from "next/link";
import dynamic from 'next/dynamic'
import { usePathname } from "next/navigation";
import { name } from "@/app/dict";

const Clock = dynamic(() => import('@/components/clock'), { ssr: false });

export default () => {
  const path = usePathname();

  return <nav>
    <Clock />

    <h1><Link href='/' style={{ textDecoration: 'none', color: 'inherit' }}>{name}</Link></h1>

    <ul className='links'>
      {
        [
          ['/phonology', '音韻'],
          ['/syntaks', '統語'],
          ['/leksikon', '詞彙'],
          ['/konvert', '變換'],
        ].map(([href, text], i) =>
          <li key={i} className={path == href ? 'active' : ''}><Link href={href}>{text}</Link></li>
        )
      }
    </ul>

    <div className='js-toc'></div>
  </nav>
};