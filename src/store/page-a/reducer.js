import { SONG_LIST, COUNT, PAGES } from "./actionTypes";

export const initialState = {
  songList: [],
  pages: 0,
  count: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SONG_LIST:
      return {
        ...state,
        songList: action.songList,
      };
    case PAGES:
      return {
        ...state,
        pages: action.pages,
      };
    case COUNT:
      return {
        ...state,
        count: action.count,
      };
    default:
      return state;
  }
}
