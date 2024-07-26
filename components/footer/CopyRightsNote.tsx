export default function CopyRightsNote() {
  return (
    <div className="container mx-auto flex justify-center items-center max-w-7xl content-center text-center">
      <div>
        <p className="text-sm md:text-base">
          © {new Date().getFullYear()} Blogs Tree. All rights reserved.
        </p>
        <a
          href="/privacy-policy"
          className="text-sm md:text-base hover:text-gray-400">
          Privacy Policy
        </a>
      </div>
    </div>
  );
}
