import React from "react";
import { HashRouter } from "react-router-dom";
import { create, act } from "react-test-renderer";
import Anime from '../Anime';

describe('Anime', () => {
  it('',() => {
    let component;
    act(() => {
      component = create(
        <HashRouter>
          <Anime />
        </HashRouter>
      );
    });
    expect(component.toJSON()).toMatchSnapshot();
  });
});
