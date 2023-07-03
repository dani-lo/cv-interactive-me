import { useState, useEffect } from 'react'

export const useFrontendClassname = () => {
    const [fecname, setFecname] = useState('no-pre-render')
    
    // @ts-ignore
    let showUI   = null

    useEffect(() => {

        showUI = setTimeout(() => {
            setFecname('')
        }, 1300)

       return () => {
        // @ts-ignore
        if (showUI !== null) {
            // @ts-ignore
            clearTimeout(showUI)
        }
       }
    }, [])

    return fecname
}