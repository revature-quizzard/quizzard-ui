import Enzyme, {mount, ReactWrapper, shallow} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Button, Modal} from "react-bootstrap";
import {render, fireEvent,act} from "@testing-library/react";
import UpdateAccountInfo from "../components/UpdateAccountInfo/UpdateAccountInfo";
import React from "react";
import {UpdateAccModel} from "../models/update-account-info-model";
import {updateAccInfo} from "../remote/update-info-service";
import  configureStore  from "redux-mock-store";
import { Provider } from "react-redux";
import '@testing-library/jest-dom'

//configure onlye once, this will be needed for every test file though.
Enzyme.configure({adapter:new Adapter()});

const configureMS = configureStore();
const initialState = {
    isAuthenticated: false,
    isLoading: false,
    username: "",
    token: "",
};


//here we jest will mock the file updateinfo-service from Remote and it has the function
//updateAccInfo. We have it return the same named function but instead being a jest function.
//In order for us to provide our own test implementation.
jest.mock("../remote/update-info-service",()=>{
    return{
        updateAccInfo:jest.fn()
    }
});
describe("UpdateAccountInfo Component",()=>{

     const onMockShow = jest.fn();

    let wrapper:ReactWrapper;
    
    beforeEach(()=>{
        wrapper = mount(<Provider store={configureMS(initialState)}><UpdateAccountInfo></UpdateAccountInfo></Provider>);
    })

    test("Shallow Render",()=>{

        const wrapper = shallow(<Provider store={configureMS(initialState)}>
                                <UpdateAccountInfo />
                                    </Provider>);

        expect(wrapper.exists()).toBe(true);
    });


    test("render component",()=>{

        expect(wrapper.find("FormControl#username").text()).toBe("");
        expect(wrapper.find("FormControl#password").text()).toBe("");
        expect(wrapper.find("FormControl#email").text()).toBe("");

        console.log(wrapper.find("label#label-username").debug())
        // //labels
        expect(wrapper.find("FormLabel#label-username").text()).toBe("Username:");
        expect(wrapper.find("label#label-pass").text()).toBe("Password:");
        expect(wrapper.find("label#label-email").text()).toBe("Email:");

        //Button Says submit
        expect(wrapper.find("Button#submit-btn").text()).toBe("Submit");
        expect(wrapper.find("FormControl#username").length).toBe(1)
        expect(wrapper.find("FormControl#password").length).toBe(1)
        expect(wrapper.find("FormControl#email").length).toBe(1)
        expect(wrapper.find("Card#CardUAI").length).toBe(1)
        expect(wrapper.find("Form#FormUAI").length).toBe(1)
        //modal is there but not visible
        expect(wrapper.find(Modal).props().show).toBe(false);
        expect(wrapper.find("Modal#modalContainer").length).toBe(1)
    });

    test("Username form text box",()=>{
       // const wrapper = mount(<UpdateAccountInfo/>);
        //<Form.Control type="text" id="username" name="username" value={username} onChange={(e)=>setUsername(e.target.value)}>
       expect(wrapper.find('FormControl#username').props()).toEqual({
           type:"text",
           id:"username",
           placeholder:"username",
           name:"username",
           value:"",//should be empty because of useState hook for username default is ""
           onChange:expect.any(Function)
       })
    });


    // test("testing click updateInfo",()=>{
    //     const setShow = jest.fn();
    //
    //     const wrapper = mount(<Provider store={configureMS(initialState)}>
    //         <UpdateAccountInfo onClick={setShow}/>
    //     </Provider>);
    //
    //     const handleClick = jest.spyOn(React,"useState");
    //     handleClick.mockImplementation(show=>[show,setShow]);
    //     act(()=>{
    //
    //     wrapper.find("button#submit-btn").simulate("click");
    //     })
    //     expect(setShow).toBeTruthy();
    //
    //
    // });

    test("Expect Modal State to be false",()=>{

        const wrapper =mount(<Provider store={configureMS(initialState)}><UpdateAccountInfo></UpdateAccountInfo></Provider>);

        expect(wrapper.find(Modal).props().show).toBe(false);

    });

    test("input value change username",()=>{
        const { queryByTestId,queryByPlaceholderText} = render(<Provider store={configureMS(initialState)}>
            <UpdateAccountInfo />
        </Provider>);
        const updateUser = queryByPlaceholderText("username");
        const label = queryByTestId("label-username")
        fireEvent.change(updateUser,{target:{value:"test-user"}});
        expect(updateUser.value).toBe("test-user");

        const pass = queryByPlaceholderText("password");
        fireEvent.change(pass,{target:{value:"test-pass"}});
        expect(pass.value).toBe("test-pass");

        const mockEmail = queryByPlaceholderText("email");
        fireEvent.change(mockEmail,{target:{value:"test-email"}});
        expect(mockEmail.value).toBe("test-email");


    })

    let DtoFromApi:UpdateAccModel={
        username:"shadow",
        password:"Password Updated",
        email:"test-shadow@gmail.com"
    };

    const mockNewUpdateAccountInfoObject:UpdateAccModel = {
        username:"shadow",
        password:"Rise123!",
        email:"test-shadow@gmail.com"
    };
    const header = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("Authorization")
    };

    test("axios mock update account info", async ()=>{
        const { queryByTestId,queryByPlaceholderText} = render(<Provider store={configureMS(initialState)}>
            <UpdateAccountInfo />
        </Provider>);

        (updateAccInfo as jest.Mock ).mockImplementation((newInformationModel:UpdateAccModel,headers:any)=>{
            return new Promise(resolve => resolve(DtoFromApi))
        })

        await act(async ()=>{
            const buttonMock = queryByTestId("submit-btn");
            fireEvent.click(buttonMock);
        })

        const spy = jest.spyOn(Storage.prototype, 'getItem');
        // localStorage.setItem = jest.fn();

// // works:
//         jest.spyOn(window.localStorage.__proto__, 'getItem');
//         window.localStorage.__proto__.setItem = jest.fn();

// assertions as usual:


        const recieve = await updateAccInfo(mockNewUpdateAccountInfoObject, header);
        expect(updateAccInfo).toHaveBeenCalled();
        expect(recieve).toEqual(DtoFromApi);
        expect(queryByTestId("containerModal")).toBeInTheDocument();
        expect(queryByTestId("containerModal").querySelectorAll("li").length).toEqual(3);


        const updatedUser = await updateAccInfo(mockNewUpdateAccountInfoObject, header);
        expect(updatedUser).toEqual(DtoFromApi);

    })
    
});
