import React, { useContext, useEffect, useState } from "react"
import { useAtom } from "jotai";

import * as atoms  from "../../src/store-jotai/atomicUiStore"

import { AppState, AppStateAction } from "../../src/store/appState"

import { pendingAppstateActions } from "../../src/helpers/pendingAppstateActions"
import { CvJobsContext } from "../../pages/_app"
import { persistAppstateActionsData } from "../../lib/api/actions-api"
import { StyledPrompt } from "../../styles/main.styled";
import { User } from "../../src/models/classes/User";
import { AppSettingsParser, SettingKeys } from "../../src/settings/parser";

export const PendingActionsComponent = () => {
    
    const ctx = useContext(CvJobsContext)

    const [, setBusy] = useAtom(atoms.uiBusy)
    const [, setMsg] = useAtom(atoms.uiMsg)
    // const [banUserTrackingSession, setBanUserTrackingSession] = useAtom(atoms.banUserTrackingSession)
    const [, uiOperationSuccess] = useAtom(atoms.uiOperationSuccess)
    // const [uisettings, setUisettings] = useAtom(atoms.uiSettingsAtom)

    const [user, ] = useState<User>(new User())

    // const [banPersistAlways, setBanPersistAlways] = useState(false)
    // const [banPersistTemp, setBanPersistTemp] = useState(false)
    const [showOptions, setShowOptions] = useState(false)

    useEffect(() => {

        try {
            (async () => {
                await user.loadRemote()
            })()
            
        } catch (e) {
            //
        }
        
    }, [user.name])

    if (!ctx) {
        return null
    }    

    if (typeof window !== 'undefined') {

        const parser = new AppSettingsParser()

        if (parser.getSetting(SettingKeys.ShowPersistFeedback) == false) {
            return null
        }
    }

    const appState = ctx?.appstate
    const pendingActions = pendingAppstateActions(appState)
    
    return <StyledPrompt className={ `${ pendingActions.length ? 'active' : '' }` }>
        <div className="prompt">
            <p><strong>You have { pendingActions.length } pending changes</strong></p>
            <button 
                className="err"
                onClick={() => {
                    ctx.dispatch({ type: AppStateAction.FLUSH_PENDING, payload: null }) 
                    setShowOptions(false)
                }}
            >Discard</button>
            <button
                className="ok"
                onClick={ () => {        
                    setBusy(true)
                    setMsg('Persisting your changes, please wait')
                
                    persistAppstateActionsData(appState).then((result: AppState) => {
                        
                        uiOperationSuccess(void 0)

                        ctx.dispatch({ type: AppStateAction.REFRESH_PENDING, payload: result })
                    })
                }}
            >Persist</button>
    </div>
        <p style={{ textDecoration: 'underline' }} onClick={ () => setShowOptions(!showOptions)}>
        {
            showOptions ? 
            <i className="fa fa-chevron-down" /> :
            <i className="fa fa-chevron-right" />
        }
        <span style={{ paddingLeft: 'var(--gap-medium'}}>Why am I seeing this?</span>
        </p>
        { showOptions ?
            <div className="pending-actions-user-info">
                <p>This app tracks users by assigning a <strong>random identifier</strong>, stored in session. If you would like to persist your actions (i.e filters, bookmrks, annotations) you can do so: after
                    persisting, your browser in future will automatically show your saved actions.
                    <br />
                    You can also use the thus stored random identifier to access your actions from a different broswer, i.e <strong>sharing</strong> your filters etc with colleagues
                </p>
                <p><strong>NOTE</strong> no personal data is required to persist actions: the app will simply save the random assigned token remotely and use that to recognise you in future sessions</p>
                <p>
                    Your randomly assigned identifier is <strong>{ user.name }</strong>
                </p>
            </div> : null
        }
        
    </StyledPrompt>
}