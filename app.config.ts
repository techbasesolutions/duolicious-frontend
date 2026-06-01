import { ExpoConfig } from 'expo/config';

// In SDK 46 and lower, use the following import instead:
// import { ExpoConfig } from '@expo/config-types';

const config: ExpoConfig = {
  name: 'Ahavah',
  slug: 'ahavah',
  scheme: 'ahavah',
  version: "0.1.0",
  orientation: "portrait",
  icon: './assets/icon.png',
  newArchEnabled: true,
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    "**/*"
  ],
  androidNavigationBar: {
    barStyle: "light-content",
    backgroundColor: '#000000'
  },
  extra: {
    // EAS projectId reset; will be populated by `eas init` in Task 0.10.
    apiUrl: process.env.AHAVAH_API_URL,
    chatUrl: process.env.AHAVAH_CHAT_URL,
    imagesUrl: process.env.AHAVAH_IMAGES_URL,
    audioUrl: process.env.AHAVAH_AUDIO_URL,
    statusUrl: process.env.AHAVAH_STATUS_URL,
    inviteUrl: process.env.AHAVAH_INVITE_URL,
    webUrl: process.env.AHAVAH_WEB_URL,
    partnerUrl: process.env.AHAVAH_PARTNER_URL,
    webVersion: process.env.AHAVAH_WEB_VERSION,
    tenorApiKey: process.env.AHAVAH_TENOR_API_KEY,
    notificationIconUrl: process.env.NOTIFICATION_ICON_URL,
    notificationSoundUrl: process.env.NOTIFICATION_SOUND_URL,
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  ios: {
    bundleIdentifier: "com.techbasesolutions.ahavah",
    supportsTablet: false,
    // associatedDomains: stripped — re-add once Ahavah's deep-link domain is live.
    // appStoreUrl: stripped — re-add post-submission.
    infoPlist: {
      NSMicrophoneUsageDescription: "Ahavah uses the microphone to record voice messages and capture audio for your profile.",
      NSCameraUsageDescription: "Ahavah uses the camera to take profile photos and verify your identity.",
      NSPhotoLibraryUsageDescription: "Ahavah uses your photo library so you can choose profile photos.",
      ITSAppUsesNonExemptEncryption: false
    },
  },
  android: {
    // googleServicesFile: stripped — re-add once Ahavah's Firebase project exists.
    package: "com.techbasesolutions.ahavah",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#000000"
    },
    // intentFilters: stripped — re-add once Ahavah's deep-link domain is live.
    // playStoreUrl: stripped — re-add post-submission.
    blockedPermissions: [
      'android.permission.READ_MEDIA_IMAGES',
      'android.permission.READ_MEDIA_VIDEO',
    ],
  },
  plugins: [
    "expo-image-picker",
    "expo-secure-store",
    [
      "expo-notifications",
      {
        "icon": "./assets/notification.png",
        "color": "#5524F5",
        "sounds": [
          "./assets/audio/notification.mp3"
        ]
      }
    ],
    [
      "expo-splash-screen",
      {
        backgroundColor: "#000000",
        image: "./assets/splash.png",
        imageWidth: 300,
      }
    ]
  ],
};

export default config;
