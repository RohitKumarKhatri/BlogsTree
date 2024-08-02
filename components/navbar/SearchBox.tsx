import { FiSearch } from 'react-icons/fi';
import Input from '../Input';

export default function SearchBox() {
  return (
    <div className="flex items-center p-2 border-none ml-2 outline-none  border-gray-200 rounded-lg min-w-32 bg-light-input-background dark:bg-dark-input-background max-w-xl">
      <FiSearch className="h-5 w-5 text-gray-400" />
      <Input classes="w-3/5" placeholder="Search" />
    </div>
  );
}
