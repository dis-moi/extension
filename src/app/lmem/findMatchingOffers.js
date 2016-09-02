export default function findMatchingOffers(url, offers) {
  return offers.filter(item => {
    return (new RegExp(item.url_regex, 'i').test(url));
  });
}