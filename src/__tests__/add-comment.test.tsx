import { shallow } from 'enzyme';
import AddComment from '../components/Forum/AddComment';
import { addComment } from '../remote/comment-service';
jest.mock('../remote/comment-service');

describe('Add Comment Component Test Suite', () => {

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('Component renders successfully', () => {
        // set up wrapper class
        const wrapper = shallow(<AddComment />);

        // expect it to be truthy (i.e. something renders)
        expect(wrapper).toBeTruthy();
    })

    it('Component calls addComment (POST request to quizzard api) when given valid information', () => {
        // configure mock redux store
        
    })

    
})