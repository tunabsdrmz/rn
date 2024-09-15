export const createNotification = async (token, type, delay) => {
  return await fetch('https://challenges.cask.com.tr/api', {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      v: 1,
      platform: 'app',
      admmdlid:
        '12f3894ed72fc7d4e3b98688b20513e20a3fa1adbd08b9662412322138d26533',
      scope: '8fbff85cb7a2b8cbd53b3086c0b16d4c1e96a5d748cbf8761bace32ab294e83a',
      fcm_token: token,
      pn_type: type,
      pn_delay: delay,
      dev_mode: false,
    }),
  });
};
