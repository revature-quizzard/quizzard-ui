import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Enzyme, { mount } from "enzyme";
import Adaptor from "@wojtekmaj/enzyme-adapter-react-17";
import  configureStore  from "redux-mock-store";
import {FlipCard} from "../components/Flashcards/FlipCard";
import { Provider } from "react-redux";


// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/flashcards/);
//   expect(linkElement).toBeInTheDocument();
// });
/**
 * Tests with an inital state that collects Flashcard state and loads it eagerly, tests that the container still renders with the initialState
 * @author 'Kevin Chang'
 */
Enzyme.configure({adapter: new Adaptor()});
test('Renders the FlipCard component with initial state', () =>{
    const configureMockStore = configureStore();

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
            <App/>    
        </Provider>
        );
    
        expect(wrapper.find('Container#app-container')).toBeTruthy();
})
