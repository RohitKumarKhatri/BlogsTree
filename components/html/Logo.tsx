import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo/logo.png';

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src={logo}
        alt="BlogsTree Logo"
        width={100}
        height={100}
        className="mx-auto"
      />
    </Link>
  );
}
