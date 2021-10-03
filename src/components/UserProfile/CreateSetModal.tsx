import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserProfile from "./UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { isLoaded, loading, profileState, setProfile } from "../../state-slices/user-profile/profile-slice";
import { useEffect, useState } from "react";
import { getUserData } from "../../remote/user-service";
import { UserData } from "../../models/user-data";
import { User } from "../../models/user";
import { authState } from "../../state-slices/auth/auth-slice";
import { createStudySet } from "../../remote/set-service";
import { SetDto } from "../../dtos/set-dto";
import { appendNewTag, appendNewTagForm, closeModal, createSetState, openModal } from "../../state-slices/study-set/create-set-model-slice";
import React, {Component}  from 'react'

import { TextField } from "@material-ui/core";
import { SetDtoModel } from "../../models/create-set-model";
import { Tag } from "../../dtos/Tag";
import { TagFormModel } from "../../models/new-tag-form";

const CreateSetModal = (props: any) => {

  const [newSet, setNewSet] = useState({ setName: '', isPublic: false} as SetDtoModel)
  const [tagColor, setTagColor] = useState('');
  const [tagName, setTagName] = useState('');
  const dispatch = useDispatch();
  const user: User = useSelector(authState).authUser;
  const _createSetState= useSelector(createSetState);
  let isAtTagLimit : boolean = false;

  
  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setNewSet({
      ...newSet, [name]: value
    });
  }

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
        
        setTagColor('');
        setTagName('');
        let ntf : TagFormModel = { tagColor: '', TagName: '', tagAdded: false};
        dispatch(appendNewTagForm(ntf));
    }

    const addTag = (e: any , key: number) => {   
        // only allowing 10 or fewer tags per set
        if(key > 10)
        {
           isAtTagLimit = true;
        }
        let tag = {tagName: tagName , tagColor: tagColor } as Tag;
        dispatch(appendNewTag(tag));
        // flags given tag form to isAdded
        _createSetState.newTagForms[key].tagAdded = true;
        _createSetState.newTagForms[key].TagName = tagName;
        _createSetState.newTagForms[key].tagColor = tagColor;
    }

    const applyChanges = async function () {
        try {
            dispatch(loading());
            _createSetState.setToSave.author = user.username;
            let newly_created_set = await createStudySet(_createSetState.setToSave);
            
        } catch (e: any) {
            console.log(e);
        }
    }

   

    return (
        <div>
            
            <TextField onChange={handleChange} value={newSet.setName} />
            
            { _createSetState.newTagForms.map((F : TagFormModel , i) =>
                {<div key={i}>
                    
                    {_createSetState.newTagForms[i].tagAdded == false

                    ? 

                    <>
                    <TextField  name="tag color" id="filled-basic" label="Filled" variant="filled" onChange={updateTagColor} value={tagColor} />
                    <TextField   name="tag name" id="filled-basic" label="Filled" variant="filled" onChange={updateTagName} value={tagName}/>
                    <Button key={i} onClick={(e) => addTag(e , i)}>Create Tag</Button>
                    </>
                    
                    : 
                    
                    <>
                    <TextField name="tag color" id="filled-basic" label="Filled" variant="filled"  value={_createSetState.newTagForms[i].tagColor} />
                    <TextField  name="tag name" id="filled-basic" label="Filled" variant="filled"value={_createSetState.newTagForms[i].tagColor}/>
                     </> }
                </div>
                })
            }
                   
                {isAtTagLimit == false ? <Button onClick={createNewTagForm}>Add Tag</Button> : <></>}

                <Button onClick={applyChanges}>Apply</Button>
        </div>
    );
}

export default CreateSetModal;