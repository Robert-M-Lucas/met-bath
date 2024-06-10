# Budget-19

## Starting Development

When making changes, create a branch with the name `dev-[issue-name]`
e.g. `dev-migrate-website` and work on that. See [deployment](#deployment) for
instructions on how to deploy your changes.

## Files

Initial page setup (e.g. title): `/index.html`

Router config ([docs](https://reactrouter.com/en/main)): `/src/router.tsx`

See other folders in `src` for example files within.

## Commands

Sync packages: `npm install`

Serve webpage locally: `npm run dev`

> If you use WebStorm (Jetbrains), `npm run dev` and firebase deployment
will be automatically set up as run configs from files in `.run`

### Firebase

Install Firebase tools: `npm install -g firebase-tools`

Login to Firebase: `firebase login`

Configure Firebase settings: `firebase init`
> :warning: Overwrites current settings! You shouldn't need to use this!

Configure Firebase emulator(s): `firebase init emulators`

Start Firebase emulator(s): `firebase emulators:start`

## Deployment

> :warning: Do not use `firebase deploy` to deploy! This will circumvent GitHub and deploy
to the live website!

### Test Deployment

Creating a tiles deployment to Firebase:
```
npm run build
firebase hosting:channel:deploy [Test Deployment Name]
```

### Production Deployment

Making a [pull request](https://github.com/Robert-M-Lucas/budget-19/compare)
will automatically create a tiles deployment to Firebase (i.e. not
overwrite the production app). You should see a message below your new pull
request notifying you that your changes are being deployed (to a test URL). Click on
the link shown when this is complete to view your changes. The pull
request can them be merged into the `master` branch from which it'll
be automatically deployed to https://met-bath.web.app/.