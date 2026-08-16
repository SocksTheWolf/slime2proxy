export const auth: Slime2.Auth.Settings = {
  twitch: {
    clientId: '72ngv9amto8x090vkn3p93nosqmgt5',
    scopes: [
      'chat:read',
      'channel:read:redemptions',
      'moderator:read:followers',
    ],
  },
  google: {
    clientId:
      '932208815805-oq2sevf3ida5idi4k84tlsh03nqc35cs.apps.googleusercontent.com',
    scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
  },
}
