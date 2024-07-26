export default function Input({
  classes,
  placeholder = 'Enter value',
}: Readonly<{ classes?: string; placeholder?: string }>) {
  const classNames = `$classes bg-transparent border-none ml-2 outline-none text-light-input-text border-gray-200 rounded-lg dark:text-dark-input-text`;

  return <input className={classNames} type="text" placeholder={placeholder} />;
}
