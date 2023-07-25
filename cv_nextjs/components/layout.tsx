import { AppProps } from "next/app"
import { useRouter } from 'next/router'

import {  useEffect, useState } from "react"
import { useAtom } from "jotai";

import * as atoms  from "../src/store-jotai/atomicUiStore"
import StyledComponentsRegistry from '../lib/registry'

import { AppDataProps } from "../src/types"
import { AppSetting, AppSettingsParser } from "../src/settings/parser"

import { ActionsList } from "./actions/actionsList"
import { PendingActionsComponent } from "./actions/pendingAction"

import { AppMenu } from "./sidebar/menu"
import { SettingsComponent } from "./widget/settings"

import { StyledSidebar } from "../styles/main.styled"
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

    const [settingsparser, setSettingsparser] = useState<AppSettingsParser | null>(null)

    useEffect(() => {
        const settingsparser = new AppSettingsParser()

        setSettingsparser(settingsparser)
    }, [])

    let settingsDisabled = !showsettings || settingsparser === null
        
    return <div className={feCname}>
        {
            router.pathname !== '/' ? 
            <StyledComponentsRegistry>
                <TopBarComponent />
                <SettingsComponent
                    disabled = { settingsDisabled }
                    settings={ settingsparser?.allSettings || [] }
                    saveSetting={ (s: AppSetting<any>) => settingsparser !== null ? settingsparser.saveSetting(s.key, s.val) : void 0 }
                    toggleSettingsUI={ () => setShowsettings(!showsettings) }
                />
                {
                    settingsDisabled ? null : <div className="generic-ui-overlay-bg"></div>
                }
                <PendingActionsComponent />
                <StyledSidebar disabled={ !showactions }>
                    <span 
                        className="html-icon"
                        onClick={ () => setShowsettings(!showsettings) }>
                            <i aria-hidden="true" className="fa fa-cog" />
                    </span> 
                    <h1 className="app-logo">CURRICULUM VITAE</h1>
                    <AppMenu />
                    <ActionsList 
                        { ...pageProps }
                    />
                </StyledSidebar>
            </StyledComponentsRegistry> :
            null
        }
        {
            children
        }
    </div>
}

export default Layout