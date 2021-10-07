import {shallow, mount, configure} from 'enzyme';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import GameSettings from '../../components/Multiplayer/GameSettings';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

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

        const wrapper = shallow(<GameSettings show={false} setShow={mockSetShowFn}/>);

        expect(wrapper).toBeTruthy;
    });

    it('Applying settings correctly updates Redux', () => {
        // Mock up the props
        let mockSetShowFn = jest.fn();

        const wrapper = mount(<GameSettings show={false} setShow={mockSetShowFn}/>);
    });
})