const calculateItemValue = (
  brand,
  condition,
  category
) => {
  let score = 0;

  // Brand Score
  const brandScores = {
    Nike: 40,
    Adidas: 35,
    Puma: 30,
    Zara: 25,
    H&M: 20,
  };

  score += brandScores[brand] || 10;

  // Condition Score
  const conditionScores = {
    New: 40,
    Excellent: 30,
    Good: 20,
    Fair: 10,
  };

  score += conditionScores[condition] || 5;

  // Category Score
  const categoryScores = {
    Jacket: 25,
    Hoodie: 20,
    Jeans: 18,
    Shirt: 15,
    TShirt: 12,
  };

  score += categoryScores[category] || 10;

  return score;
};

export default calculateItemValue;