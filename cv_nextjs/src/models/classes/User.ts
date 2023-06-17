import axios, { AxiosError } from "axios"
import Error from "next/error"
import { generateUserTok } from "../../helpers/userTok"
import { Collectable } from "../../types"
import { AppSettingsParser, SettingKeys } from "../../settings/parser"

const cvTokKey = 'cv-app-tok'
const banUserTrackingKey = 'ban-user-tracking'

const useStorage = (typeof window !== 'undefined') 

export class User implements Collectable {

    _id : string | undefined
    private tok: string | null

    constructor () {
        this.tok = useStorage ? this.initTok() : null
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
            const getUserDataResponse =  await axios.get(`http://localhost:8000/api/users/${ this.tok }`)

            this._id = getUserDataResponse.data.data.user._id

        } catch (e:unknown) {
            
            const err = e as AxiosError
            
            if (err.response && [404].includes(err.response.status)) {

                try {
                    const postUserResponse = await axios.post(
                        `http://localhost:8000/api/users`, 
                        new URLSearchParams({
                            tok: this.tok
                        })
                    )
                    console.log('NOW set the created id', postUserResponse.data.data.user._id)
                    console.log('(postUserResponse.data ---)')
                    console.log(postUserResponse.data)
                    this._id = postUserResponse.data.data.user._id
                } catch (e) {
                    console.log('CAUGHT!!!! post user (postUserResponse)')
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