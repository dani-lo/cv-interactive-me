import { AppProps } from "next/app"
import { CSSTransition } from 'react-transition-group';
import {  useEffect, useRef, useState } from "react"
import { useAtom } from "jotai"

import * as atoms  from "../src/store-jotai/atomicUiStore"

import { AppDataProps } from "../src/types"
import { AppSettingsParser, SettingKeys } from "../src/settings/parser"

import { PendingActionsComponent } from "./actions/pendingAction"

import { SettingsComponent } from "./widget/settings"

import { useFrontendClassname } from "../src/hooks/useFrontendClassname"
import { TopBarComponent } from "./sidebar/topbar"
import { SidebarComponent } from "./widget/sidebar";
import { useRouter } from "next/router";

type Props = {
    children: any,
    pageProps: AppProps & AppDataProps,
}

const Layout = ({
    children,
    pageProps
}: Props) => {

    const router = useRouter()
    const path = router.asPath || ''

    const isPrint = path.indexOf('print') !== -1
    const feCname = useFrontendClassname()

    const nodeRefContent = useRef(null)

    const [showsettings, setShowsettings] = useAtom(atoms.uiShowSettingsAtom)
    const [_showactions, _setShowactions] = useAtom(atoms.uiShowActionsAtom)
    const [uiBusy, _setUiBusy] = useAtom(atoms.uiBusy)
    // const [xpandLayout, setXpandLayout] = useAtom(atoms.uiExpandLayoutAtom)

    const [foo, setFoo] = useAtom(atoms.fooAtomz)
  
    const [settings, setSettings] = useState([])

    useEffect(() => {
        const settingsparser = new AppSettingsParser()
        const settings = settingsparser.allSettings

        // @ts-ignore
        setSettings(settings)
        
    }, [])


    
    return <div className={`${ feCname } anime-relative ${ isPrint ? 'print' : '' }`}>
            <span 
                className={ `html-icon app-ctrl ${ showsettings ? ' disabled' : '' }` }
                style={{ right: '1rem', left: 'auto'}}
                onClick={ () => {
                    setShowsettings(true) 
                    setFoo(true)
                }}>
                    <i aria-hidden="true" className="fa fa-cog" />
            </span> 
                { uiBusy ? null : <TopBarComponent /> }
                { uiBusy ? null :  <SettingsComponent
                    disabled = { !showsettings }
                    settings={ settings }
                    saveSetting={ (k: SettingKeys, val: any) => {
                        const settingsparser = new AppSettingsParser()
                        
                        settingsparser.saveSetting(k, val)
                        settingsparser.parseStorageSettings()
                        
                        const settings = settingsparser.allSettings

                        // @ts-ignore
                        setSettings(settings)
                    }}
                />  }
                {
                    !showsettings || uiBusy ? null : <div className="generic-ui-overlay-bg"></div>
                }
                {
                    !uiBusy ? <PendingActionsComponent settings={ settings } /> : null
                }
                {
                    ! uiBusy ? 
                    
                        <>
                        { uiBusy ? null : 
                            <span 
                                className="html-icon app-ctrl"
                                onClick={ () => {
                                    setFoo(true) 
                                }}>
                                    <i aria-hidden="true" className="fa fa-bars" />
                            </span>  
                        }
                        <SidebarComponent pageProps={ pageProps } />
                        </>
                    : null
                }
                {
                    uiBusy ? null :  <CSSTransition 
                        nodeRef={nodeRefContent} 
                        in={  foo } 
                        timeout={ 0 } 
                        classNames="anime-popright-node">
                        <section className="content-container anime-popright-init" ref={ nodeRefContent }>
                            {
                                children
                            }
                        </section>
                    </CSSTransition>
                }
    </div>  
    
    
}

export default Layout