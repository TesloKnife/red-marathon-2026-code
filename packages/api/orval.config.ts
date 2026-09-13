import { defineConfig } from 'orval'

export default defineConfig({
  petstore: {
    output: {
      mode: 'tags-split',
      target: 'src/api/petstore.ts',
      schemas: 'src/api/model',
      client: 'react-query',
      mock: true
    },
    input: {
      target: './petstore.yaml'
    }
  }
})
