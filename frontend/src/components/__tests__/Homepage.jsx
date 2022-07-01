import React from "react";
import { HashRouter } from "react-router-dom";
import { create, act } from "react-test-renderer";
import Homepage from '../Homepage';

describe('Homepage', () => {
  it('',() => {
    let component;
    act(() => {
      component = create(
        <HashRouter>
          <Homepage />
        </HashRouter>
      );
    });
    expect(component.toJSON()).toMatchSnapshot();
  });
});
