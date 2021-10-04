import {Container, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {profileState} from "../../state-slices/user-profile/profile-slice";
import {Link} from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";
import {SetDocument} from "../../models/set-document";

/**
 * Component for rendering a user's Favorite sets.
 * Each set will have a link to the corresponding set and a button to remove the set from favorites.
 * @author Cody McDonald, Mitchell Panenko
 * */

const UserFavoriteSets = () => {
    const state = useSelector(profileState);
    const userFavorites = state.userProfile.favoriteSets;
    const columns = [
        {field: 'setName', headerName: 'Name', flex: 1},
        {field: 'author', headerName: 'Author', flex: 1},
        {field: 'tags', headerName: 'Tags', flex: 1},
        {field: 'isPublic', headerName: 'Public?', flex: 1},
        {field: 'views', headerName: 'Views', flex: 1},
        {field: 'plays', headerName: 'Plays', flex: 1},
        {field: 'studies', headerName: 'Studies', flex: 1},
        {field: 'favorites', headerName: 'Faves', flex: 1}
    ]

    const rows = userFavorites.map((set: SetDocument, index: any) => (
            {
                id: set.id,
                index: index,
                setName: set.setName,
                author: set.author,
                tags: set.tags.map((x)=>(x.tagName)),
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
                {userFavorites.length ?
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        autoHeight={true}
                        disableExtendRowFullWidth={true}
                        pagination={true}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                    :
                    <Typography>
                        You haven't added any sets to your favorites yet!<br/>
                        Go to the <Link to="/study">Discovery Page</Link> to find some!
                    </Typography>
                }
        </>
    )
};

export default UserFavoriteSets;