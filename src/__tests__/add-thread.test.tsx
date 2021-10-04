import createMockStore from 'redux-mock-store';


import { shallow, configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Subforum } from '../models/subforum';
import AddThread from '../components/Forum/AddThread';
jest.mock('../remote/thread-service');






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

        const configureMockStore = createMockStore();
        const mockStore = configureMockStore(initialState);

    })



});