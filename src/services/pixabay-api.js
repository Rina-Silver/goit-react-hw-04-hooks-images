const BASE_URL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&per_page=12';
const API_KEY = '23479775-7c8a7e565023089f3ce2cecd2';

export function fetchPixabayImg(query, page) {
  return fetch(`${BASE_URL}&q=${query}&page=${page}&key=${API_KEY}`).then(
    res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Что-то пошло не так`));
    },
  );
}
