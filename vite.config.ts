import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import Components from 'unplugin-vue-components/vite';
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // ant 自动 引入
        Components({
            resolvers: [
                AntDesignVueResolver({
                    importStyle: false, // css in js
                    resolveIcons: true // 自动引入图标
                }),
            ]
        })
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, 'src'), // 路径别名
        },
        extensions: ['.js', '.json', '.ts'], // 使用路径别名时想要省略的后缀名，可以自己 增减

    },
    server:{
        proxy:{
            '/api':{
                target:'http://127.0.0.1:9999',
                changeOrigin: true,
            }
        }
    }
})
