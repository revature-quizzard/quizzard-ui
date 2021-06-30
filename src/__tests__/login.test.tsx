//import { login } from "../Remote/login-register-service"
import { LoginModel } from "../models/login-model";

const sut = require('../src/components/Login/Login');

let login: LoginModel = {
    username: "testuser",
    password: "testpass"
}



beforeEach(() => {

});

afterEach(() => {

});

test('Tests login: ', ()=> {
    const mockLoginFunction = jest.fn();
    //mockLoginFunction.mockReturnValue()

});
