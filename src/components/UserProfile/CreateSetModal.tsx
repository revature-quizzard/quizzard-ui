import { Accordion, AccordionDetails, AccordionSummary, Alert, Button, makeStyles, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { isLoaded, loading, profileState, setProfile } from "../../state-slices/user-profile/profile-slice";
import { useEffect, useState } from "react";
import { User } from "../../models/user";
import { authState } from "../../state-slices/auth/auth-slice";
import { createStudySet, getSetTags } from "../../remote/set-service";
import { SetDto } from "../../dtos/set-dto";
import { appendNewTag, appendNewTagForm, clearTagFrombyIndex, clearTags, closeModal, createSetState, deleteTag, incrementTagLimit, openModal, saveSet, updateTagFormbyIndex } from "../../state-slices/study-set/create-set-model-slice";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { FormControl, IconButton, InputLabel, MenuItem, Select, TextField  } from "@material-ui/core";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import CancelIcon from '@mui/icons-material/Cancel';
import { SetDtoModel } from "../../models/create-set-model";
import { Tag } from "../../dtos/Tag";
import { TagFormModel } from "../../models/new-tag-form";
import { SaveTagFormModel } from "../../models/save-tag-form-model";
import { errorState } from "../../state-slices/error/errorSlice";


import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Popover from '@mui/material/Popover';
import { style } from "@mui/system";
import { ClassNames, useTheme } from "@emotion/react";
import { getJSDocTags } from "typescript";



/**
 * Allows user to create set with multiple tags.
 * Renders itself.
 * @author Alfonso Holmes
 * */

const CreateSetModal = (props: any) => {

  const [newSet, setNewSet] = useState('')
  const [tagColor, setTagColor] = useState('');
  const [tagName, setTagName] = useState('');
  const [allTags , setAllTags] = useState([] as Tag[]);
  const dispatch = useDispatch();
  const user: User = useSelector(authState).authUser;
  const _createSetState= useSelector(createSetState);
  const error_state= useSelector(errorState);
  let isAtTagLimit : boolean = false;
  let k : number = 0;
  let loc


  const handleChange = (e: any) => {
     
    setNewSet(e.target.value);
  }
 

  useEffect(() => {
    async function getTags()
    {
        try{
              let response = await getSetTags(user.token);  
        setAllTags(response);
        }catch(e: any){
          console.log(e);
        }
      
    }

    getTags();
  }, []); // <-- empty array means 'run once'

//   const updateTagName = (e: any) => {
//     setTagName(e.target.value);
//   }
  const updateTagColor = (e: any) => {
    setTagColor(e.target.value);
  }
  const updateTagName = (e: any) => {
    setTagName(e.target.value);
  }
    const handleClose = () => {
        dispatch(closeModal);

    }

    const handleOpen = () => {
        dispatch(openModal);
    }

    const createNewTagForm = () => {  
        console.log(_createSetState.tagLimit);
        if( _createSetState.tagLimit < 10)
        {
          //  setNewTagFromState( _createSetState.newTagForms as TagFormModel[]);
           
            let ntf : TagFormModel = { tags: [], tagAdded: false};
            dispatch(appendNewTagForm(ntf)); 
            isAtTagLimit = false;
        }else{
            isAtTagLimit = true;
        }
        
        dispatch(incrementTagLimit);
       
    }

    const ClearTags = (e: any ) => {  
       
        dispatch(clearTags);
        console.log(_createSetState.setToSave.tags + " " + _createSetState.newTagForms );
    }
    const removeTag = (e: any , key: number) => {   

        
        let formToSave_w_key: SaveTagFormModel = { tags: allTags ,  tagAdded: true , index: key}
        dispatch(deleteTag(formToSave_w_key));
    }

    const addTag = (e: any , key: number) => {   
        // only allowing 10 or fewer tags per set
        
        if(tagName && tagColor)
        {
           
        dispatch(appendNewTag(tagName));
        // saving form and weather ist been added or not for future reference
        let formToSave_w_key: SaveTagFormModel = { tags: allTags, tagAdded: true , index: key}
        dispatch(updateTagFormbyIndex(formToSave_w_key));
        console.log(_createSetState.setToSave.tags);
        }
        else{
            
        }
        
    }

    const clearTargetForm = (e: any , key: number) => {   
        // only allowing 10 or fewer tags per set
        
       
        let cleard_form_w_key: SaveTagFormModel = { tags: allTags , tagAdded: false , index: key}
        dispatch(clearTagFrombyIndex(cleard_form_w_key));
    }
   

    const applyChanges = async function () {
        
        
            try {
                dispatch(loading());
                let setToSave : SetDto = {author: user.username , setName: newSet , isPublic: false , tags : _createSetState.setToSave.tags} as SetDto
                dispatch(saveSet(setToSave));
                let newly_created_set = await createStudySet(_createSetState.setToSave , user.token);
                dispatch(clearTags);
                console.log(newly_created_set);
            } catch (e: any) {
                console.log(e);
            }
        
       
    }

   

    return (
        <div>
                

            <TextField label="set name" onChange={handleChange} value={newSet} />
                <hr/>

                    { _createSetState.newTagForms.map((F : TagFormModel | undefined , i) =>
                     { 
                   return <div key={i}>
                    
                    {_createSetState.newTagForms[i].tagAdded == false 

                    ? 

                    <>
                    <FormControl variant="standard" style={{ margin: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Tags</InputLabel>
                         
                                  {allTags.map((T : Tag | undefined , i) =>{

                                    return   <Select
                                            key={i}
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={allTags[i].tagName.toString()}
                                            onChange={updateTagName}
                                            label="Age"
                                            > <MenuItem value={T.tagName} ><em>None</em> <FiberManualRecordIcon style={{color: T.tagColor}} /></MenuItem>
                                            </Select>
                                    })}

                            
                    </FormControl>
                    <Button key={i}  variant="contained" style={{background: 'white' , color: '#4E3E61'}} onClick={(e) => addTag(e , i)}>Create Tag</Button>
                    <Button style={{background: 'white'  , color: 'red'}} onClick={(e) => clearTargetForm(e , i)} startIcon={<CancelIcon />}>
                       cancle
                    </Button>
                    </>
                    
                    : 
                    
                    <>
                    <TextField name="tag color" id="filled-basic" label="tag color" variant="standard"  value={_createSetState.newTagForms[i].tags[i].tagColor} />
                    <br/>
                    <TextField   name="tag name" id="filled-basic" label="tag name" variant="standard"value={_createSetState.newTagForms[i].tags[i].tagName}/>
                  
                    <br/> 
                    <Button style={{background: 'white'  , color: 'red'}} onClick={(e) => removeTag(e , i)} startIcon={<DeleteSharpIcon />}>
                        Remove
                    </Button>
                  
                    <Alert severity="success">Added!</Alert> 
                    
                    <hr/>
                    <br/>
                     </> }
                </div>
                })
            }
                      <Button variant="contained" style={{background: 'white' , color: '#4E3E61' }} onClick={(e) => ClearTags(e)}>Clear Tags</Button>
                    {isAtTagLimit == false ? <Button style={{padding: '1em', color: 'green' , marginLeft:'10%'}} onClick={createNewTagForm} startIcon={<ControlPointIcon />}> Tag</Button> : <></>}
               <br/>

                <Button style={{background: ' ' , color: '#4E3E61'}} onClick={applyChanges}>Apply</Button>
        </div>
    );
}

export default CreateSetModal;