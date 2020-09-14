import React, { useContext } from 'react';

import * as microsoftTeams from "@microsoft/teams-js";

const AuthContext = React.createContext(microsoftTeams.authentication);

const AuthProvider = (props) => {
    return (
        <AuthContext.Provider value={microsoftTeams.authentication}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export const withAuth = Component => props => {
    const auth = useContext(AuthContext);
    return <Component {...props} auth={auth} />
}