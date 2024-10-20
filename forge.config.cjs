module.exports = {
  packagerConfig: {
    icon: './icons/icon', // no file extension required
    extraFiles: [
      {
        from: './build/renderer',
        to: 'renderer',
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