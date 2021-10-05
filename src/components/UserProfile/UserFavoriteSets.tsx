import {Container, IconButton, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {deleteFavoriteReducer, isLoaded, loading, profileState} from "../../state-slices/user-profile/profile-slice";
import {Link} from "react-router-dom";
import {DataGrid, GridApi, GridColDef} from "@mui/x-data-grid";
import {SetDocument} from "../../models/set-document";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteFavorite} from "../../remote/user-service";
import {setErrorSeverity, showSnackbar} from "../../state-slices/error/errorSlice";

/**
 * Component for rendering a user's Favorite sets.
 * Each set will have a link to the corresponding set and a button to remove the set from favorites.
 * @author Cody McDonald, Mitchell Panenko
 * */

const UserFavoriteSets = () => {
    const state = useSelector(profileState);
    const dispatch = useDispatch();
    const userFavorites = state.userProfile.favoriteSets;
    const userId = state.userProfile.id;

    const columns : GridColDef[] = [
        {field: 'id', headerName: 'index', hide: true},
        {field: 'setId', headerName: 'setId', hide: true},
        {field: 'setName', headerName: 'Name', flex: 1},
        {field: 'author', headerName: 'Author', flex: 1},
        {field: 'tags', headerName: 'Tags', flex: 1},
        {field: 'isPublic', headerName: 'Public?', flex: 1},
        {field: 'views', headerName: 'Views', flex: 1},
        {field: 'plays', headerName: 'Plays', flex: 1},
        {field: 'studies', headerName: 'Studies', flex: 1},
        {field: 'favorites', headerName: 'Faves', flex: 1},
        {
            field: "",
            headerName: " ",
            sortable: false,
            width: 50,
            renderCell: (params) => {
                const removeSetFromUserFavorites = () => {
                    const api: GridApi = params.api;
                    let rowId = api.getRow(params.id).setId;
                    console.log(rowId);
                    removeFavorite(rowId);
                    api.updateRows([{
                        id: params.id,
                        _action: 'delete'
                    }]);
                };

                return <IconButton onClick={() => {
                    removeSetFromUserFavorites()
                }}>
                    <DeleteIcon/>
                </IconButton>;
            }
        }
    ];

    const rows = userFavorites.map((set: SetDocument, index: any) => (
            {
                id: index,
                setId: set.id,
                setName: set.setName,
                author: set.author,
                tags: set.tags.map((x) => (x.tagName)),
                isPublic: set.isPublic,
                views: set.views,
                plays: set.plays,
                studies: set.studies,
                favorites: set.favorites
            }
        )
    )

    const removeFavorite = async function (setId:string){
        try{
            let resp = await deleteFavorite(setId, userId);
            dispatch(deleteFavoriteReducer(setId));
            dispatch(setErrorSeverity('info'));
            dispatch(showSnackbar("Favorite deleted!"));
        } catch (e:any){
            console.log(e.message);
                dispatch(setErrorSeverity('error'));
            dispatch(showSnackbar("There was an issue while trying to delete, please try again later."));
        }
    }

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