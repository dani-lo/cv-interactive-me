import { useState } from "react"
import { useAtom } from "jotai"

import { AppSetting, AppSettingsParser, SettingKeys, settingLabel } from "../../src/settings/parser"

import * as atoms  from "../../src/store-jotai/atomicUiStore"

import { StyledSettingsListContainer } from "../../styles/main.styled"

export const SettingsComponent = ({ disabled, settings, saveSetting }: {
    disabled: boolean,
    settings: AppSetting<any>[],
    saveSetting: (settingKey: SettingKeys, val: any) => void,
    // toggleSettingsUI: () => void,
}) => {
    
    const [_uiOperationSuccess, setUiOperationSuccess] = useAtom(atoms.uiOperationSuccess)
    const [showsettings, setShowsettings] = useAtom(atoms.uiShowSettingsAtom)
    const [_tok, setTok] = useAtom(atoms.tok)

    return <StyledSettingsListContainer disabled={ disabled }>
        <span  
            className="html-icon main-toggle" 
            onClick={ () => {
                setShowsettings(false) 
            }}>
                <i aria-hidden="true" className="fa fa-times" />
        </span> 
        {
            settings.map((setting: any) => {
                return <SettingComponent 
                    setting={ setting }
                    saveSetting={ (settingKey: SettingKeys, val: any) => {
                        saveSetting(settingKey, val) 
                        // setUisettings(s)
                        setUiOperationSuccess({
                            outcome: 'success',
                            msg: 'Your changes were saved'
                        })
                        if (settingKey == SettingKeys.UserTok) {
                            setTok(val as string)
                        }

                    }}
                    key={ setting.key.toString() } 
                />
            })  
        }
    </StyledSettingsListContainer>
}

const SettingComponent = ({ setting, saveSetting } : {
    setting: AppSetting<any>,
    saveSetting: (settingKey: SettingKeys, val: any) => void,
}) => {

    const typeofSetting = typeof setting.default
    const [val, setVal] = useState(setting.val)

    const unchanged = val === setting.val
    const inputValid = setting.validate !== undefined ? setting.validate(val) : true

    const disabled = AppSettingsParser.isDisabled(setting)

    return  <div className={ disabled ? 'disabled' : '' }>
        {
            typeofSetting == 'boolean' ?
                <>
                    <input 
                        type="checkbox" 
                        id={ setting.key }
                        checked={ val }
                        onChange={ () => setVal(!val) }
                    />
                    <label htmlFor={ setting.key }>{ settingLabel(setting.key) }</label>
                </>:
                <>
                    <label 
                        htmlFor={ setting.key }
                        style={{ 
                            padding: '0',
                            display: 'block',
                        }}>
                        { settingLabel(setting.key) }
                    </label>
                    <input 
                        id={ setting.key }
                        type={ typeofSetting == 'number' ? "number" : 'text'}
                        value={ val }
                        onChange={ (e) => setVal(e.target.value) }
                    />
                </>
        }
        <p>{ setting.desc }</p>
        <button 
            className={ (unchanged || !inputValid) ? 'disabled' : '' }
            onClick={ () => saveSetting(setting.key, val) }>
            save
        </button>
    </div>
}