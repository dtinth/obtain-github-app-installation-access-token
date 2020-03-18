import { cli } from 'tkt'
import { App } from '@octokit/app'
import { readFileSync } from 'fs'

cli()
  .command(
    '$0',
    'Obtains a GitHub App Installation Token',
    {
      appId: {
        alias: 'a',
        description: 'App ID',
        type: 'number',
        demand: true,
      },
      installationId: {
        alias: 'i',
        description: 'App Installation ID',
        type: 'number',
        demand: true,
      },
      privateKey: {
        alias: 'k',
        description: 'Private Key',
        type: 'string',
        demand: true,
      },
    },
    async args => {
      const app = new App({
        id: args.appId,
        privateKey: readFileSync(args.privateKey, 'utf8'),
      })
      const installationAccessToken = await app.getInstallationAccessToken({
        installationId: args.installationId,
      })
      console.log(installationAccessToken)
    },
  )
  .parse()
