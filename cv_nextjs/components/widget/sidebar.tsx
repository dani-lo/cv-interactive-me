import { useEffect, useRef } from "react"
import { CSSTransition } from 'react-transition-group';
import { AppProps } from "next/app"
import { useAtom } from "jotai"

import * as atoms  from "../../src/store-jotai/atomicUiStore"

import { StyledAppPayoff, StyledSidebar } from "../../styles/main.styled"
import { ActionsList } from "../actions/actionsList"
import { AppMenu } from "../sidebar/menu"
import { AppDataProps } from "../../src/types"

export const SidebarComponent = ({ pageProps }: { pageProps: AppProps & AppDataProps }) => {

    const nodeRefSidebar = useRef(null)
    // const nodeRefPayoff = useRef(null)

    const [_showsettings, setShowsettings] = useAtom(atoms.uiShowSettingsAtom)
    const [showactions, _setShowactions] = useAtom(atoms.uiShowActionsAtom)
    const [showpayoff, setShowpayoff] = useAtom(atoms.uiShowPayoffAtom)
    // const [xpandLayout, setXpandLayout] = useAtom(atoms.uiExpandLayoutAtom)


    const [foo, setFoo] = useAtom(atoms.fooAtomz)

    return <CSSTransition 
            nodeRef={nodeRefSidebar} 
            in={  foo } 
            timeout={ 0 } 
            classNames="anime-popright-node"
        >
        <StyledSidebar className='anime-popright-init' ref={ nodeRefSidebar } >
            <span 
                className="html-icon main-toggle"
                onClick={ () => {
                    setFoo(false)
                    setShowsettings(false)
                }}>
                    <i aria-hidden="true" className="fa fa-times" />
            </span> 
            <h1 className="app-logo"><a href="https://interactiveme.net/">Interactive Me</a></h1> 
            <AppMenu />
            <ActionsList 
                { ...pageProps }
            />
            
                {/* <CSSTransition 
                    nodeRef={nodeRefPayoff} 
                    in={  showpayoff } 
                    timeout={ 100 } 
                    classNames="anime-fade-node"
                > */}
                {
                    <StyledAppPayoff className={ showpayoff ? '' : 'disabled' }>  
                        <div>
                            <span  
                                className="html-icon main-toggle" 
                                onClick={ () => setShowpayoff(!showpayoff) }>
                                    <i aria-hidden="true" className="fa fa-times" />
                            </span>
                            <p>You are viewing the Nextjs implementation.</p>
                            <p>Try the <a href="https://webassembly.interactiveme.net/personal">Web Assembley (Rust) implementation</a></p>
                        </div>
                    </StyledAppPayoff>
                }
                    
                {/* </CSSTransition> */}
            
            
        </StyledSidebar>
    </CSSTransition>
}