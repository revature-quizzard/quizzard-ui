import {StudySet} from "../../models/study-set";
import {Flashcard, SetFlashcardDTO} from "../../models/flashcard";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../../store/store";
import {Account} from "../../models/account";
import {Subject} from "../../models/subject";
import { User } from "../../models/user";
import { Set  } from "../../dtos/Set";
import { Tag } from "../../dtos/Tag";
import { TagFormModel } from "../../models/new-tag-form";
import { Card } from "../../dtos/Card";
import { SaveTagFormModel } from "../../models/save-tag-form-model";
import { SetDto } from "../../dtos/set-dto";



/**
 * @author Alfonso Holmes
 * interface for the state
 */
interface  State {
    IsShowing: boolean;
    currentUser: User;
    setToSave: Set;
    newTagForms: TagFormModel[];
    tagLimit: number ;
}

/**
 * @author Alfonso Holmes
 * initial state values
 */
const initialState: State = {
    IsShowing: false,
    currentUser: undefined,
    setToSave: {id: '', setName: '', isPublic: false, author : '' , tags : [] as Tag[] , set_id : '' , favorites :0 , cards: [] as Card[] , views : 0  , plays : 0 ,studies : 0 } as Set,
    newTagForms: [ { tagColor: '', TagName: '', tagAdded: false} as TagFormModel ] as TagFormModel[],
    tagLimit: 0
}

/**
 * @author Alfonso Holmes
 * state definition, name, initial state, reducers
 */
export const createSetSlice = createSlice({
    name: "createSet",
    initialState,
    reducers: {
        setIsShowing: (state , action : PayloadAction<boolean>) => {
            state.IsShowing = action.payload;
        },
        closeModal: (state) => {
            state.IsShowing = false;
        },
        openModal: (state) => {
            state.IsShowing = true;
        },
        appendNewTagForm: (state , action : PayloadAction<TagFormModel> ) =>
        {
            state.newTagForms.push(action.payload);
        },
        appendNewTag: (state, action : PayloadAction<string> ) => {
            console.log(action.payload);
            state.setToSave.tags.push(action.payload);
        },
        incrementTagLimit: (state) => {
            if(state.tagLimit < 10)
            state.tagLimit += 1;
        },
        updateTagFormbyIndex: (state , action : PayloadAction<SaveTagFormModel> ) =>
        {
            state.newTagForms[action.payload.index].TagName = action.payload.tagName;
            state.newTagForms[action.payload.index].tagColor = action.payload.tagColor;
            state.newTagForms[action.payload.index].tagAdded = action.payload.tagAdded;
        },
        clearTags: (state) => {
<<<<<<< HEAD
            function DeletedAll(element: any)  {  return element == undefined;  } 
            
            state.newTagForms =  state.newTagForms.filter(DeletedAll);
            console.log( state.newTagForms);
            state.newTagForms.push({ tagColor: '', TagName: '', tagAdded: false}  as TagFormModel);
            state.setToSave.tags = [] ;      
=======
            state.newTagForms =  [{ tagColor: '', TagName: '', tagAdded: false} as TagFormModel ];
            state.setToSave.tags = [] ;
>>>>>>> f1d18298138f2b66d9cc54a293a4bc4774c3ea64
           },
        deleteTag: (state , action : PayloadAction<SaveTagFormModel>) => {

            function isNotToBeDeleted(element: any)  {  return element != undefined;  }

            state.newTagForms[action.payload.index] = undefined;
            state.newTagForms = state.newTagForms.filter(isNotToBeDeleted);

            state.setToSave.tags[action.payload.index] = undefined
            state.setToSave.tags =  state.setToSave.tags.filter(isNotToBeDeleted);

        },
        clearTagFrombyIndex: (state , action : PayloadAction<SaveTagFormModel>) => {
            state.newTagForms[action.payload.index].TagName = '';
            state.newTagForms[action.payload.index].tagColor = '';
            state.newTagForms[action.payload.index].tagAdded = false;
           },
           saveSet: (state , action : PayloadAction<SetDto>) => {
            state.setToSave.author = action.payload.author;
            state.setToSave.isPublic = action.payload.isPublic;
            state.setToSave.setName = action.payload.setName;
            state.setToSave.tags = action.payload.tags;
           }
    }

       
})
export const {setIsShowing  , closeModal  , openModal ,  appendNewTagForm, 
    appendNewTag , incrementTagLimit , updateTagFormbyIndex , clearTags , 
    deleteTag , clearTagFrombyIndex , saveSet} = createSetSlice.actions;
    
export const createSetState = (state: RootState) => state.createSet;
export default createSetSlice.reducer;