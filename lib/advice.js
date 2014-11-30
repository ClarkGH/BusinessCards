var adviceContainer = [
  "You're beautiful.",
  "Take a break and breathe.",
  "You're too great to give up.",
  "Little by little, improve.",
  "Effort is the key.",
  "You have the talent you need.",
  "Make others happy."
];

exports.getAdvice = function() {
  var idx = Math.floor(Math.random() * adviceContainer.length);
  return adviceContainer[idx];
};