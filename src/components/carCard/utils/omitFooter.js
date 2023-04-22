const omitFooter = (footer) => {
  if (footer.length > 20) {
    const endpoint = footer.indexOf(",");
    return footer.slice(0, endpoint) + "...";
  }

  return footer;
};

export default omitFooter;
