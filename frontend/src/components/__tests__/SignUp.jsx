import React from "react";
import { HashRouter } from "react-router-dom";
import { create, act } from "react-test-renderer";
import SignUp from '../SignUp';

describe('SignUp', () => {
  it('',() => {
    let component;
    act(() => {
      component = create(
        <HashRouter>
          <SignUp />
        </HashRouter>
      );
    });
    expect(component.toJSON()).toMatchSnapshot();
  });
});
