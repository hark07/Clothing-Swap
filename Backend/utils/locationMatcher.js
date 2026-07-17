const findNearbyItems = (
  items,
  userLocation
) => {
  return items.filter(
    (item) =>
      item.location
        .toLowerCase()
        .trim() ===
      userLocation
        .toLowerCase()
        .trim()
  );
};

export default findNearbyItems;