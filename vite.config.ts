import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import os from 'os';
import qrcode from 'qrcode-terminal';

function getLocalIp(): string {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

function terminalQrPlugin(): Plugin {
  return {
    name: 'terminal-qr-code',
    configureServer(server) {
      server.httpServer?.once('listening', () => {
        const address = server.httpServer?.address();
        const port = typeof address === 'object' && address ? address.port : 5173;
        const localIp = getLocalIp();
        const mobileUrl = `http://${localIp}:${port}`;

        setTimeout(() => {
          console.log('\n\x1b[36m%s\x1b[0m', '=======================================================');
          console.log('\x1b[1m\x1b[32m%s\x1b[0m', ' 📱 SCAN THIS QR CODE WITH PHONE CAMERA FOR MOBILE APP:');
          console.log('\x1b[33m%s\x1b[0m', `    Mobile Access Link: ${mobileUrl}`);
          console.log('\x1b[36m%s\x1b[0m', '=======================================================');
          qrcode.generate(mobileUrl, { small: true });
          console.log('\x1b[36m%s\x1b[0m\n', '=======================================================');
        }, 400);
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    terminalQrPlugin(),
  ],
});
