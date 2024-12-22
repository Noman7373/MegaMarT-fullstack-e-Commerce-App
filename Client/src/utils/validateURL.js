const validateURL = (name) => {
  return name
    .toString()
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .trim() // Remove leading and trailing whitespace
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
};

export default validateURL;
