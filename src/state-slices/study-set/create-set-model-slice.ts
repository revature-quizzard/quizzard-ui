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



/**
 * @author Sean Taba
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
 * @author Sean Taba
 * initial state values
 */
const initialState: State = {
    IsShowing: false,
    currentUser: undefined,
    setToSave: {setName: '', isPublic: false, author : '' , tags : [] as Tag[] , set_id : '' , favorites :0 , cards: [] as Card[] , views : 0  , plays : 0 ,studies : 0 } as Set,
    newTagForms: [ { tagColor: '', TagName: '', tagAdded: false} as TagFormModel ] as TagFormModel[],
    tagLimit: 0
}

/**
 * @author Sean Taba
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
        appendNewTag: (state, action : PayloadAction<Tag> ) => {
            console.log(action.payload);
            state.setToSave.tags.push(action.payload);
        },
        incrementTagLimit: (state) => {
            if(state.tagLimit < 10)
            state.tagLimit += 1;
        },
        updateTagFormbyIndex: (state , action : PayloadAction<SaveTagFormModel> ) =>
        {
            state.newTagForms[action.payload.index].TagName = action.payload.currentTagForm.TagName;
            state.newTagForms[action.payload.index].tagColor = action.payload.currentTagForm.tagColor;
            state.newTagForms[action.payload.index].tagAdded = action.payload.currentTagForm.tagAdded;
        }
        
    }
})
export const {setIsShowing  , closeModal  , openModal ,  appendNewTagForm, appendNewTag , incrementTagLimit , updateTagFormbyIndex} = createSetSlice.actions;
export const createSetState = (state: RootState) => state.createSet;
export default createSetSlice.reducer;