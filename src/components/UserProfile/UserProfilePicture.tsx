import {Container} from "@mui/material";
import {useSelector} from "react-redux";
import {User} from "../../models/user";
import {authState} from "../../state-slices/auth/auth-slice";
import {profileState} from "../../state-slices/user-profile/profile-slice";

/**
 * Component for displaying/changing a user's profile picture
 * @author Mitchell Panenko
 * */

const UserProfilePicture = () => {
    const state = useSelector(profileState);
    const user: User = useSelector(authState).authUser;
    const userId = state.userProfile.id;

    onFileChange = event => {
      dispatch(uploadImageReducer(userId, selectedFile: event.target.files[0]));
    };

    onFileUpload = () => {
          const formData = new FormData();
          formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
          );

          let resp = await postProfilePicture(formData,userId);
          dispatch(setErrorSeverity('info'));
          dispatch(showSnackbar("Profile picture updated!"));
    };

    return (
        <>
            <Container  fixed maxWidth='md'>
                <br/><br/>
                {user.profilePicture? <img src={user.profilePicture} />: <img src="default_profile_picture.jpg" />}
                <div>
                    <input type="file" onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>
                      Upload!
                    </button>
                </div>
            </Container>
        </>
    )
};

export default UserProfilePicture;