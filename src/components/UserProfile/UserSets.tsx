import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { User } from "../../models/user";
import { authState } from "../../state-slices/auth/auth-slice";
import { profileState } from "../../state-slices/user-profile/profile-slice";

const UserSets = () => {
    const state = useSelector(profileState);

    return (
        <>
            <Container fixed maxWidth='md' id='register-component'>
                <br/><br/>
                MySets: {state.userProfile.createdSets}<br/>
            </Container>
        </>
    )
};

export default UserSets;