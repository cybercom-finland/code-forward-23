# Serverless edge computing

* You can find the materials from the PDF next to this `README` file

## Instructions for the workshop

1. Sign up to the [Cloudflare](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Navigate to Workers Overview, Click create application, Select To-do list app and deploy it. Go visit your new application.
3. If you have `npm` installed on your machine, test out `Wrangler` by building a [QR code scanner](https://developers.cloudflare.com/workers/tutorials/build-a-qr-code-generator/) application with it.
   * `Wrangler` asked me about making an expection to the firewall configurations. It still worked even if no exceptions were made.
   * If you do not have `npm` installed but want to try out `Wrangler` or code on your local machine, [install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
4. BONUS: Set up a new Hello World project and add unit tests for the `worker.js`.
   * Testing: https://developers.cloudflare.com/workers/get-started/guide/#5-write-tests
   * I used Mocha and Chai, so the example code required some changes

## Other folders

### Unit tests

* An example of running unit tests against the worker can be found from [unit-tests](https://github.com/cybercom-finland/code-forward-23/tree/main/edge-computing/unit-tests) folder.

### QR code generator

* An example of QR code generator can be found from [qr-code-generator](https://github.com/cybercom-finland/code-forward-23/tree/main/edge-computing/qr-code-generator)
