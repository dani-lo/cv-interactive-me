import { User } from "../../src/models/classes/User"

// let usr : User | null = null 

export const getUser = async () =>  {

    // if (usr == null) {
        
        const usr = new User()

        await usr.loadRemote()

        return usr
    // }
    
    // return usr
    
}