import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../models/user";
import { UserData } from "../../models/user-data";
import { getUserData } from "../../remote/user-service";
import { authState } from "../../state-slices/auth/auth-slice";
import { profileState, setProfile } from "../../state-slices/user-profile/profile-slice";

const UserProfile = () => {
    const state: any = useSelector(profileState);
    const user: User = useSelector(authState).authUser;

    const dispatch = useDispatch();

    const getData = async function(){
        try{
            let userProfile = await getUserData(user.id);
            dispatch(setProfile(userProfile as UserData));
           } catch(e:any){
               console.log(e);
           }
    }

    // componentDidMount lifecycle
    useEffect(() => {
       getData();
    }, []);


    

    return <div>
        <Typography>This will contain user information!</Typography>
    </div>
};

export default UserProfile;