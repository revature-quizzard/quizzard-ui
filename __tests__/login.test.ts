import { login } from "../src/remote/login-register-service"
import { LoginModel } from "../src/models/login-model";

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
    mockLoginFunction.mockReturnValue()

    // expect(sum(1, 2)).toBe(3);
});