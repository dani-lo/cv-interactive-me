import axios, { AxiosError } from "axios"
import Error from "next/error"
import { generateUserTok } from "../../helpers/userTok"
import { Collectable } from "../../types"
import { AppSettingsParser, SettingKeys } from "../../settings/parser"
import { URL_ACTIONS } from '../../config'

const cvTokKey = 'cv-app-tok'

const useStorage = (typeof window !== 'undefined') 

export class User implements Collectable {

    _id : string | undefined
    private tok: string | null

    constructor () {
        this.tok = 'dani5'//useStorage ? this.initTok() : null
    }

    get name () {
        return this.tok
    }

    get token () {
        return this.tok
    }

    private initTok (forceNew: boolean = false) {

        const parser = new AppSettingsParser()

        if (forceNew) {
            parser.saveSetting(SettingKeys.UserTok, generateUserTok())
        }

        const tok = `${ parser.getSetting(SettingKeys.UserTok) }` //!forceNew ? localStorage.getItem(cvTokKey) : null

        if (!tok) {
            const newTok = generateUserTok()
            localStorage.setItem(cvTokKey, newTok)

            return newTok
        }
        return tok
    }

    async loadRemote () {
        
        if (this.isLoggedin() || this.tok == null) {
            return Promise.resolve()
        }

        try {
            const getUserDataResponse =  await axios.get(`${ URL_ACTIONS.USERS }/${ this.tok }`)

            this._id = getUserDataResponse.data.data.user._id

        } catch (e:unknown) {
            
            const err = e as AxiosError
            
            if (err.response && [404].includes(err.response.status)) {

                try {
                    const postUserResponse = await axios.post(
                        URL_ACTIONS.USERS, 
                        new URLSearchParams({
                            tok: this.tok
                        })
                    )
                    this._id = postUserResponse.data.data.user._id
                } catch (e) {

                    // @ts-ignore
                    throw(new Error('Failed to initialise User'))
                }
            }  
        }
    }

    isLoggedin () {
        return !!this._id
    }

    refresh () {
        this.initTok()
    }
}