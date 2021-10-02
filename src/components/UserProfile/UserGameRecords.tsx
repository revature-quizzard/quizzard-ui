import { Container } from "@mui/material";
import { useSelector } from "react-redux";

import { profileState } from "../../state-slices/user-profile/profile-slice";

const UserGameRecords = () => {
    const state = useSelector(profileState);

    return (
        <>
            <Container fixed maxWidth='md' id='register-component'>
                <br/><br/>
                Game Record: {state.userProfile.gameRecords}
            </Container>
        </>
    )
};

export default UserGameRecords;