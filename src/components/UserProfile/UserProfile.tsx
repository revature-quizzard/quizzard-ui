import { Button, Container, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../models/user";
import { UserData } from "../../models/user-data";
import { getUserData } from "../../remote/user-service";
import { authState } from "../../state-slices/auth/auth-slice";
import { profileState, setProfile } from "../../state-slices/user-profile/profile-slice";

const UserProfile = () => {
    const state = useSelector(profileState);
    const user: User = useSelector(authState).authUser;

    const dispatch = useDispatch();

    const getData = async function(){
        try{
            let userProfile = await getUserData(user.id);
            console.log(userProfile);
            dispatch(setProfile(userProfile as UserData));
           } catch(e:any){
               console.log(e);
           }
    }

    // componentDidMount lifecycle
    useEffect(() => {
       getData();
    }, []);


    

    return (
        <>
            <Container fixed maxWidth='md' id='register-component'>
                <br/><br/>
                Username: {user.username}<br/>
                Name: {user.name}<br/>
                User since: {state.userProfile.registrationDate.substring(0, 10)}<br/>
                Points: {state.userProfile.points}<br/>
                Wins: {state.userProfile.wins}<br/>
                Losses: {state.userProfile.losses}<br/>

            </Container>
        </>
    )
};

export default UserProfile;