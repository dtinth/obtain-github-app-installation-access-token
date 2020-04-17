import { cli } from 'tkt'
import { App } from '@octokit/app'
import { readFileSync } from 'fs'

cli()
  .command(
    '$0',
    'Obtains a GitHub App Installation Token from command-line arguments',
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
    async (args) => {
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
  .command(
    'ci <token>',
    'Obtains a GitHub App Installation Token from Base64-encoded credentials token',
    {
      token: {
        description:
          'Base64-encoded of JSON object with { appId, installationId, privateKey }',
        type: 'string',
        demand: true,
      },
    },
    async (args) => {
      const payload = JSON.parse(Buffer.from(args.token, 'base64').toString())
      const app = new App({
        id: +payload.appId,
        privateKey: payload.privateKey,
      })
      const installationAccessToken = await app.getInstallationAccessToken({
        installationId: +payload.installationId,
      })
      console.log(installationAccessToken)
    },
  )
  .parse()
