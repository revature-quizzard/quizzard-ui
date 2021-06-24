import {UpdateAccModel} from "../Models/UpdateAccountInfo-model";
import { act } from "react-dom/test-utils";
import React from "react";
import {mount} from "enzyme";
import UpdateAccountInfo from "../components/UpdateAccountInfo/UpdateAccountInfo";
import {updateAccInfo} from "../Remote/updateInfo-service";
const axios = require("axios");
const updateAccInfos = require("../Remote/updateInfo-service")


//import  mockAxios from "axios";

//any axios usages gets replaces with the jest own version of mock axios.

let mockUpdate:UpdateAccModel={
            username:"shadow",
            password:"test-password",
            email:"test-shadow@gmail.com"
}
jest.mock("axios",()=>({
    put: jest.fn((_mockUpdate)=>{
            return new Promise((resolve)=>{
                mockupdate:_mockUpdate
        })
    })
}));

test("axios mock update account info", async ()=>{
    // await axios.put.mockResolvedValue({
    //     data:{
    //         username:"shadow",
    //         password:"test-password",
    //         email:"test-shadow@gmail.com"
    //     }
    // });

    const mockNewUpdateAccountInfoObject:UpdateAccModel = {
        username:"shadowMonarch",
        password:"Rise123!",
        email:"shadowmonarch@gmail.com"
    };


    const updatedUser = await updateAccInfo(mockNewUpdateAccountInfoObject);
    expect(updatedUser).toEqual("shadow");

})


// test("calls accounts/update endpoint with axios expect update info object",async ()=>{
//
//     const data = {
//         data:{
//             username:"shadowMonarch",
//             email:"shadowmonarch@gmail.com",
//             password:"password updated"
//         }
//     }
//     //arrange
//     const mockNewUpdateAccountInfoObject:UpdateAccModel = {
//         username:"shadowMonarch",
//         password:"Rise123!",
//         email:"shadowmonarch@gmail.com"
//     };
//
//
//     //axios.put = await jest.fn().mockImplementation(()=>Promise.resolve(data))
//     const mockResp = {username:"shadowMonarch",password:"Rise123!",email:"shadowmonarch@gmail.com"}
//
//     //axios.put.mockImplementationOnce(()=>Promise.resolve(mockResp));
//
//    await expect(updateAccInfo.updateAccInfo(mockNewUpdateAccountInfoObject)).resolves.toEqual(mockResp);
//
//
//     //act
//
//     //assert
//     // expect(axios.put).toHaveBeenCalled();
//     // expect(axios.put).toHaveBeenCalledWith("http://localhost:5000/accounts/update");
//
//     //
//     // const returnedObject =  await updateAccInfo(mockNewUpdateAccountInfoObject);
//     // console.log(returnedObject);
//     // expect(returnedObject).toBe("Something Idk yet");
//
// });