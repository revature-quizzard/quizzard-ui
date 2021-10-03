import { Accordion, AccordionDetails, AccordionSummary, Alert, Button, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserProfile from "./UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { isLoaded, loading, profileState, setProfile } from "../../state-slices/user-profile/profile-slice";
import { useEffect, useState } from "react";
import { User } from "../../models/user";
import { authState } from "../../state-slices/auth/auth-slice";
import { createStudySet } from "../../remote/set-service";
import { SetDto } from "../../dtos/set-dto";
import { appendNewTag, appendNewTagForm, clearTags, closeModal, createSetState, deleteTag, incrementTagLimit, openModal, updateTagFormbyIndex } from "../../state-slices/study-set/create-set-model-slice";
import React, {Component}  from 'react'

import { IconButton, TextField  } from "@material-ui/core";
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import CancelIcon from '@mui/icons-material/Cancel';
import { SetDtoModel } from "../../models/create-set-model";
import { Tag } from "../../dtos/Tag";
import { TagFormModel } from "../../models/new-tag-form";
import { SaveTagFormModel } from "../../models/save-tag-form-model";

const CreateSetModal = (props: any) => {

  const [newSet, setNewSet] = useState('')
  const [tagColor, setTagColor] = useState('');
  const [tagName, setTagName] = useState('');
  const [newTagFromState , setNewTagFromState] = useState([{ tagColor: '', TagName: '', tagAdded: false} as TagFormModel] as TagFormModel[]);
  const dispatch = useDispatch();
  const user: User = useSelector(authState).authUser;
  const _createSetState= useSelector(createSetState);
  let isAtTagLimit : boolean = false;
  let k : number = 0;
  let loc
  const handleChange = (e: any) => {
     
    setNewSet(e.target.value);
  }

//   const updateTagColor = (e: any) => {
//     setTagColor(e.target.value);
//   }

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
            setNewTagFromState( _createSetState.newTagForms as TagFormModel[]);
           
            let ntf : TagFormModel = { tagColor: '', TagName: '', tagAdded: false};
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

        
        let formToSave_w_key: SaveTagFormModel = { tagColor: tagColor.toString(), tagName: tagName.toString() , tagAdded: true , index: key}
        dispatch(deleteTag(formToSave_w_key));
    }

    const addTag = (e: any , key: number) => {   
        // only allowing 10 or fewer tags per set
        
        if(tagName && tagColor)
        {
           let tag = {tagName: tagName.toString() , tagColor: tagColor.toString() } as Tag;
           console.log(tag)
        dispatch(appendNewTag(tag));
        // saving form and weather ist been added or not for future reference
        let formToSave_w_key: SaveTagFormModel = { tagColor: tagColor.toString(), tagName: tagName.toString() , tagAdded: true , index: key}
        dispatch(updateTagFormbyIndex(formToSave_w_key));
        console.log(_createSetState.setToSave.tags);
        }
        
    }

    const applyChanges = async function () {
        
        
            try {
                dispatch(loading());
                _createSetState.setToSave.setName = newSet;
                _createSetState.setToSave.author = user.username;
                let newly_created_set = await createStudySet(_createSetState.setToSave , user.token);
                _createSetState.newTagForms = [{ tagColor: '', TagName: '', tagAdded: false}];
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
                    
                    {_createSetState.newTagForms[i].tagAdded == false && _createSetState.newTagForms[i] != undefined

                    ? 

                    <>
                    <TextField  name="tag color" id="filled-basic" label="tag color" variant="standard"   onChange={(e) => updateTagColor(e)} value={tagColor} />
                    <br/>
                    <TextField   name="tag name" id="filled-basic" label="tag name" variant="standard"  onChange={(e) => updateTagName(e)} value={tagName}/>
                    <br/>
                    <Button key={i}  variant="contained" style={{background: 'white' , color: '#4E3E61'}} onClick={(e) => addTag(e , i)}>Create Tag</Button>
                    <Button style={{background: 'white'  , color: 'red'}} onClick={(e) => addTag(e , i)} startIcon={<CancelIcon />}>
                       cancle
                    </Button>
                    </>
                    
                    : 
                    
                    <>
                    <TextField name="tag color" id="filled-basic" label="tag color" variant="standard"  value={_createSetState.newTagForms[i].tagColor} />
                    <br/>
                    <TextField   name="tag name" id="filled-basic" label="tag name" variant="standard"value={_createSetState.newTagForms[i].TagName}/>
                  
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
                      {isAtTagLimit == false ? <Button style={{padding: '1em', color: 'green'}} onClick={createNewTagForm}>Add New Tag</Button> : <></>}
                    <Button variant="contained" style={{background: 'white' , color: '#4E3E61'}} onClick={(e) => ClearTags(e)}>Clear Tags</Button>
               <br/>

                <Button style={{background: ' ' , color: '#4E3E61'}} onClick={applyChanges}>Apply</Button>
        </div>
    );
}

export default CreateSetModal;