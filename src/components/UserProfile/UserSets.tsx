import {Container, Typography, Button, IconButton, Modal, Box} from "@mui/material";
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
import {SetDto} from '../../dtos/set-dto';
import { Tag } from "../../dtos/Tag";
import UpdateSetModal from "./UpdateSetModal";
import {addCard, updateSet, deleteSet, getSetById} from "../../remote/set-service";
import React, {useState} from "react";
import {Form} from "react-bootstrap";
import AddIcon from '@mui/icons-material/Add';
import {Set} from "../../dtos/Set";
import {StudySet} from "../../state-slices/sets/create-study-sets-slice";
import {useHistory} from "react-router-dom";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

/**
 * Component for rendering a user's Sets.
 * Will contain a button to render a modal for adding sets.
 * Each set will have a button for editing or deleting the corresponding set and a link to the set.
 * @authors Cody McDonald, Mitchell Panenko, Jose Tejada
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
    let history = useHistory();


    const [open, setOpen] = React.useState(false);


    const [setID, setSetId] = useState('')
    const[newCard, setNewCard] = useState({
        question: '',
        answer:''
    })

    //used on the button that will open the modal
    function handleOpen(){

        setOpen(true)
    }
    ///used to close the modal
    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setNewCard({...newCard, [name]: value})

    }
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        modalbuttin: {
          background: '#7D7687' ,
           color: '#4E3E61'
        }
    };

    function addCardToSet(){
        let card = {
            setId:setID,
            question:newCard.question,
            answer:newCard.answer
        }
        console.log(card)
        addNewCard(card)
        handleClose()

    }
    function handleSetState(s:Set){
        dispatch(StudySet(s))
        history.push("/userCards/")
    }



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
                    props.setUpdateSetName(setFields.setName);
                    props.setUpdateSetIsPublic(setFields.isPublic);
                    props.setUpdateSetTagNames(setFields.tags);
                    props.setUpdateSetId(setFields.setId);
                    props.setUpdateIsOpen(true);
                    // let rowId = api.getRow(params.id).setId;
                    // let setDto = new SetDto(api.getRow(params.id).setName, api.getRow(params.id).isPublic, api.getRow(params.id).tags, '');
                    //  upSet(rowId, setDto); 
                    api.updateRows([{
                        id: params.id,
                        _action1: 'update'
                    }]);
                };

                return <IconButton onClick={() => {
                    updateSet()
                }}>
                    <UpdateIcon style={{color: "#EF8D22 "}}/>
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
                    <DeleteIcon style={{color: "red"}}/>
                </IconButton>;
            }
        },
        {
            field: "Add new Card",
            headerName: "addCard ",
            sortable: false,
            width: 50,
            renderCell: (params) => {
                const NewCard = () => {
                    const api: GridApi = params.api;
                    let rowId = api.getRow(params.id).setId;
                    setSetId(rowId)


                };

                return <IconButton onClick={() => {
                    NewCard()
                    handleOpen()
                }}>
                    <AddIcon style={{color: "green"}}/>
                </IconButton>;
            }
        },
        {
            field: "View Cards",
            headerName: "View Cards ",
            sortable: false,
            width: 50,
            renderCell: (params) => {
                const ViewSetCard = async () => {
                    const api: GridApi = params.api;
                    let rowId = api.getRow(params.id).setId;
                    let resp = getSet(rowId)





                };

                return <IconButton onClick={() => {

                    ViewSetCard()
                }}>
                    <RemoveRedEyeIcon style={{color: "grey"}}/>
                </IconButton>;
            }

        }
    ]

    const addNewCard = async function (card:{setId:string, question:string, answer:string}){
        try{
            let resp = await addCard(card)



        }catch (e:any){
            console.log(e.message)
        }

    }

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

    const getSet = async function (setId:string){
        try{
            let set = await getSetById(setId)
            handleSetState(set)
        }catch(e:any){
            console.log(e.messege)
        }
    }

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
                    style={{background: "white" ,  color: 'grey' }}
                />
                :
                <Typography>
                    You haven't created any sets yet!
                </Typography>
            }
            <div>
            <div>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box style={{background: "#332347 ",  border: '.4em solid #7D7687'}}sx={style}>
                        <Form >
                            <h2>Add a new card</h2>
                            <Form.Group>
                                <Form.Label>Question: </Form.Label>
                                <Form.Control
                                    name="question"
                                    value={newCard.question}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="question"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Answer: </Form.Label>
                                <Form.Control
                                    name="answer"
                                    value={newCard.answer}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="answer"
                                />
                            </Form.Group>
                        </Form>
                        <Button  style={{ background: '#4E3E61' , color:'#7D7687' }} onClick={addCardToSet} variant="contained" color="success">
                           ADD CARD
                        </Button>

                    </Box>
                </Modal>
            </div>
        </div>

        </>
    )
};

export default UserSets;