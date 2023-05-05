import Link from "next/link";

export default function Button({ children, href, action }) {
  return (
    <>
      {href ? (
        <Link
          className="bg-midnight text-white relative py-3 px-5 inline-block border border-gray-500 after:content-[''] after:w-0 after:border-t-[8px] after:border-t-transparent after:border-r-[8px] after:border-r-white after:h-0 after:absolute after:bottom-1 after:right-1"
          href={href}
          scroll={false}
        >
          {children}
        </Link>
      ) : (
        <button
          className="bg-midnight text-white relative py-3 px-5 inline-block border border-gray-500 after:content-[''] after:w-0 after:border-t-[8px] after:border-t-transparent after:border-r-[8px] after:border-r-white after:h-0 after:absolute after:bottom-1 after:right-1"
          onClick={action}
        >
          {children}
        </button>
      )}
    </>
  );
}
