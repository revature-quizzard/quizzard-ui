import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState} from "../../store/store";
import {UpdateAccModel} from "../../Models/UpdateAccountInfo-model";

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