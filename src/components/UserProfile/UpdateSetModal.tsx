import { Alert, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { isLoaded, loading, profileState, setProfile } from "../../state-slices/user-profile/profile-slice";
import { useEffect, useState } from "react";
import { User } from "../../models/user";
import { authState } from "../../state-slices/auth/auth-slice";
import { updateSet, getSetTags } from "../../remote/set-service";
import { SetDto } from "../../dtos/set-dto";
import { appendNewTag, appendNewTagForm, clearTagFrombyIndex, clearTags, closeModal, deleteTag, incrementTagLimit, openModal, saveSet, setIsPublic, updateTagFormbyIndex  } from "../../state-slices/study-set/update-set-modal-slice";
import Switch from '@mui/material/Switch';
import { FormControl, IconButton, InputLabel, MenuItem, Select, TextField  } from "@material-ui/core";
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import { Tag } from "../../dtos/Tag";
import { TagFormModel } from "../../models/new-tag-form";
import { SaveTagFormModel } from "../../models/save-tag-form-model";
import { errorState } from "../../state-slices/error/errorSlice";
import LabelIcon from '@mui/icons-material/Label';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core';
import { useHistory } from "react-router";
import { updateSetState } from "../../state-slices/study-set/update-set-modal-slice";

/**
 * Allows user to create set with multiple tags.
 * Renders itself.
 * @author Alfonso Holmes
 * */

interface iUpdateSetModal {
    setId: string,
    setName: string,
    isPublic: boolean,
    tagNames: string[],
    dummySwitch: boolean,
    setDummySwitch: (nextDummySwitchVal: boolean) => void,
    setUpdateIsOpen: (nextIsOpenVal: boolean) => void
}

const UpdateSetModal = (props: iUpdateSetModal) => {

  const [newSet, setNewSet] = useState(props.setName);
  const [tagColor, setTagColor] = useState('');
  const [tagName, setTagName] = useState('');
  const [checked, setChecked] = useState(false);
  const [allTags , setAllTags] = useState([] as Tag[]);
  const dispatch = useDispatch();
  const user: User = useSelector(authState).authUser;
  const _updateSetState= useSelector(updateSetState);
  const error_state= useSelector(errorState);
  let isAtTagLimit : boolean = false;
  let k : number = 0;
  let _setIsPublic : boolean = false;
  let history = useHistory();

  const handleChange = (e: any) => {
     
    setNewSet(e.target.value);
  }
 

  useEffect(() => {
    async function getTags()
    {
        try{
              let response = await getSetTags();  
        setAllTags(response);
        }catch(e: any){
          console.log(e);
          setAllTags([{tagName: 'oop' , tagColor: 'blue'} ,
           {tagName: 'java' , tagColor: 'red'} ,
           {tagName: 'lisov substitution' , tagColor: 'yellow'} ,
           {tagName: 'python' , tagColor: 'black'}
          ] as Tag[])
        }
      
    }

    getTags();
  }, []); // <-- empty array means 'run once'

  const updateTagColor = (e: any) => {
   
  }

  const updateTagNameAndColor = (e: any , key: number) => {
    setTagName(allTags[key].tagName);
    setTagColor(allTags[key].tagColor);
    console.log(tagName);
    console.log(tagColor);
  }
    const handleClose = () => {
        dispatch(closeModal);

    }

    const handleOpen = () => {
        dispatch(openModal);
    }

    const createNewTagForm = () => {  
        console.log(_updateSetState.tagLimit);
        if( _updateSetState.tagLimit < 10)
        {
          //  setNewTagFromState( _updateSetState.newTagForms as TagFormModel[]);
           
            let ntf : TagFormModel = { tagColor: '' , TagName: '' , tagAdded: false};
            dispatch(appendNewTagForm(ntf)); 
            isAtTagLimit = false;
        }else{
            isAtTagLimit = true;
        }
        
        dispatch(incrementTagLimit);
       
    }

    const ClearTags = (e: any ) => {  
        dispatch(clearTags);
        console.log(_updateSetState.setToSave.tags + " " + _updateSetState.newTagForms );
    }

    const removeTag = (e: any , key: number) => {   
        let formToSave_w_key: SaveTagFormModel = { tagColor: '' , tagName: '' ,  tagAdded: true , index: key}
        dispatch(deleteTag(formToSave_w_key));
    }

    const addTag = (e: any , key: number) => {   
        // only allowing 10 or fewer tags per set
        
        if(tagName && tagColor)
        {
           
        dispatch(appendNewTag(tagName));
        // saving form and weather ist been added or not for future reference
        
        let formToSave_w_key: SaveTagFormModel = { tagColor: tagColor , tagName: tagName , tagAdded: true , index: key};
        dispatch(updateTagFormbyIndex(formToSave_w_key));
        console.log("TAGS ON SET TO SEND : " ,  _updateSetState.setToSave.tags);
        }
        else{
            
        }
        
    }

    const clearTargetForm = (e: any , key: number) => {   
        // only allowing 10 or fewer tags per set
        
       
        let cleard_form_w_key: SaveTagFormModel = {tagColor: '' , tagName: '' , tagAdded: false , index: key}
        dispatch(clearTagFrombyIndex(cleard_form_w_key));
    }

    const toggleSetStatus = () => {
        console.log('toggle hit');
        dispatch(setIsPublic());
        setChecked(!checked);
        console.log(`checked: ${checked}`);
    }

    useEffect(() => {
        if(props.isPublic) {
            console.log('isPublic is true');
            toggleSetStatus();
        }
    }, []);
   
    const applyChanges = async function () {
        
            try {
                dispatch(loading());
                let setToSave_ : SetDto = {setName: newSet , isPublic: checked , tags : _updateSetState.setToSave.tags} as SetDto
                dispatch(saveSet(setToSave_));
                console.log("SET TO SAVE : " , setToSave_);
                let newly_created_set = await updateSet(props.setId, setToSave_);
                console.log("NEWLY CREATED SET : " ,  newly_created_set);
                dispatch(clearTags());
                setNewSet('');
                props.setDummySwitch(!props.dummySwitch);
                props.setUpdateIsOpen(false);
                // dispatch(resetCurrentSetToSave());
                
            } catch (e: any) {
                console.log(e);
                dispatch(clearTags());
                // dispatch(resetCurrentSetToSave());
                setNewSet('');
            }
    }

   const useStyles = makeStyles({
        box: {
            justifyContent: "center",
            textAlign: 'center',    
            margin: 'auto',
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            backgroundColor: '#FFFFFF',
            border: '2px solid #000',
            p: 4,
        }
    });

    
    const classes = useStyles();

    return (
        <Box  style={{background: "#332347 ",  border: '.4em solid #7D7687'}}className={classes.box}>
            <div>
            <br /><Typography variant="h4">UPDATE SET</Typography> <br />
                <div >
                <TextField label="set name" onChange={handleChange} defaultValue={props.setName} value={newSet} />
                <br/>
                <p>private <Switch checked={checked} style={{color:"#7D7687" }}  onClick={toggleSetStatus}/> public</p> 
                </div >
                    <hr/>
                        { _updateSetState.newTagForms?.map((F : TagFormModel | undefined , i) =>
                            { 
                            return <div key={i}>
                        
                                {_updateSetState.newTagForms[i].tagAdded == false 

                                ? 

                                <>
                                <FormControl variant="standard" style={{ margin: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Tags</InputLabel>
                                    <Select
                                                        labelId="demo-simple-select-standard-label"
                                                        id="demo-simple-select-standard"
                                                        value={tagName}
                                                        //onChange={}
                                                        label="Age"
                                                        > 
                                            {allTags.map((T : Tag | undefined , i) =>{

                                                return   <MenuItem value={T.tagName} key={i}  onClick={(e) => updateTagNameAndColor(e , i)}><LabelIcon style={{color: T.tagColor}}/><em>{T.tagName} </em>  </MenuItem>
                                                    
                                                })}

                                        </Select>
                                </FormControl>
                                <br/>
                                <Button key={i}  variant="contained" style={{background: '#4E3E61' , color: '#7D7687'}} onClick={(e) => addTag(e , i)}>Add Tag</Button>
                                </>
                                
                                : 
                                
                                <>
                                { newSet === '' ? <></> : <> <p> <LabelIcon style={{color: _updateSetState.newTagForms[i].tagColor}} />  {_updateSetState.newTagForms[i].TagName}</p>
                            
                                <Button style={{background: '#4E3E61'  , color: 'red'}} onClick={(e) => removeTag(e , i)} startIcon={<DeleteSharpIcon />}>
                                    Remove
                                </Button>
                            
                                <Alert  severity="success">Added!</Alert>  <hr/> </>}
                                
                            
                                <br/>
                                </> }
                            </div>
                            })
                        }
                                {isAtTagLimit == false ? <Button style={{padding: '1em' ,color: '#4E3E61', marginLeft:'50%'}}  onClick={createNewTagForm} startIcon={<LabelIcon />}> New Tag</Button> : <></>}
                        <br/>

                    <Button   style={{ background: '#7D7687' ,color: '#4E3E61' , marginBottom:'8%'}} onClick={applyChanges}>Apply</Button>

            </div>
        </Box>
    );
}

const useStyles = makeStyles({
    updateSetModal: {
        backgroundColor: '#ffffff'
    }
});

export default UpdateSetModal;

function resetSet(resetSet: any) {
    throw new Error("Function not implemented.");
}
