import { useReducer, createContext, useEffect, useState } from 'react'
import { useAtom } from 'jotai'

import * as atoms from '../src/store-jotai/atomicUiStore'

import Layout from '../components/layout'

import '../styles/global.css'
import '../styles/mob.css'

import type { AppProps } from 'next/app'

import { reducer, initialState, AppStateAction, AppState } from '../src/store/appState'

import { CvContext } from '../src/types'

import { getAppstateActionsData } from '../lib/api/actions-api'
import { StyledNotification } from '../styles/main.styled'
import { AppSettingsParser, SettingKeys } from '../src/settings/parser'

export const CvJobsContext = createContext<CvContext | null>(null)


export default function App({ 
  Component, 
  pageProps }: AppProps & { pageProps: AppProps}) {

    const [uiBusy, ] = useAtom(atoms.uiBusy)
    const [uiOpStatus, ] = useAtom(atoms.uiOpStatus)
    const [uisettings, setUisettings] = useAtom(atoms.uiSettingsAtom || [])

    const userTokSetting = uisettings.find(s => s.key == SettingKeys.UserTok) || {val: ''}

    useEffect(() => {
      const parser = new AppSettingsParser()
      setUisettings(parser.allSettings)
    }, [])

    useEffect(() => {
 
      getAppstateActionsData()
        .then(function(userAppstateData) {

            dispatch({
              type: AppStateAction.LOAD_USER_STATE,
              payload: userAppstateData as AppState
            })
        
        })
        .catch (function(err) {
          console.log(err)
        })
    }, [userTokSetting.val])
  

  const [appstate, dispatch] = useReducer(reducer, initialState)
    
  const appstateData = {
    appstate,
    dispatch
  }

  return  <CvJobsContext.Provider value={ appstateData }>
    <Layout pageProps={ pageProps }>yl
      
      { 
         uiOpStatus !== null ?
            <StyledNotification className={ `${atoms.outcomeClassName(uiOpStatus.outcome)}` }>{ uiOpStatus.msg }</StyledNotification> :
            null
        }
        <Component {...pageProps} />
      </Layout>
    </CvJobsContext.Provider>
}
