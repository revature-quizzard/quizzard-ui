import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState} from "../../store/store";
import {UpdateAccModel} from "../../models/update-account-info-model";

interface State{
    newInfoModel:{
        username:string,
        password:string,
        email:string
    }
}

const intialState: State = {
    newInfoModel:{
        username:"",
        email:"",
        password:""
    }
}