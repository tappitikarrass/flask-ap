import React from "react";
import { HashRouter } from "react-router-dom";
import { create, act } from "react-test-renderer";
import AppNav from '../AppNav';

describe('AppNav', () => {
  it('',() => {
    let component;
    act(() => {
      component = create(
        <HashRouter>
          <AppNav />
        </HashRouter>
      );
    });
    expect(component.toJSON()).toMatchSnapshot();
  });
});
