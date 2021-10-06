import {Container, Typography, Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import {useDispatch, useSelector} from "react-redux";
import {deleteSetReducer, profileState, updateSetReducer} from "../../state-slices/user-profile/profile-slice";
import {
    DataGrid,
    GridColDef,
    GridApi,
    GridCellValue
} from "@mui/x-data-grid";
import {SetDocument} from "../../models/set-document";
import {setErrorSeverity, showSnackbar} from "../../state-slices/error/errorSlice";
import {deleteSet, updateSet} from "../../remote/set-service";
import {SetDto} from '../../dtos/set-dto';
import { Tag } from "../../dtos/Tag";
import UpdateSetModal from "./UpdateSetModal";
import { updateSetState } from "../../state-slices/study-set/update-set-modal-slice";
import { saveSet, saveId } from "../../state-slices/study-set/update-set-modal-slice";
import { authState } from "../../state-slices/auth/auth-slice";

/**
 * Component for rendering a user's Sets.
 * Will contain a button to render a modal for adding sets.
 * Each set will have a button for editing or deleting the corresponding set and a link to the set.
 * @authors Cody McDonald, Mitchell Panenko
 * */

interface iUserSets {
    setUpdateSetName: (nextSetName: string) => void,
    setUpdateSetIsPublic: (nextSetIsPublic: boolean) => void,
    setUpdateSetTagNames: (nextTagNames: string[]) => void,
    setUpdateSetId: (nextSetId: string) => void,
    setUpdateIsOpen: (updateIsOpen: boolean) => void
}

const UserSets = (props: iUserSets) => {
    const state = useSelector(profileState);
    const dispatch = useDispatch();
    const userCreatedSets = state.userProfile.createdSets;
    const userId = state.userProfile.id;
    const currentSetState = useSelector(updateSetState);
    const auth = useSelector(authState).username;



    const columns: GridColDef[] = [
        {field: 'id', headerName: 'index', hide: true},
        {field: 'setId', headerName: 'setId', hide: true},
        {field: 'setName', headerName: 'Name', flex: 1},
        {field: 'tags', headerName: 'Tags', flex: 1},
        {field: 'isPublic', headerName: 'Public?', flex: 1},
        {field: 'views', headerName: 'Views', flex: 1},
        {field: 'plays', headerName: 'Plays', flex: 1},
        {field: 'studies', headerName: 'Studies', flex: 1},
        {field: 'favorites', headerName: 'Faves', flex: 1},
        {field: "updateSet",
            headerName: " ",
            sortable: false,
            width: 50,
            renderCell: (params) => {
                const updateSet = () => {
                    const api: GridApi = params.api;
                    const setFields = api.getRow(params.id);

                    props.setUpdateIsOpen(true);
                    let dto = { setName: setFields.setName,
                        isPublic: setFields.isPublic,
                        tags : setFields.tags as String[],
                        author : auth //just username
                        } as SetDto;
                
                    dispatch(saveSet(dto));
                    dispatch(saveId(setFields.id));

                    api.updateRows([{
                        id: params.id,
                        _action1: 'update'
                    }]);
                };

                return <IconButton onClick={() => {
                    updateSet()
                }}>
                    <UpdateIcon/>
                </IconButton>;
            }
        },
        {field: "deleteSet",
            headerName: " ",
            sortable: false,
            width: 50,
            renderCell: (params) => {
                const removeSet = () => {
                    const api: GridApi = params.api;
                    let rowId = api.getRow(params.id).setId;
                    delSet(rowId);
                    api.updateRows([{
                        id: params.id,
                        _action: 'delete'
                    }]);
                };

                return <IconButton onClick={() => {
                    removeSet()
                }}>
                    <DeleteIcon/>
                </IconButton>;
            }
        }
    ]


    const rows = userCreatedSets.map((set: SetDocument, index: any) => (
            {
                id: index,
                setId: set.id,
                setName: set.setName,
                tags: set.tags.map((x) => x.tagName),
                isPublic: set.isPublic,
                views: set.views,
                plays: set.plays,
                studies: set.studies,
                favorites: set.favorites
            }
        )
    )

    const delSet = async function (setId:string){
        try{
            let resp = await deleteSet(setId);
            dispatch(deleteSetReducer(setId));
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
            <br/><br/>
            {userCreatedSets.length ?
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
                    You haven't created any sets yet!
                </Typography>
            }
        </>
    )
};

export default UserSets;