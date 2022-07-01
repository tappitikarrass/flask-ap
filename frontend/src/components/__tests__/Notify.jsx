import React from "react";
import { HashRouter } from "react-router-dom";
import { create, act } from "react-test-renderer";
import Notify from '../Notify';

describe('Notify', () => {
  it('',() => {
    let component;
    act(() => {
      component = create(
        <HashRouter>
          <Notify />
        </HashRouter>
      );
    });
    expect(component.toJSON()).toMatchSnapshot();
  });
});
