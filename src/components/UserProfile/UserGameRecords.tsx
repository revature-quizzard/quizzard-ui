import {Container, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import { Link } from "react-router-dom";

import {profileState} from "../../state-slices/user-profile/profile-slice";

/**
 * Component for rendering a user's game records.
 * @author Cody McDonald
 * */

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
                        This segment is under construction, please look forward to it in a future update!<br/>
                        Go to the <Link to="/games">Game Page</Link> and join or create a game!
                    </Typography>
                }
            </Container>
        </>
    )
};

export default UserGameRecords;