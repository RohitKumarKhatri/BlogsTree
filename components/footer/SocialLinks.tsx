import { FaFacebookF } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
export default function SocialLinks() {
  return (
    <div className="flex justify-center space-x-4 mt-4 content-start">
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-gray-400">
        <FaXTwitter className="w-6 h-6" />
      </a>
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-gray-400">
        <FaFacebookF className="w-6 h-6 text-blue-600" />
      </a>
    </div>
  );
}
