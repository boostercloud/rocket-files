import { BoosterConfig } from '@boostercloud/framework-types'

export async function presignedGet(
  config: BoosterConfig,
  containerName: string,
  directory: string,
  fileName: string
): Promise<string> {
  return `http://localhost:3000/${containerName}/${directory}/${fileName}`
}
