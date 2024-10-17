module.exports = {
  packagerConfig: {
    icon: './copy/icons/icon' // no file extension required
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        authors: 'Naimad',
        description: 'An example Electron app'
      }
    }
  ]
};