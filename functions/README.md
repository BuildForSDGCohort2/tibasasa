# Tibasasa Cloud Functions

## Quickstart Guides

- For Firebase functions, use the guide available [here](https://firebase.google.com/docs/functions/get-started).

- For Google Cloud Functions, use the guide available [here](https://cloud.google.com/functions/docs/writing).

## Environment Configuration

- [Google Cloud](https://cloud.google.com/functions/docs/env-var)
- [Firebase](https://firebase.google.com/docs/functions/config-env)

## Deployment

As Firebase Functions only support JavaScript, deploying any non-JS functions will be done through the `gcloud` cli tool.

### Deploying Firebase Functions

To deploy Firebase functions, use the command

```
firebase deploy --only functions
```

This will deploy all functions inside `index.js` even if they existed previously. To deploy a specific function, you can use the command:

```
firebase deploy --only functions:functionName1,functions:functionName2,...
```

### Deploying Google Cloud Functions

For Python functions, since `gcloud` relies on a `requirements.txt` file for dependencies, generate it using the following command:

```
pipenv lock -r | tee requirements.txt
```

To deploy Google Cloud Functions, use the the guide available [here](https://cloud.google.com/sdk/gcloud/reference/functions/deploy).
