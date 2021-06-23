import Enzyme, { mount } from "enzyme";
import Adaptor from "@wojtekmaj/enzyme-adapter-react-17";
import  configureStore  from "redux-mock-store";
import {FlipCard} from "../components/Flashcards/FlipCard";
import { Provider } from "react-redux";
import {Flashcard} from "../models/Flashcard"

/**
 * Uses Jest and Enzyme to test the rendering of FlipCard
 * @author 'Kevin Chang'
 */
Enzyme.configure({adapter: new Adaptor()});
test('Renders the FlipCard component with initial state', () =>{
    const configureMockStore = configureStore();
    const mockFlashcard =  {
        question: 'Question',
        answer: 'Answer',
        reviewable: true, 
        isPublic: true,
        subjectId: "1"
    }

    let initialState = {
        flashcards: {
            flashCards: [mockFlashcard],
            isLoading: false,
            isLoaded: false,
            count: 0
        },
    }

    const mockStore = configureMockStore(initialState);

    const wrapper = mount(
        <Provider store={mockStore}>
            <FlipCard />    
        </Provider>
        );
    
   
    console.log(wrapper.find('Container#flip-card').debug());
    expect(wrapper.find('Container#flip-card')).toBeTruthy();
    
})