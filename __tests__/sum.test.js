import { expect } from "@jest/globals";
import { test } from "jest-circus";
import { sum } from "../sum";

test('Tests addition: ', ()=> {
    expect(sum(1, 2)).toBe(3);
});