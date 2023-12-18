import React, { useContext, useEffect, useState } from "react"
import { useAtom } from "jotai";

import * as atoms  from "../../src/store-jotai/atomicUiStore"

import { AppState, AppStateAction } from "../../src/store/appState"

import { pendingAppstateActions } from "../../src/helpers/pendingAppstateActions"
import { CvJobsContext } from "../../pages/_app"
import { persistAppstateActionsData } from "../../lib/api/actions-api"
import { StyledPrompt } from "../../styles/main.styled";
import { User } from "../../src/models/classes/User";
import { AppSetting, AppSettingsParser, SettingKeys } from "../../src/settings/parser";

export const PendingActionsComponent = ({
    settings
}: { settings: AppSetting<any>[]}) => {
    
    const ctx = useContext(CvJobsContext)

    const [showsettings, setShowsettings] = useAtom(atoms.uiShowSettingsAtom)
    // const [, setBusy] = useAtom(atoms.uiBusy)
    const [, setUiOpStatus] = useAtom(atoms.uiOpStatus)
    const [, uiOperationSuccess] = useAtom(atoms.uiOperationSuccess)
    const [foo, setFoo] = useAtom(atoms.fooAtomz)

    const [user, ] = useState<User>(new User())
    const [showOptions, setShowOptions] = useState(false)

    const appState = ctx?.appstate
    const pendingActions = appState ? pendingAppstateActions(appState) : []

    const [showself, setShowSelf] = useState(true)

    useEffect(() => {

        try {
            (async () => {
                await user.loadRemote()
            })()
            
        } catch (e) {
            console.log(e)
        }
        
    }, [user])

    const actionsDep = JSON.stringify(pendingActions)

    const parser = new AppSettingsParser()
    
    const allowFeedback = parser.getSetting(SettingKeys.ShowPersistFeedback)
    const autoPersist = parser.getSetting(SettingKeys.AutoPersist)

    const userAllows = (!autoPersist && allowFeedback)

    const active = pendingActions.length > 0 && showself && userAllows

    useEffect(() => {
        
        setShowSelf(true)

        if (pendingActions.length && autoPersist) {
            setUiOpStatus({
                outcome: 'warning',
                msg: 'Persisting your changes, please wait',
            })
            
            if (!!appState) {
                persistAppstateActionsData(appState).then((result: AppState) => {
                
                    uiOperationSuccess({
                        outcome: 'success',
                        msg: 'Changes Persisted',
                    })

                    ctx.dispatch({ type: AppStateAction.REFRESH_PENDING, payload: result })
                })
            }
        }

    }, [actionsDep, appState])
    
    if (!ctx) {
        return null
    }       

    console.log('active, active', active)
    
    return <StyledPrompt className={ `${ active ? 'active' : '' }` }>
        <div className="prompt">
            <span 
                className="html-icon"
                onClick={ () => {
                    setShowSelf(false)
                    setShowOptions(false)
                }}>
                    <i aria-hidden="true" className="fa fa-times" />
            </span> 
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
                    // setBusy(true)
                    setUiOpStatus({
                        outcome: 'warning',
                        msg: 'Persisting your changes, please wait',
                    })
                    
                    if (!!appState) {
                        persistAppstateActionsData(appState).then((result: AppState) => {
                        
                            uiOperationSuccess({
                                outcome: 'success',
                                msg: 'Changes Persisted',
                            })
    
                            ctx.dispatch({ type: AppStateAction.REFRESH_PENDING, payload: result })
                        })
                    }
                }}
            >Persist</button>
    </div>
        <p style={{ textDecoration: 'underline' }} onClick={ () => setShowOptions(!showOptions)}>
        {
            showOptions ? 
            <i className="fa fa-chevron-down" /> :
            <i className="fa fa-chevron-right" />
        }
        <a style={{ paddingLeft: 'var(--gap-medium'}}>Why am I seeing this?</a>
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
                <button 
                    style={{ display: 'flex', marginTop: 'var(--gap-large)' }}
                    onClick={ () => {
                        setShowsettings(true) 
                        setFoo(true)
                        // setShowSelf(false)
                        // setShowOptions(false)
                    }}
                    className={ showsettings ? 'disabled' : '' }
                >
                    { "Edit settings" }
                </button>
            </div> : null
        }
        
    </StyledPrompt>
}