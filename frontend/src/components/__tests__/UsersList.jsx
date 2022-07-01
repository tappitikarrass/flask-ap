import React from "react";
import { HashRouter } from "react-router-dom";
import { create, act } from "react-test-renderer";
import UsersList from '../UsersList';

describe('UsersList', () => {
  it('',() => {
    let component;
    act(() => {
      component = create(
        <HashRouter>
          <UsersList />
        </HashRouter>
      );
    });
    expect(component.toJSON()).toMatchSnapshot();
  });
});
