function calcAverage(reviews) {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((s, r) => s + (r.rating || 0), 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}
module.exports = calcAverage;
