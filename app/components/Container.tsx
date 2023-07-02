import React from 'react'

interface ContainerProps {
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className='
        justify-center
        items-center
        flex
        overflow-x-hidden 
        overflow-y-auto
        h-full
        bg-gray-100
    '>
        <div className='
            h-full
            md:h-auto
            w-full
            md:w-[590px]
            p-10
            bg-white
            md:rounded-lg
            border-[1px]
        '>
            {children}
        </div>
    </div>
  )
}

export default Container