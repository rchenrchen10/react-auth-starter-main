import { Redirect, Route } from "react-router";
import { useToken } from "./useToken";
export const PrivateRoute = props => {
    const [token] = useToken()


    if(!token) return <Redirect to="/login" />

    return <Route {...props} />
}