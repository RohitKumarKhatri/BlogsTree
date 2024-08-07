import LogoBanner from './LogoBanner';
import NavBarMenuItems from './NavBarMenuItems';
import NavBarSessionButtons from './NavbarSessionButtons';

export default function Navbar() {
  return (
    <nav className="p-4 mt-10">
      <div className="container mx-auto flex justify-between items-center">
        <LogoBanner />
        <NavBarMenuItems />
        <NavBarSessionButtons />
      </div>{' '}
    </nav>
  );
}
