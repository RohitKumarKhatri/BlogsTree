import BlogsTreeBanner from '../html/BlogsTreeBanner';
import Logo from '../html/Logo';

export default function LogoBanner() {
  return (
    <div className="flex items-center justify-self-start">
      <Logo />
      <BlogsTreeBanner />
    </div>
  );
}
