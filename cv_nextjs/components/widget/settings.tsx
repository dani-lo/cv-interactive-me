import { useState } from "react"
import { useAtom } from "jotai"

import { AppSetting, settingLabel } from "../../src/settings/parser"

import * as atoms  from "../../src/store-jotai/atomicUiStore"

import { StyledSettingsListContainer } from "../../styles/main.styled"

export const SettingsComponent = ({ disabled, settings, saveSetting, toggleSettingsUI }: {
    disabled: boolean,
    settings: AppSetting<any>[],
    saveSetting: <T extends (string | number | boolean)>(s: AppSetting<T>) => void,
    toggleSettingsUI: () => void,
}) => {
    
    const [_uiOperationSuccess, setUiOperationSuccess] = useAtom(atoms.uiOperationSuccess)
    const [_uisettings, setUisettings] = useAtom(atoms.uiSettings)

    return <StyledSettingsListContainer disabled={ disabled }>
        <span  
            className="html-icon" 
            onClick={ toggleSettingsUI } 
            style={{ transform: 'rotate(180deg)'}}>
                &#10140;
        </span> 
        {
            settings.map(setting => {
                return <SettingComponent 
                    setting={ setting }
                    saveSetting={ (s: AppSetting<any>) => {
                        saveSetting(s) 
                        setUisettings(s)
                        setUiOperationSuccess(void 0)
                    }}
                    key={ setting.key.toString() } 
                />
            })  
        }
    </StyledSettingsListContainer>
}

const SettingComponent = ({ setting, saveSetting } : {
    setting: AppSetting<any>,
    saveSetting: <T extends (string | number | boolean)>(s: AppSetting<T>) => void,
}) => {

    const typeofSetting = typeof setting.default
    const [val, setVal] = useState(setting.val)

    const unchanged = val === setting.val
    const inputValid = setting.validate !== undefined ? setting.validate(val) : true

    return  <div>
        {
            typeofSetting == 'boolean' ?
                <>
                    <input 
                        type="checkbox" 
                        checked={ val }
                        onChange={ () => setVal(!val) }
                    />
                    <label>{ settingLabel(setting.key) }</label>
                </>:
                <>
                    <label 
                        style={{ 
                            padding: '0',
                            display: 'block',
                        }}>
                        { settingLabel(setting.key) }
                    </label>
                    <input 
                        type={ typeofSetting == 'number' ? "number" : 'text'}
                        value={ val }
                        onChange={ (e) => setVal(e.target.value) }
                    />
                </>
        }
        
        <p>{ setting.desc }</p>
        <button 
            className={ (unchanged || !inputValid) ? 'disabled' : '' }
            onClick={ () => saveSetting<typeof setting.default>({
                ...setting,
                val: val
            })}>
            save
        </button>
    </div>
}