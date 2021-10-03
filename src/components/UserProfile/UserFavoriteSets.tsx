import {Container, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {profileState} from "../../state-slices/user-profile/profile-slice";
import {Link} from "react-router-dom";

/**
 * Component for rendering a user's Favorite sets.
 * Each set will have a link to the corresponding set and a button to remove the set from favorites.
 * @author Cody McDonald
 * */

const UserFavoriteSets = () => {
    const state = useSelector(profileState);
    const userFavorites = state.userProfile.favoriteSets;

    return (
        <>
            <Container fixed maxWidth='md' id='register-component'>
                {userFavorites.length ?
                    <Typography>
                        {JSON.stringify(userFavorites)}<br/>
                    </Typography>
                    :
                    <Typography>
                        You haven't added any sets to your favorites yet!<br/>
                        Go to the <Link to="/sets">Sets Page</Link> to find some!
                    </Typography>
                }
            </Container>
        </>
    )
};

export default UserFavoriteSets;