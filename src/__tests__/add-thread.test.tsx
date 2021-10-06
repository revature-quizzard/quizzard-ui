import * as redux from 'react-redux';
import createMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow, configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Subforum } from '../models/subforum';
import AddThread from '../components/Forum/AddThread';
import {Thread } from '../models/thread';
import { addThread } from '../remote/thread-service';
import forumReducer, { forumState } from '../state-slices/forum/forum-slice';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('../remote/thread-service');
jest.mock('../state-slices/forum/forum-slice');




interface TempState {
    currentSubforum: Subforum | undefined;
}

let initialState: any;

describe('Add Thread Component Test Suite', () => {

    beforeAll(() => {
        configure({adapter: new Adapter()});
    });

    beforeEach(() => {
        initialState = {
            currentSubforum: undefined
        }
    });

    afterEach(() => {
        jest.resetAllMocks();
        initialState = null;
    });

    it('Component renders successfully', () => {
        //mock props
        let mockClose = jest.fn();

        //configure mock store
        const configureMockStore = createMockStore();
        const mockStore = configureMockStore(initialState);

        //set up wrapper class;
        const wrapper = shallow(<Provider store={mockStore}>
                                    <AddThread close={mockClose} />
                                </Provider>);
        
        //expect it do be truthy (i.e., somthing renders)
        expect(wrapper).toBeTruthy;
    });
    
    it('Component calls addThread when given valid information', () => {
        // mock props
        let mockClose = jest.fn();

        // configure mock redux store
        initialState = {
            currentSubforum: new Subforum([], 'NULL', 'description', 'subforumId', 'subject', 1, '2021-09-28T12:34:56.789'),
        }
        //@ts-ignore
        const mockStore = configureStore({ reducer: {forumInfo: forumReducer }, initialState});

        // set up a spy for useSelector (provide mock values)
        const spy = jest.spyOn(redux, 'useSelector');
        spy.mockImplementation((arg) => {
            if (arg === forumState) {
                return initialState;
            } else {
                return { authUser: { username: 'username' } };
            }
        })

        // set up the wrapper
        const wrapper = mount(  <Provider store={mockStore}>
                                    <AddThread close={mockClose}/>
                                </Provider>);

        let createButtonWrapper = wrapper.find('#createThreadButton').at(0);

        createButtonWrapper.simulate('click');
        
        // expect certain methods to be called
        expect(addThread).toBeCalled();
    });



});