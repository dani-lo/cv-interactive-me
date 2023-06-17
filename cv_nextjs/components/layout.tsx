import { AppProps } from "next/app"
import { useRouter } from 'next/router'

import { useContext, useEffect, useState } from "react"

import { AppDataProps } from "../src/types"
import { AppSetting, AppSettingsParser } from "../src/settings/parser"

import { ActionsList } from "./actions/actionsList"
import { PendingActionsComponent } from "./actions/pendingAction"

import { AppMenu } from "./sidebar/menu"
import { SettingsComponent } from "./widget/settings"

import { StyledSidebar } from "../styles/main.styled"

type Props = {
    children: any,
    pageProps: AppProps & AppDataProps,
}

const Layout = ({
    children,
    pageProps
}: Props) => {

    const router = useRouter()

    const [showsettings, setShowsettings] = useState(false)
    const [settingsparser, setSettingsparser] = useState<AppSettingsParser | null>(null)

    useEffect(() => {
        const settingsparser = new AppSettingsParser()

        setSettingsparser(settingsparser)
    }, [])

    let settingsDisabled = !showsettings || settingsparser === null

    return <>
        {
            router.pathname !== '/' ? 
            <>
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
                <StyledSidebar>
                    <span 
                        className="html-icon"
                        onClick={ () => setShowsettings(!showsettings) }>
                            &#9776;
                    </span> 
                    <h1 className="app-logo">CURRICULUM VITAE</h1>
                    <AppMenu />
                    <ActionsList 
                        { ...pageProps }
                    />
                </StyledSidebar>
            </> :
            null
        }
        {
            children
        }
    </>
}

export default Layout