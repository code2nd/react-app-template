import { SONG_LIST, PAGES, COUNT } from "./actionTypes";
import axios from "axios";

export const setSongList = (songList) => ({
  type: SONG_LIST,
  songList,
});

export const setPages = (pages) => ({
  type: PAGES,
  pages,
});

export const setCount = (count) => ({
  type: COUNT,
  count,
});

export const getSongList = ({ page, pageSize }) => {
  return async (dispatch) => {
    try {
      const res = await axios(`/api/v1/song?page=${page}&pageSize=${pageSize}`);
      if (res.status === 200) {
        const {
          data: { count, list, pages },
        } = res;
        dispatch(setSongList(list));
        dispatch(setCount(count));
        dispatch(setPages(pages));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
