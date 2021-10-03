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



/**
 * @author Sean Taba
 * interface for the state
 */
interface  State {
    IsShowing: boolean; 
    currentUser: User;
    setToSave: Set;
    newTagForms: TagFormModel[];
}

/**
 * @author Sean Taba
 * initial state values
 */
const initialState: State = {
    IsShowing: false,
    currentUser: undefined,
    setToSave: undefined,
    newTagForms: [] as TagFormModel[]
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
            state.setToSave.tags.push({tagName: action.payload.tagName , tagColor: action.payload.tagColor } as Tag);
        },
        
    }
})
export const {setIsShowing  , closeModal  , openModal ,  appendNewTagForm, appendNewTag } = createSetSlice.actions;
export const createSetState = (state: RootState) => state.createSet;
export default createSetSlice.reducer;