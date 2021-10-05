import {Button, Container, Input} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {User} from "../../models/user";
import {authState} from "../../state-slices/auth/auth-slice";
import {
    isLoaded,
    loading,
    profileState, setProfile,
    updateImageReducer,
    updateSelectedImage
} from "../../state-slices/user-profile/profile-slice";
import {setErrorSeverity, showSnackbar} from "../../state-slices/error/errorSlice";
import {getUserData, postProfilePicture} from "../../remote/user-service";
import {UserData} from "../../models/user-data";

/**
 * Component for displaying/changing a user's profile picture
 * @author Mitchell Panenko
 * */

const UserProfilePicture = () => {
    const state = useSelector(profileState);
    const dispatch = useDispatch();
    const user: User = useSelector(authState).authUser;

    const updateProfileImage = async function () {
        try {
            dispatch(loading());
            let imageUrl = await postProfilePicture(user.id, state.selectedImage);
            console.log(imageUrl);
            dispatch(updateImageReducer(imageUrl));
            dispatch(isLoaded());
        } catch (e: any) {
            console.log(e);
            dispatch(isLoaded());
        }
    }

    return (
        <>
            <Container  fixed maxWidth='md'>
                <br/><br/>
                {user.profilePicture? <img src={user.profilePicture} />: <img src="default_profile_picture.jpg" />}
                <div>
                    <Input
                        type="file"
                        onChange={(e) => {
                            // @ts-ignore
                            let file = (e.target as HTMLInputElement).files[0];
                            dispatch(updateSelectedImage(file));
                        }} />
                    <br/>
                    <Button
                        id='add-picture'
                        onClick={updateProfileImage}
                        variant='contained'
                        color='primary'
                    >
                      Update profile image!
                    </Button>
                </div>
            </Container>
        </>
    )
};

export default UserProfilePicture;