'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PrefetchedLink({ href, children, ...props }) {
  const router = useRouter();
  
  const handleMouseEnter = () => {
    router.prefetch(href);
  };

  return (
    <Link href={href} {...props} onMouseEnter={handleMouseEnter}>
      {children}
    </Link>
  );
}