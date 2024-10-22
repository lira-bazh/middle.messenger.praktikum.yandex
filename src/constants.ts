export const ROOT_TAG = 'app';
export const HOST = 'ya-praktikum.tech';

export const WS_URL = `wss://${HOST}/ws/chats`;
export const COMMON_URL = `https://${HOST}/api/v2`;

export const ENDPOINTS = {
  signin: `${COMMON_URL}/auth/signin`,
  signup: `${COMMON_URL}/auth/signup`,
  auth: `${COMMON_URL}/auth/user`,
  logout: `${COMMON_URL}/auth/logout`,
  changeProfile: `${COMMON_URL}/user/profile`,
  changeProfileAvatar: `${COMMON_URL}/user/profile/avatar`,
  changePassword: `${COMMON_URL}/user/password`,
  searchUser: `${COMMON_URL}/user/search`,
  chats: `${COMMON_URL}/chats`,
  addUsersToChat: `${COMMON_URL}/chats/users`,
  chatToken: (id: number) => `${COMMON_URL}/chats/token/${id}`,
};

export const REQUEST_STATUSES = {
  OK: 200,
};
