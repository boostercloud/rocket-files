import * as fs from 'fs'
import * as path from 'path'
import { boosterRocketDispatcher } from '@boostercloud/framework-core'
import { functionID } from '@boostercloud/rocket-file-uploads-types'
import { rocketFunctionIDEnvVar } from '@boostercloud/framework-types'

export function fsWatch(storageName: string, containerName: string, directory: string, port: number): void {
  const _path = path.join(process.cwd(), storageName, containerName, directory)
  if (!fs.existsSync(_path)) {
    fs.mkdirSync(_path, { recursive: true })
  }
  fs.watch(_path, async (eventType: 'rename' | 'change', filename: string) => {
    const uri = `http://localhost:${port}/${path.join(storageName, containerName, directory, filename)}`
    const name = path.join(directory, filename)
    await boosterRocketDispatcher({
      [rocketFunctionIDEnvVar]: functionID,
      uri: uri,
      name: name,
    })
  })
}
