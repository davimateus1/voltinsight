export const extractPublicId = (url: string) => {
  const regex = /\/v\d+\/(.*?)(?:\.\w+)?$/;
  const match = url.match(regex);
  return match ? match[1] : '';
};
