function generateRelativeUrl(filePath, startToRemove, endToRemove) {
  if (!filePath.startsWith(startToRemove)) {
    throw new Error(
      "File path must begin with `startToRemove` when `startToRemove` is specified"
    );
  }
  const relativeUrl = filePath.slice(
    startToRemove.length,
    filePath.length - endToRemove.length
  );
  return relativeUrl;
}

module.exports = { generateRelativeUrl };
