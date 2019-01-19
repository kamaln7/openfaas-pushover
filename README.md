# 📬 openfaas-pushover

An OpenFaas function that uses Pushover to send push notifications.

## Usage

Once deployed, you can either call it directly or using `faas-cli`. `openfaas-pushover` will first attempt to parse the input body as a JSON object. If unsuccessful, it will use it whole as a plaintext message.

When providing a JSON object, you can pass the following options:

- `message`
- `title`
- `url`
- `url_title`

### Examples

```
curl --data-binary "Plaintext message" https://gateway/function/notify-device/?password=secretPassword
```

```
echo '{"message": "openfaas-pushover repo", "url": "https://github.com/kamaln7/openfaas-pushover"}' | faas-cli invoke notify-device --query password=secretPassword
```

## Deploying

You will need three secrets:

- `pushover-fn-password`: A password for the function (an intentionally simple auth mechanism). You will need to provide the password to invoke the function.
- [Pushover](https://pushover.net/):
  - `pushover-user`: Your user key
  - `pushover-token`: An application's API token

Follow the [OpenFaaS documentation on Secrets](https://docs.openfaas.com/reference/secrets/) to add them to Kubernetes.

Add the contents of `notify-device.yml` to your `stack.yml` or use it directly as is if you don't want to make any changes to it.

Deploy using `faas-cli up`, passing `-f notify-device.yml` if you didn't copy to your `stack.yml`.

## Testing

It's also possible to run the function locally using node for testing. Set the secrets listed above as environment variables in the following format: `pushover-fn-password` becomes `secret_pushover_fn_password`.

Then, run `node notify-device/test.js`. Pipe in input to stdin or enter it directly after running followed by `Ctrl-D`.
