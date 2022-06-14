import React from "react";
import { HashRouter } from "react-router-dom";
import { create, act } from "react-test-renderer";
import Profile from '../Profile';

describe('Profile', () => {
  it('',() => {
    let component;
    act(() => {
      component = create(
        <HashRouter>
          <Profile />
        </HashRouter>
      );
    });
    expect(component.toJSON()).toMatchSnapshot();
  });
});
