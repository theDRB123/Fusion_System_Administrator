import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const RequireAuth = ({children})=>{
    const {isAuthenticated, authToken } = useAuth();

    if(!isAuthenticated || !authToken){
        return <Navigate to="/login/" replace />
    }
    return children;
};

export default RequireAuth;