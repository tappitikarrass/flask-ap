import React from "react";
import { HashRouter } from "react-router-dom";
import { create, act } from "react-test-renderer";
import UserLists from '../UserLists';

describe('UserLists', () => {
  it('',() => {
    let component;
    act(() => {
      component = create(
        <HashRouter>
          <UserLists />
        </HashRouter>
      );
    });
    expect(component.toJSON()).toMatchSnapshot();
  });
});
