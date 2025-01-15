import { generateService } from '@umijs/openapi'

generateService({
    requestLibPath: "import request from '@/axios'",
    schemaPath: 'http://localhost:9999/api/v2/api-docs',
    serversPath: './src',
})
