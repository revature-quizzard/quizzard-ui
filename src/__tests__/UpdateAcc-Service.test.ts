import {UpdateAccModel} from "../Models/UpdateAccountInfo-model";
import { act } from "react-dom/test-utils";
import React from "react";
import {mount} from "enzyme";
import UpdateAccountInfo from "../components/UpdateAccountInfo/UpdateAccountInfo";
import {updateAccInfo} from "../Remote/updateInfo-service";





let mockUpdate:UpdateAccModel={
            username:"shadow",
            password:"Password Updated",
            email:"test-shadow@gmail.com"
}
//here we jest will mock the file updateinfo-service from Remote and it has the function
//updateAccInfo. We have it return the same named function but instead being a jest function.
//In order for us to provide our own test implementation.
jest.mock("../Remote/updateInfo-service",()=>{
    return{
        updateAccInfo:jest.fn()
    }
});

test("axios mock update account info", async ()=>{

    (updateAccInfo as jest.Mock ).mockClear().mockImplementation((newInformationModel:UpdateAccModel,headers:any)=>{
        return new Promise(resolve => resolve(mockUpdate))
    })

    const mockNewUpdateAccountInfoObject:UpdateAccModel = {
        username:"shadow",
        password:"Rise123!",
        email:"test-shadow@gmail.com"
    };
    const header = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("Authorization")
    }
    const expectedDTO ={
        username:"shadow",
        password:"Password Updated",
        email:"test-shadow@gmail.com"
    }


    const updatedUser = await updateAccInfo(mockNewUpdateAccountInfoObject, header);
    expect(updatedUser).toEqual(expectedDTO);

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