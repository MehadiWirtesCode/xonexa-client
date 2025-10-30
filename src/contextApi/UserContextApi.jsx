import { createContext, useState } from "react";

export const UsersContext = createContext();

export const UsersProvider =({children}) =>{
   
    const [users,setUsers] =useState([]);
    const [usersListModal,setUsersListModal] =useState(false);
    const [productListModal,setProductListModal] = useState(false);

    return(

        <UsersContext.Provider value={{users,setUsers,usersListModal,setUsersListModal
            ,productListModal,setProductListModal}}>
        {children}
        </UsersContext.Provider>
    )
}