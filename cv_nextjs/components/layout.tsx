import { AppProps } from "next/app"
import { useRouter } from 'next/router'

import {  useEffect, useState } from "react"
import { useAtom } from "jotai";

import * as atoms  from "../src/store-jotai/atomicUiStore"
import StyledComponentsRegistry from '../lib/registry'

import { AppDataProps } from "../src/types"
import { AppSetting, AppSettingsParser, SettingKeys } from "../src/settings/parser"

import { ActionsList } from "./actions/actionsList"
import { PendingActionsComponent } from "./actions/pendingAction"

import { AppMenu } from "./sidebar/menu"
import { SettingsComponent } from "./widget/settings"

import { StyledAppPayoff, StyledSidebar } from "../styles/main.styled"
import { useFrontendClassname } from "../src/hooks/useFrontendClassname"
import { TopBarComponent } from "./sidebar/topbar"

type Props = {
    children: any,
    pageProps: AppProps & AppDataProps,
}

const Layout = ({
    children,
    pageProps
}: Props) => {

    const feCname = useFrontendClassname()
    const router = useRouter()

    const [showsettings, setShowsettings] = useAtom(atoms.uiShowSettingsAtom)
    const [showactions, _setShowactions] = useAtom(atoms.uiShowActionsAtom)
    const [showpayoff, setShowpayoff] = useAtom(atoms.uiShowPayoffAtom)
    const [uiBusy, setUiBusy] = useAtom(atoms.uiBusy)
  
    const [settings, setSettings] = useState([])

    useEffect(() => {
        const settingsparser = new AppSettingsParser()
        const settings = settingsparser.allSettings

        // @ts-ignorel
        setSettings(settings)
    }, [])
        
    return <div className={feCname}>
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
            ! uiBusy ? <StyledSidebar className={ showactions ? 'active' : ''}>
                <span 
                    className="html-icon"
                    onClick={ () => setShowsettings(!showsettings) }>
                        <i aria-hidden="true" className="fa fa-cog" />
                </span> 
                <h1 className="app-logo"><a href="https://interactiveme.net/">Interactive Me</a></h1> 
                <AppMenu />
                <ActionsList 
                    { ...pageProps }
                />
                {
                    showpayoff ?
                    <StyledAppPayoff>  
                        <div>
                            <span  
                                className="html-icon" 
                                onClick={ () => setShowpayoff(!showpayoff) }>
                                    <i aria-hidden="true" className="fa fa-times" />
                            </span>
                            <p>You are viewing the Nextjs implementation.</p>
                            <p>Try the <a href="https://webassembly.interactiveme.net/personal">Web Assembley (Rust) implementation</a></p>
                        </div>
                    </StyledAppPayoff> :
                    null
                }
                
            </StyledSidebar> : null
        }
        {
            uiBusy ? null :  children
        }
    </div>
}

export default Layout