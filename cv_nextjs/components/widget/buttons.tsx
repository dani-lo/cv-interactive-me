import React, { ElementType, useLayoutEffect, useRef } from "react"

type WrappedComponent = {

}

const btnPlusPathPoints = `455,212.5 242.5,212.5 242.5,0 212.5,0 212.5,212.5 0,212.5 0,242.5 212.5,242.5 212.5,455 242.5,455 242.5,242.5 
455,242.5`

const pointsStringResizer = (ratio: number, pathString: string) => {

    let bufferArray: string[] = []
    let newPath = ""

    for (const letter of pathString) {

        const bufferArrayLastIndex = bufferArray.length - 1
        const lastNum = parseFloat(bufferArray[bufferArrayLastIndex])

        if ([" ", ","].includes(letter)) {

            bufferArray[bufferArrayLastIndex] = `${ lastNum / ratio }`

            newPath = `${ newPath }${ bufferArray.join(',') }${ letter }`

            bufferArray = []
        } else {
            bufferArray[bufferArrayLastIndex] = `${ bufferArray[bufferArrayLastIndex] }${ letter }`
        }
    }

    return newPath
}

export const BtnPlus = React.memo(({ ratio }: { ratio: number }) => {

    const ref = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        if (ref.current !== null) {
            const box = [ref.current.offsetWidth, ref.current.offsetHeight]

            console.log(box)
        }
    })

    return <div><svg 
        fill="#000000" 
        height="20px" 
        width="20px" 
        viewBox="0 0 20 20">
            <polygon 
                points={ btnPlusPathPoints  }
            />
     </svg>
     </div>
}, (prev, curr) => prev.ratio == curr.ratio)