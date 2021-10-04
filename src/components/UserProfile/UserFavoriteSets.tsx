import {Container, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {profileState} from "../../state-slices/user-profile/profile-slice";
import {Link} from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";
import {SetDocument} from "../../models/set-document";

/**
 * Component for rendering a user's Favorite sets.
 * Each set will have a link to the corresponding set and a button to remove the set from favorites.
 * @author Cody McDonald
 * */

const UserFavoriteSets = () => {
    const state = useSelector(profileState);
    const userFavorites = state.userProfile.favoriteSets;
    const columns = [
        { field: 'setName', headerName: 'Name', width: 120},
        { field: 'tags', headerName: 'Tags', width: 150},
        { field: 'isPublic', headerName: 'Public?', width: 100},
        { field: 'views', headerName: 'Views', width: 100},
        { field: 'plays', headerName: 'Plays', width: 100},
        { field: 'studies', headerName: 'Studies', width: 100},
        { field: 'favorites', headerName: 'Faves', width: 120}
    ]

    const rows = userFavorites.map((set:SetDocument, index:any) => (
        {
            id: index,
            setName: set.setName,
            tags: set.tags,
            isPublic: set.isPublic,
            views: set.views,
            plays: set.plays,
            studies: set.studies,
            favorites: set.favorites
        }
        )

    )

    console.log(rows);

    return (
        <>
            <Container fixed maxWidth='md' id='register-component' sx={{height:'400px'}}>
                {userFavorites.length ?
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        pagination={true}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
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