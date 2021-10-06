import {Accordion, AccordionDetails, AccordionSummary, Modal, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserProfile from "./UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { isLoaded, loading, profileState, setProfile } from "../../state-slices/user-profile/profile-slice";
import { useEffect, useState } from "react";
import { getUserData } from "../../remote/user-service";
import {UserData} from "../../models/user-data";
import {User} from "../../models/user";
import {authState} from "../../state-slices/auth/auth-slice";
import {createSetState} from "../../state-slices/study-set/create-set-model-slice";
import CreateSetModal from "./CreateSetModal";
import UpdateSetModal from "./UpdateSetModal";
import UserGameRecords from "./UserGameRecords";
import UserFavoriteSets from "./UserFavoriteSets";
import UserSets from "./UserSets";
import {Gif} from "@material-ui/icons";

const UserProfileContainer = (props: any) => {
  const state = useSelector(profileState);
  const dispatch = useDispatch();
  const user: User = useSelector(authState).authUser;
  const createState = useSelector(createSetState);
 
  /* [Duct Tape] these states are for the UpdateSets modal */
  const [updateSetName, setUpdateSetName] = useState(undefined as string);
  const [updateSetIsPublic, setUpdateSetIsPublic] = useState(undefined as boolean);
  const [updateSetTagNames, setUpdateSetTagNames] = useState(undefined as string[]);
  const [updateSetId, setUpdateSetId] = useState(undefined as string);
  const [updateIsOpen, setUpdateIsOpen] = useState(false);

  const [dummySwitch, setDummySwitch] = useState(false);

    /**
     * Main parent component for user profile. Retrieves user data and persists it to profile state.
     * Renders UserProfile, UserSets, UserFavoriteSets, and UserGameRecords upon successful retrieval.
     * @author Cody McDonald
     * */



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
    }, [dummySwitch]);

    return (
        <div>
            <Accordion expanded>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    aria-label="Expand"
                    id="panel1a-header"
                >
                    <Typography><h1>My Profile<span style={{color: '#75BC3E'}}> <b>|</b>  </span></h1></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {state.isLoaded ? <UserProfile/> : <> loading...<img className="welcomeBanner" src="wizard.gif" alt="qwizard" height="50px" /> </>}
                </AccordionDetails>
            </Accordion>
            <hr/>
            <Accordion style={{background: "#332347 ", color: '#7D7687 '}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>{state.isLoaded == false ? <> <span style={{color: 'red'}}><b>|</b>  </span> My
                        Sets </> : <> <span style={{color: '#75BC3E'}}><b>|</b>  </span> My Sets </>}</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <Typography >
                        {state.isLoaded ? <UserSets setUpdateIsOpen={setUpdateIsOpen} setUpdateSetId={setUpdateSetId}
                            setUpdateSetName={setUpdateSetName} setUpdateSetIsPublic={setUpdateSetIsPublic} setUpdateSetTagNames={setUpdateSetTagNames}
                        /> :  <> loading...<img className="welcomeBanner" src="wizard.gif" alt="qwizard" height="30px" /> </>}

                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion style={{background: "#332347 ", color: '#7D7687 '}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography>{state.isLoaded == false ? <> <span style={{color: 'red'}}><b>|</b>  </span> My Favorite
                        Sets</> : <> <span style={{color: '#75BC3E'}}><b>|</b>  </span> My Favorite
                        Sets </>}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {state.isLoaded ? <UserFavoriteSets/> :<> loading...<img className="welcomeBanner" src="wizard.gif" alt="qwizard" height="30px" /> </>}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <hr/>
            <Accordion style={{background: "#332347 ", color: '#7D7687 '}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography>{state.isLoaded == false ? <> <span style={{color: 'red'}}><b>|</b>  </span> My Game
                        Records </> : <> <span style={{color: '#75BC3E'}}><b>|</b>  </span> My Game
                        Records </>}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <b> Q W I Z Z A R D <span style={{color: '#EF8D22'}}>Online</span>{state.isLoaded ?
                            <span style={{color: '#75BC3E'}}>.</span> : <span style={{color: 'red'}}>.</span>}</b>

                        {state.isLoaded ? <UserGameRecords/> : <> loading...<img className="welcomeBanner" src="wizard.gif" alt="qwizard" height="30px" /> </>}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <div>
                <hr/>
            </div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography>{state.isLoaded == false ? <> <span style={{color: 'red'}}><b>|</b>  </span> Create New
                        Set </> : <> <span style={{color: '#75BC3E'}}><b>|</b>  </span> Create New Set </>}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>

                        {state.isLoaded ? <CreateSetModal dummySwitch={dummySwitch} setDummySwitch={setDummySwitch}/> : <> loading...<img className="welcomeBanner"
                                                                                src="wizard.gif" alt="qwizard"
                                                                                height="50px"/>  </>}

                    </Typography>
                </AccordionDetails>

            </Accordion>

            <Modal
                open={updateIsOpen}
                onClose={() => {
                    setUpdateIsOpen(false);
                }}
            >
                <UpdateSetModal setId={updateSetId} setName={updateSetName} isPublic={updateSetIsPublic} tagNames={updateSetTagNames}
                    dummySwitch={dummySwitch} setDummySwitch={setDummySwitch} setUpdateIsOpen={setUpdateIsOpen} />
            </Modal>
          
        </div>
    );
}

export default UserProfileContainer;