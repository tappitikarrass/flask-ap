import React from "react";
import { HashRouter } from "react-router-dom";
import { create, act } from "react-test-renderer";
import Footer from '../Footer';

describe('Footer', () => {
  it('',() => {
    let component;
    act(() => {
      component = create(
        <HashRouter>
          <Footer />
        </HashRouter>
      );
    });
    expect(component.toJSON()).toMatchSnapshot();
  });
});
