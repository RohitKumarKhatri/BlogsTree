import ThemeSelector from './ThemeSelector';
import CopyRightsNote from './CopyRightsNote';
import SocialLinks from './SocialLinks';

const Footer: React.FC = () => {
  return (
    <footer className="text-center p-4 md:p-6 min-w-sm">
      <div className="flex flex-col md:flex-row gap-2 mx-auto">
        <SocialLinks />
        <CopyRightsNote />
        <ThemeSelector />
      </div>
    </footer>
  );
};

export default Footer;
