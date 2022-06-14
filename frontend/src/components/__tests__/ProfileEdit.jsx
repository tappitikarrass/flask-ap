import React from "react";
import { HashRouter } from "react-router-dom";
import { create, act } from "react-test-renderer";
import ProfileEdit from '../ProfileEdit';

describe('ProfileEdit', () => {
  it('',() => {
    let component;
    act(() => {
      component = create(
        <HashRouter>
          <ProfileEdit />
        </HashRouter>
      );
    });
    expect(component.toJSON()).toMatchSnapshot();
  });
});
