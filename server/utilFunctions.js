// returns the content type for the given file extension
export const getContentType = (pathname) => {
  const extension = pathname.split(".").pop();
  switch (extension) {
    case "html":
      return "text/html";
    case "css":
      return "text/css";
    case "js":
      return "text/javascript";
    case "png":
      return "image/png";
    case "jpg":
      return "image/jpg";
    case "jpeg":
      return "image/jpeg";
    case "gif":
      return "image/gif";
    default:
      return "text/plain";
  }
};

// checks if a file exists
export const fileExists = async (filename) => {
  try {
    await Deno.stat(filename);
    // successful, file or directory must exist
    return true;
  } catch {
    return false;
  }
};
