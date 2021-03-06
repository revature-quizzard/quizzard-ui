import { Accordion, AccordionDetails, AccordionSummary, Alert, Button, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { isLoaded, loading, profileState, setProfile } from "../../state-slices/user-profile/profile-slice";
import { useEffect, useState } from "react";
import { User } from "../../models/user";
import { authState } from "../../state-slices/auth/auth-slice";
import { createStudySet, getSetTags } from "../../remote/set-service";
import { SetDto } from "../../dtos/set-dto";
import { appendNewTag, appendNewTagForm, clearTagFrombyIndex, clearTags, closeModal, createSetState, deleteTag, incrementTagLimit, openModal, resetCurrentSetToSave, saveSet, setIsPublic, updateTagFormbyIndex } from "../../state-slices/study-set/create-set-model-slice";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import SwitchUnstyled from '@mui/core/SwitchUnstyled';
import Switch from '@mui/material/Switch';
import { FormControl, IconButton, InputLabel, MenuItem, Select, TextField  } from "@material-ui/core";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import CancelIcon from '@mui/icons-material/Cancel';
import { SetDtoModel } from "../../models/create-set-model";
import { Tag } from "../../dtos/Tag";
import { TagFormModel } from "../../models/new-tag-form";
import { SaveTagFormModel } from "../../models/save-tag-form-model";
import { errorState } from "../../state-slices/error/errorSlice";
import LabelIcon from '@mui/icons-material/Label';


import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Popover from '@mui/material/Popover';
import { style } from "@mui/system";
import { ClassNames, useTheme } from "@emotion/react";
import {makeStyles, Theme } from '@material-ui/core/styles'

import { getJSDocTags } from "typescript";




/**
 * Allows user to create set with multiple tags.
 * Renders itself.
 * @author Alfonso Holmes
 * */

 interface iCreateSetModal {
    dummySwitch: boolean,
    setDummySwitch: (nextDummySwitchVal: boolean) => void
}

const CreateSetModal = (props: iCreateSetModal) => {

  const [newSet, setNewSet] = useState('')
  const [tagColor, setTagColor] = useState('');
  const [tagName, setTagName] = useState('');
  const [allTags , setAllTags] = useState([] as Tag[]);
  const dispatch = useDispatch();
  const user: User = useSelector(authState).authUser;
  const _createSetState= useSelector(createSetState);
  const error_state= useSelector(errorState);
  let isAtTagLimit : boolean = false;
  const [rerenderSwitch, setRerenderSwitch] = useState(false);

  const useStyles = makeStyles((theme:Theme) => ({
    divTable: {
        textAlign: 'center',
        width: '70%',
        marginLeft: 200,
    },
    paper: {


        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    newTag_Form: {
        padding: '1em',
         color: '#7D7687' , 
         borderColor: '#7D7687' 
    },
    alert_Format: {
        width: '15em'
    }

}));

const classes = useStyles();
const theme = useTheme();


  const handleChange = (e: any) => {
     
    setNewSet(e.target.value);
  }
 

  useEffect(() => {
    async function getTags()
    {  
        try{
              
              let response = await getSetTags();  
              dispatch(resetCurrentSetToSave());
              setAllTags(response);
        }catch(e: any){
          console.log(e);
          setAllTags([{tagName: 'oop' , tagColor: 'blue'} ,
           {tagName: 'java' , tagColor: 'red'} ,
           {tagName: 'liskov substitution' , tagColor: 'yellow'} ,
           {tagName: 'python' , tagColor: 'black'}
          ] as Tag[])
        }
      
    }

    getTags();
  }, []); // <-- empty array means 'run once'

//   const updateTagName = (e: any) => {
//     setTagName(e.target.value);
//   }
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
        console.log(_createSetState.tagLimit);
        if( _createSetState.tagLimit < 10)
        {
          //  setNewTagFromState( _createSetState.newTagForms as TagFormModel[]);
           
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
        console.log(_createSetState.setToSave.tags + " " + _createSetState.newTagForms );
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
        console.log(_createSetState.setToSave.tags);
        }
        else{
            
        }
        
    }
   
    const toggleSetStatus = () => {
        
        dispatch(setIsPublic());
       
    }

   
    const applyChanges = async function () {
        
        
            try {
                dispatch(loading());

                let setToSave_ : SetDto = {author: user.username , setName: newSet , isPublic: _createSetState.setToSave.isPublic , tags : _createSetState.setToSave.tags} as SetDto
                dispatch(saveSet(setToSave_));
                console.log("SET TO SAVE : " , setToSave_);
                let newly_created_set = await createStudySet(setToSave_);
                console.log("NEWLY CREATED SET : " ,  newly_created_set);
                dispatch(clearTags());
                setNewSet('');
                props.setDummySwitch(!props.dummySwitch);
                 dispatch(resetCurrentSetToSave());
                

            } catch (e: any) {
                console.log(e);
            }
            dispatch(isLoaded());
    }

   

    return (
        <div>    
            <div className={classes.newTag_Form}>
            <TextField label="set name"  onChange={handleChange}  variant='filled' size="small" value={newSet} />
            <br/>
            <p>private <Switch  style={{color:"#7D7687" }}  onClick={toggleSetStatus}/> public { _createSetState.setToSave.isPublic ? <> <img className="welcomeBanner" src="wizard_dance.gif" alt="qwizard" height="30px" /> </> : <></>}</p> 
            </div >
            <hr/>
            { 
                _createSetState.newTagForms.map((F : TagFormModel | undefined , i) => { 
                    return <div  key={i}>
                
                        {
                            _createSetState.newTagForms[i].tagAdded == false 

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

                            { 
                                newSet === '' 
                                ? 
                                    <><Alert className={classes.alert_Format} severity="warning">Must Enter Set Name!</Alert>{dispatch(clearTags())}</> 
                                    
                                : 
                                    <> 
                                        <p> <LabelIcon style={{color: _createSetState.newTagForms[i].tagColor}} />  {_createSetState.newTagForms[i].TagName}</p>
                            
                                        <Button style={{background: '#4E3E61' , color: 'red'}} onClick={(e) => removeTag(e , i)} startIcon={<DeleteSharpIcon />}>
                                            Remove
                                        </Button>
                            
                                        <Alert className={classes.alert_Format} severity="success">Added!</Alert> 
                                    </>
                            }
                            <hr/>
                            <br/>
                            </> 
                        }
                    </div>
                })
            }
            {isAtTagLimit == false ? <Button style={{background: '#4E3E61' , color: '#7D7687' , marginLeft:'10%'}}  onClick={createNewTagForm} startIcon={<LabelIcon />}> New Tag</Button> : <></>}
            <br/>
            <Button style={{background: '#7D7687' , color: '#4E3E61'}} onClick={applyChanges}>Create</Button>
        </div>
    );
}

export default CreateSetModal;