export const mapper = images =>
  images.map(({ id, largeImageURL, webformatURL }) => ({
    id,
    largeImageURL,
    webformatURL,
  }));
