import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserProfile from "./UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { isLoaded, loading, profileState, setProfile } from "../../state-slices/user-profile/profile-slice";
import { useEffect } from "react";
import { getUserData } from "../../remote/user-service";
import { UserData } from "../../models/user-data";
import { User } from "../../models/user";
import { authState } from "../../state-slices/auth/auth-slice";
import { createSetState } from "../../state-slices/study-set/create-set-model-slice";

const UserProfileContainer = (props: any) => {
  const state = useSelector(profileState);
  const dispatch = useDispatch();
  const user: User = useSelector(authState).authUser;
  const createState = useSelector(createSetState);
 

   
    const getData = async function () {
        try {
            dispatch(loading());
            let userProfile = await getUserData(user.id);
            dispatch(setProfile(userProfile as UserData));
            dispatch(isLoaded());
        } catch (e: any) {
            console.log(e);
        }
    }

    // componentDidMount lifecycle
    useEffect(() => {
        getData();
    }, []);


    return (
        <div>
            <Accordion expanded>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    aria-label="Expand"
                    id="panel1a-header"
                >
                    <Typography>My Profile</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {state.isLoaded ? <UserProfile/> : 'Loading...'}
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>My Sets</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Placeholder
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography>My Favorite Sets</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Placeholder
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography>My Game Records</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Placeholder
                    </Typography>
                </AccordionDetails>
            </Accordion>
          
        </div>
    );
}

export default UserProfileContainer;