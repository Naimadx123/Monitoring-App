const path = require('path');

module.exports = {
  packagerConfig: {
    icon: './icons/icon', // no file extension required
    extraFiles: [
      {
        from: path.join(__dirname, 'build', 'renderer'),
        to: path.join('renderer'),
      },
      {
        from: path.join(__dirname, 'build', 'preload', 'preload.cjs'),
        to: path.join('preload', 'preload.cjs'),
      },
    ],
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        platforms: ['win32'],
        certificateFile: './cert/cert.pfx',
        certificatePassword: "V7FPBujy2pYb9WLkamCe35TwdzGxDR6A",
        authors: 'Naimad, Kala',
        description: 'Focus'
      }
    }
  ]
};