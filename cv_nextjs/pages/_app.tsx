import { useReducer, createContext, useEffect, useState } from 'react'
import { useAtom } from 'jotai'

import * as atoms from '../src/store-jotai/atomicUiStore'

import Layout from '../components/layout'
import { ErrorBoundary } from '../src/hoc/withError'


import '../styles/global.css'
import '../styles/mob.css'
import '../styles/print.scss'

import type { AppProps } from 'next/app'

import { reducer, initialState, AppStateAction, AppState } from '../src/store/appState'

import { CvContext } from '../src/types'

import { getAppstateActionsData } from '../lib/api/actions-api'
import { StyledNotification } from '../styles/main.styled'
import { AppSettingsParser, SettingKeys } from '../src/settings/parser'

export const CvJobsContext = createContext<CvContext | null>(null)

let lastScrollTop = 0; 

export default function App({ 
  Component, 
  pageProps }: AppProps & { pageProps: AppProps}) {

    const [uiOpStatus, ] = useAtom(atoms.uiOpStatus)
    const [uisettings, setUisettings] = useAtom(atoms.uiSettingsAtom || [])

    const userTokSetting = uisettings.find(s => s.key == SettingKeys.UserTok) || {val: ''}

    useEffect(() => {
      const onScroll = function() {

        var st = window.pageYOffset || document.documentElement.scrollTop; 
        
        if (st > lastScrollTop) {
            document.body.className = "scroll-down"
        } else if (st < lastScrollTop) {
            document.body.className = "scroll-up"
        }
        
        lastScrollTop = st <= 0 ? 0 : st;
      }
        
      window.addEventListener('scroll', onScroll);
      
      return () => {
        window.removeEventListener('scroll', onScroll);
      }
    }, []);

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
    <Layout pageProps={ pageProps }>
      { 
         uiOpStatus !== null ?
            <StyledNotification className={ `${atoms.outcomeClassName(uiOpStatus.outcome)}` }>{ uiOpStatus.msg }</StyledNotification> :
            null
        }
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </Layout>
    </CvJobsContext.Provider>
}
