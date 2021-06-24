import Enzyme, { mount, ReactWrapper, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
//import configureStore from "redux-mock-store";
import { Button, Modal} from "react-bootstrap";
import { render,fireEvent } from "@testing-library/react";
import UpdateAccontInfo from "../components/UpdateAccountInfo/UpdateAccountInfo";
import React from "react";

//configure onlye once, this will be needed for every test file though.
Enzyme.configure({adapter:new Adapter()});



describe("UpdateAccountInfo Component",()=>{

    // const onMockShow = jest.fn();

    //let wrapper:ReactWrapper;
    
    beforeEach(()=>{
        //wrapper = mount(<UpdateAccontInfo/>);
    })

    test("Shallow Render",()=>{
        const wrapper = shallow(<UpdateAccontInfo />);

        expect(wrapper.exists()).toBe(true);
    });


    test("render component",()=>{

        const wrapper = mount(<UpdateAccontInfo/>);
        //console.log(wrapper.find("#submit-btn").debug());
        
        //console.log(wrapper.debug());
        //console.log(wrapper.find("Modal#modalContainer").debug())

        //console.log(wrapper.find("Modal#modalContainer").hasClass("Modal"));
         ///  refers to test (".username")   refers to jsx(html structure tags things) className="username"
        //test fields are do not have anything at the start
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
       const wrapper = mount(<UpdateAccontInfo/>);
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

    test("test",()=>{
        const wrapper = shallow(<UpdateAccontInfo/>);

        expect(wrapper.find("FormControl").length).toEqual(3);
    })

    test("testing updateInfo",()=>{
        const setShow = jest.fn();

        const wrapper = mount(<UpdateAccontInfo onClick={setShow}/>)
        const handleClick = jest.spyOn(React,"useState");
        handleClick.mockImplementation(show=>[show,setShow]);

        wrapper.find("button#submit-btn").simulate("click");
        expect(setShow).toBeTruthy();


    });

    test("render component with Button Click to Display Modal",()=>{

        const wrapper = mount(<UpdateAccontInfo/>);

        const submitButton = wrapper.find(Button);
        submitButton.simulate('click');
        console.log(wrapper.find(Modal).debug)

        expect(wrapper.prop("show")).toBeTruthy();

        //console.log((wrapper.find("button#submit-btn").debug()))
        //wrapper.find("Button#submit-btn").simulate("click",{target:{show:true}});

        //expect(wrapper.instance().state().show).toBe(false);


        //expect(wrapper.find(Modal).props().show).toBe(true);
       //expect(wrapper.find(Modal).prop("show")).toEqual(true);
    });



    // test("render component with Button Click to Close Display Modal",()=>{
    //
    //     const handleClose = jest.fn( ()=>false);
    //
    //     const wrapper = mount(<UpdateAccontInfo/>);
    //
    //
    //     console.log(wrapper.find("button#submit-btn").debug())
    //     wrapper.find("button#submit-btn").simulate("click");
    //     wrapper.find("button#submit-btn").simulate("click");
    //    // wrapper.update();
    //
    //     wrapper.find("Modal#modalContainer").props().);
    //     //expect(wrapper.instance().state().show).toBe(false);
    //     expect(wrapper.find(Modal).props().show).toBe(true);
    //
    //     console.log(wrapper.find("Modal#modalContainer").childAt(0).debug())
    // });

});

describe("Inpu tvalue",()=>{

    test("input value change username",()=>{
        const { queryByTestId,queryByPlaceholderText} = render(<UpdateAccontInfo/>);
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

})

