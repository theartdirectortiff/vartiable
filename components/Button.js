import Link from "next/link";

export default function Button({ children, href, action, ...props }) {
  return (
    <>
      {href ? (
        <Link
          className="px-4 py-1 dark:bg-white bg-midnight dark:text-midnight text-white rounded-full flex gap-1 items-center hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
          href={href}
          scroll={false}
          {...props}
        >
          {children}
        </Link>
      ) : (
        <button
          className="px-4 py-1 dark:bg-white bg-midnight dark:text-midnight text-white rounded-full flex gap-1 items-center hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
          onClick={action}
          {...props}
        >
          {children}
        </button>
      )}
    </>
  );
}
