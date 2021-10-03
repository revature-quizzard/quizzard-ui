import {Container, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {profileState} from "../../state-slices/user-profile/profile-slice";

const UserSets = () => {
    const state = useSelector(profileState);
    const userCreatedSets = state.userProfile.createdSets;


    return (
        <>
            <Container fixed maxWidth='md' id='register-component'>
                <br/><br/>
                {userCreatedSets.length ?
                    <Typography>
                        MySets : {JSON.stringify(userCreatedSets)}<br/>
                    </Typography>
                    :
                    // TODO: Hook this up when create set component is made
                    <Typography>
                        You haven't created any sets!
                        Click here to create your first set!
                    </Typography>
                }
            </Container>
        </>
    )
};

export default UserSets;