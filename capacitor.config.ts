import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jasprmarket.app',
  appName: 'JASPR Market',
  webDir: 'build',
  plugins: {
    App: {
      // Register the custom URL scheme for deep links
      // MyFatoorah will redirect to com.jasprmarket.app://payment-success?paymentId=XXXX
    }
  }
};

export default config;
