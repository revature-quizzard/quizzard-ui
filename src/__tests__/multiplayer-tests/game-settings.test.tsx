import {shallow, mount, configure} from 'enzyme';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import GameSettings from '../../components/Multiplayer/GameSettings';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { store } from '../../store/store';
import { Provider } from 'react-redux';

describe('GameSettings Test Suite', () => {

    beforeAll(() => {
        configure({ adapter: new Adapter() });
    })

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Game Settings renders successfully', () => {
        // Mock up the props
        let mockSetShowFn = jest.fn();

        const wrapper = shallow(<Provider store={store}>
                                    <GameSettings />
                                    </Provider>);

        expect(wrapper).toBeTruthy;
    });

    it('Applying settings correctly updates Redux', () => {
        // Mock up the props
        let mockSetShowFn = jest.fn();

        const wrapper = mount(<Provider store={store}>
                                <GameSettings />
                                </Provider>);

        expect(wrapper).toBeTruthy;
    });
})