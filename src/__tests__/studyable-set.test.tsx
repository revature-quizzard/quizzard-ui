import Enzyme, { mount } from "enzyme";
import Adaptor from "@wojtekmaj/enzyme-adapter-react-17";
import  configureStore  from "redux-mock-store";
import { Provider } from "react-redux";
import { StudyableSet } from "../components/Sets/StudyableSet";


Enzyme.configure({adapter: new Adaptor()});
test('Renders the Flashcard component with initial state', () =>{
    const configureMockStore = configureStore();

    // @ts-ignore
    let initialState = {
        flashcards: {
            flashCards: [],
            isLoading: false,
            isLoaded: false,
            count: 0
        },

    }

    const mockStore = configureMockStore(initialState);

    const wrapper = mount(
        <Provider store={mockStore}>
            <StudyableSet />    
        </Provider>
        );
    
   
    console.log(wrapper.find('button#study-button').debug());
    expect(wrapper.find('button#study-button')).toBeTruthy();
    // expect(wrapper.find('input#card-question').text()).toBe('');
    // expect(wrapper.find('input#card-answer').text()).toBe('');
    
})