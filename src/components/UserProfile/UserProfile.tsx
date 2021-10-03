import {Container} from "@mui/material";
import {useSelector} from "react-redux";
import {User} from "../../models/user";
import {authState} from "../../state-slices/auth/auth-slice";
import {profileState} from "../../state-slices/user-profile/profile-slice";

/**
 * Component for rendering a user's information.
 * @author Cody McDonald
 * */

const UserProfile = () => {
    const state = useSelector(profileState);
    const user: User = useSelector(authState).authUser;

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