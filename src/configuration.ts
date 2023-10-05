import { readFileSync } from 'fs'
import { join } from 'path'
import * as _ from 'lodash'
import * as yaml from 'js-yaml'

const YAML_CONFIG_FILENAME = 'config'
const YAML_CONFIG_FILESUFFIX = 'yml'

const commonPath = join(
  __dirname,
  '../config',
  `${YAML_CONFIG_FILENAME}.${YAML_CONFIG_FILESUFFIX}`
)
const envPath = join(
  __dirname,
  '../config',
  `${YAML_CONFIG_FILENAME}.${
    process.env.NODE_ENV || 'development'
  }.${YAML_CONFIG_FILESUFFIX}`
)

const commonConfig = yaml.load(readFileSync(commonPath, 'utf8'))
const envConfig = yaml.load(readFileSync(envPath, 'utf8'))

export default () => {
  return _.merge(commonConfig, envConfig)
}
