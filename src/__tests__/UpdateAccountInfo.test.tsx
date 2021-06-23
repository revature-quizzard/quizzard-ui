import Enzyme, { mount, ReactWrapper, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
//import configureStore from "redux-mock-store";
import { Button, Modal} from "react-bootstrap";
//import { fireEvent } from "@testing-library/react";
import UpdateAccontInfo from "../components/UpdateAccountInfo/UpdateAccountInfo";

//configure onlye once, this will be needed for every test file though.
Enzyme.configure({adapter:new Adapter()});



describe("UpdateAccountInfo Component",()=>{

    // const onMockShow = jest.fn();

    //let wrapper:ReactWrapper;
    
    beforeEach(()=>{
        //wrapper = mount(<UpdateAccontInfo/>);
    })


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
        //Button Says submit
        expect(wrapper.find("Button#submit-btn").text()).toBe("Submit");

        //modal is there but not visible
        expect(wrapper.find(Modal).props().show).toBe(false);
        expect(wrapper.find("Modal#modalContainer").length).toBe(1)
    });

    test("render component with Button Click to Display Modal",()=>{

        const setShow = jest.fn();

        const wrapper = mount(<UpdateAccontInfo/>);



        console.log((wrapper.find("button#submit-btn").debug()))
        wrapper.find("Button#submit-btn").simulate("click",{target:{show:true}});

        
        
        //expect(wrapper.instance().state().show).toBe(false);
        expect(wrapper.find(Modal).props().show).toBe(true);
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

