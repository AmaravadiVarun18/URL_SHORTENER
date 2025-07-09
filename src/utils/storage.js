const STORAGE_KEY = 'shortened_urls';

export const getAllUrls = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
};

export const saveUrl = (shortcode, data) => {
  const urls = getAllUrls();
  urls[shortcode] = data;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
};
