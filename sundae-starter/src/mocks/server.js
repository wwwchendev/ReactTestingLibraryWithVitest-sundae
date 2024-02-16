//在 Node.js 中設定 Mock Service Worker
//https://mswjs.io/docs/integrations/node

import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)