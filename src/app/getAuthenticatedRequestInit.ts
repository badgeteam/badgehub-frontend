export const getAuthenticatedRequestInit = (token: string) => {
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });
  const options: RequestInit = {
    headers: Object.fromEntries(headers.entries()),
  };
  return options;
};
