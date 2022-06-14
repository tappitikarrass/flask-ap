import React from "react";
import { HashRouter } from "react-router-dom";
import { create, act } from "react-test-renderer";
import SignIn from '../SignIn';

describe('SignIn', () => {
  it('',() => {
    let component;
    act(() => {
      component = create(
        <HashRouter>
          <SignIn />
        </HashRouter>
      );
    });
    expect(component.toJSON()).toMatchSnapshot();
  });
});
