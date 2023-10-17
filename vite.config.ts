import { fileURLToPath, URL } from 'node:url'
import { ConfigEnv, loadEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const ENV = loadEnv(mode, process.cwd())

  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: ['vue', 'vue-router'],
        dts: fileURLToPath(new URL('./src/types/auto-imports.d.ts', import.meta.url))
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: fileURLToPath(new URL('./src/types/components.d.ts', import.meta.url))
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: Number(ENV.VITE_APP_PORT),
      proxy: {
        [ENV.VITE_APP_BASE_URL]: {
          target: ENV.VITE_APP_TARGET,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/v1\/api/, '/api/v1')
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`
        }
      }
    },
    define: {
      __BASE_URL__: JSON.stringify(ENV.VITE_APP_BASE_URL)
    }
  }
}
