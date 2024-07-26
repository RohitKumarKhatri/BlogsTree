import Link from 'next/link';

export default function Button({
  href,
  children,
}: Readonly<{ href: string; children: React.ReactNode }>) {
  return (
    <button className="bg-green-500 rounded-full px-2 md:px-5 py-2 text-nowrap">
      <Link href={href}>{children}</Link>
    </button>
  );
}
