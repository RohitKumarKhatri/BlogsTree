import Link from 'next/link';

export default function Button({
  href,
  children,
}: Readonly<{ href: string; children: React.ReactNode }>) {
  return (
    <button className=" text-black font-medium bg-gradient-to-r from-blue-300 via-purple-400  to-purple-500 rounded-full px-2 md:px-5 py-2 text-nowrap">
      <Link href={href}>{children}</Link>
    </button>
  );
}
