'use client';

import Image from 'next/image'

interface AvatarProps {
  src?: string | null
}

const Avatar: React.FC<AvatarProps> = ({
  src
}) => {
  return (
    <Image
        className="rounded-full"
        height={100}
        width={100}
        alt='Avatar'
        src={src || "/default_pfp.png"}
    />
  )
}

export default Avatar