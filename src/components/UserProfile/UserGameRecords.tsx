import {Container, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import { Link } from "react-router-dom";

import {profileState} from "../../state-slices/user-profile/profile-slice";

const UserGameRecords = () => {
    const state = useSelector(profileState);
    const userGameRecords = state.userProfile.gameRecords;

    return (
        <>
            <Container fixed maxWidth='md' id='register-component'>
                {userGameRecords.length ?
                    <Typography>
                        {JSON.stringify(userGameRecords)}<br/>
                    </Typography>
                    :
                    <Typography>
                        You haven't played any games yet!<br/>
                        Go to the <Link to="/games">Game Page</Link> and join or create your first game!
                    </Typography>
                }
            </Container>
        </>
    )
};

export default UserGameRecords;