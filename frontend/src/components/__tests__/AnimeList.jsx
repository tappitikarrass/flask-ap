import React from "react";
import { HashRouter } from "react-router-dom";
import { create, act } from "react-test-renderer";
import AnimeList from '../AnimeList';

describe('AnimeList', () => {
  it('',() => {
    let component;
    act(() => {
      component = create(
        <HashRouter>
          <AnimeList />
        </HashRouter>
      );
    });
    expect(component.toJSON()).toMatchSnapshot();
  });
});
