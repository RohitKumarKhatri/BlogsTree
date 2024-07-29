import Link from 'next/link';
import GetStartedButton from '../html/GetStartedButton';

export default function LoginAndSignup() {
  return (
    <div className="flex rounded-full w-52 justify-between items-center">
      <div className="ps-4">
        <Link
          href="/signin"
          className="hidden md:block text-nowrap font-semibold">
          Sign In
        </Link>
      </div>
      <div className="">
        <GetStartedButton />
      </div>
    </div>
  );
}
