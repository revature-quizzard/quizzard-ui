import Enzyme, { mount } from "enzyme";
import Adaptor from "@wojtekmaj/enzyme-adapter-react-17";
import  configureStore  from "redux-mock-store";
import Flashcard from "../components/Flashcards/Flashcard";
import { Provider } from "react-redux";


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

        subjects: {
            subjects: [],
        }
    }

    const mockStore = configureMockStore(initialState);

    const wrapper = mount(
        <Provider store={mockStore}>
            <Flashcard/>    
        </Provider>
        );
    
   
    console.log(wrapper.find('Container#flashcard-container').debug());
    expect(wrapper.find('Container#flashcard-container')).toBeTruthy();
    expect(wrapper.find('input#card-question').text()).toBe('');
    expect(wrapper.find('input#card-answer').text()).toBe('');
    
})


