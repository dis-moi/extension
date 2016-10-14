export default function (recoURLs) {
  return Promise.all(
    recoURLs.map(u => fetch(u).then(resp => resp.json()))
  )
  .then((...recoss) => [].concat(...recoss));
}