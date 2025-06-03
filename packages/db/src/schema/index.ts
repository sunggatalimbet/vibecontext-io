// Re-export for convenience

import { docs } from './docs'
import { projects } from './projects'
import { promptNodes } from './prompt-nodes'
import { prompts } from './prompts'

export { projects } from './projects'
export { prompts } from './prompts'
export { promptNodes } from './prompt-nodes'
export { docs } from './docs'

export const schema = {
  projects,
  prompts,
  promptNodes,
  docs,
}
