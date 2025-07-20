"use client"

import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const MobileImageOptimization = ({ src, alt, className }: { src: string, alt: string, className: string }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <div ref={ref} className={className}>
      {inView ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      ) : (
        <div className="w-full h-full bg-gray-200 animate-pulse" />
      )}
    </div>
  )
}

export default MobileImageOptimization;
