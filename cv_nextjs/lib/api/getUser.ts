import { User } from "../../src/models/classes/User"

let usr : User | null = null 

export const getUser = async () =>  {

    // if (usr == null) {
        
        usr = new User()

        await usr.loadRemote()

        return usr
    // }
    
    // return usr
    
}