import LogoBanner from './LogoBanner';
import NavBarMenuItems from './NavBarMenuItems';

export default function Navbar() {
  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <LogoBanner />
        <NavBarMenuItems />
      </div>
    </nav>
  );
}
