# obtain-github-app-installation-access-token

A simple CLI to obtain a GitHub App Installation Access Token.

```
npx obtain-github-app-installation-access-token \
  -a <appId> -i <installationId> -k <path/to/private-key.pem>
```

(An installation access token is then printed out to the standard output.)

This source code is compiled using [@zeit/ncc](https://github.com/zeit/ncc) into a single `.js` file which is then published to `npm`, so it installs and runs fast!
