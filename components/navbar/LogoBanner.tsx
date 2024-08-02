import BlogsTreeBanner from './BlogsTreeBanner';
import Logo from '../Logo';

export default function LogoBanner() {
  return (
    <div className="flex items-center justify-self-start">
      <Logo />
      <BlogsTreeBanner />
    </div>
  );
}
