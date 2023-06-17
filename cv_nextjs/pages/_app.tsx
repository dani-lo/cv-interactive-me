import { useReducer, createContext, useEffect, useState } from 'react'
import { useAtom } from 'jotai'

import * as atoms from '../src/store-jotai/atomicUiStore'

import Layout from '../components/layout'

import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { reducer, initialState, AppStateAction, AppState } from '../src/store/appState'
// import { uiAtom } from '../src/store-jotai/ui-store'

import { CvContext } from '../src/types'

import { getAppstateActionsData } from '../lib/api/actions-api'
import { StyledLoaderRipple } from '../styles/main.styled'
import { User } from '../src/models/classes/User'
import { AppSetting, AppSettingsParser, SettingKeys } from '../src/settings/parser'

export const CvJobsContext = createContext<CvContext | null>(null)


export default function App({ 
  Component, 
  pageProps }: AppProps & { pageProps: AppProps}) {

    const [uiBusy, ] = useAtom(atoms.uiBusy)
    const [uiMsg, ] = useAtom(atoms.uiMsg)

    const [uisettings, setUisettings] = useAtom(atoms.uiSettingsAtom || [])

    const userTokSetting = uisettings.find(s => s.key == SettingKeys.UserTok) || {val: ''}

    useEffect(() => {
      const parser = new AppSettingsParser()
      setUisettings(parser.allSettings)
    }, [])

    useEffect(() => {

      console.log('RUN APP.tsx Action Data fetch EFFECT')
 
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
    <Layout pageProps={ pageProps}>
      { 
        uiBusy ? <StyledLoaderRipple>
          <div className="bg"></div>
          {
            uiMsg ? <p><span>{ uiMsg }</span></p> : null
          }
          </StyledLoaderRipple> : 
          null
        }
        <Component {...pageProps} />
      </Layout>
    </CvJobsContext.Provider>
}
