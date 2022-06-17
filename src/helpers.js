export const authorUrls = {
  '18alantom': 'https://github.com/18alantom',
};

export function formatDate(date) {
  return new Date(date).toDateString().split(' ').slice(1).join(' ');
}

export function trim(str, lim = 140) {
  const snippet = str.trim().slice(0, lim);
  if (snippet.length < lim) {
    return snippet;
  }

  const words = snippet.split(' ');
  return words.slice(0, words.length - 1).join(' ') + '...';
}
