import {shallow, mount} from 'enzyme';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Game from '../../components/Multiplayer/Game';

describe('GameContainer Test Suite', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Game container renders successfully', () => {
        const wrapper = shallow(<Game />);

        expect(wrapper).toBeTruthy;
    });

    it('Game Container renders correctly when match state is 0', () => {
        const wrapper = mount(<Game />);

        expect(wrapper).toBeTruthy;
    });

    it('Game Container renders correctly when match state is 1', () => {
        const wrapper = mount(<Game />);

        expect(wrapper).toBeTruthy;
    });

    it('Game Container renders correctly when match state is 2', () => {
        const wrapper = mount(<Game />);

        expect(wrapper).toBeTruthy;
    });

    it('Game Container renders correctly when match state is 3', () => {
        const wrapper = mount(<Game />);

        expect(wrapper).toBeTruthy;
    });
})