import {createContext} from "react";
export const UserContext = createContext(
    {
                name:'',
                email:'',
                password:'',
                balance:0
            },

        ()=>{}
);
