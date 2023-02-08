import { BoosterConfig } from '@boostercloud/framework-types'
import { RocketFilesUserConfiguration } from '@boostercloud/rocket-file-uploads-types'
import { s3 } from '../common'

export async function presignedGet(
  config: BoosterConfig,
  rocketFilesUserConfiguration: RocketFilesUserConfiguration,
  directory: string,
  fileName: string
): Promise<string> {
  const bucketName = rocketFilesUserConfiguration.storageName + '-' + config.environmentName
  const params = {
    Bucket: bucketName,
    Key: `${directory}/${fileName}`,
  }
  return s3.getSignedUrl('getObject', params)
}
