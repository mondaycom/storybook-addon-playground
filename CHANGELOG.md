# [1.3.0](https://github.com/mondaycom/storybook-addon-playground/compare/v1.2.0...v1.3.0) (2024-02-07)


### Bug Fixes

* **useToolbarActions:** do not update code if current and new code are equal ([#40](https://github.com/mondaycom/storybook-addon-playground/issues/40)) ([7bee879](https://github.com/mondaycom/storybook-addon-playground/commit/7bee879eac18ee2371a6f12f45dca5dc84f9a4a8))


### Features

* **Panel:** make topbar and left tabs sticky ([#39](https://github.com/mondaycom/storybook-addon-playground/issues/39)) ([44fa35e](https://github.com/mondaycom/storybook-addon-playground/commit/44fa35e84a026a3f733bcb9f21b19e9d11d352fa))

# [1.2.0](https://github.com/mondaycom/storybook-addon-playground/compare/v1.1.0...v1.2.0) (2024-01-18)


### Features

* migrate to react-live ([#35](https://github.com/mondaycom/storybook-addon-playground/issues/35)) ([f47256b](https://github.com/mondaycom/storybook-addon-playground/commit/f47256ba4283ac0e39a38030f9f4c6ca1fa9c121))

# [1.1.0](https://github.com/mondaycom/storybook-addon-playground/compare/v1.0.4...v1.1.0) (2024-01-18)


### Bug Fixes

* beaker on Tool and EditorToolbar is not opening playground ([#30](https://github.com/mondaycom/storybook-addon-playground/issues/30)) ([0d6391e](https://github.com/mondaycom/storybook-addon-playground/commit/0d6391e66430de356998e05f102fa8f930447ebb))
* **EditorTabs:** fix shrinking tabs + add a11y to Tab component ([#32](https://github.com/mondaycom/storybook-addon-playground/issues/32)) ([0cf857e](https://github.com/mondaycom/storybook-addon-playground/commit/0cf857e23b6a631e34a1a8f3d55df7551b04ec2c))
* **format:** updating the code should only be done in case format result is valid ([#31](https://github.com/mondaycom/storybook-addon-playground/issues/31)) ([59fb474](https://github.com/mondaycom/storybook-addon-playground/commit/59fb4740251fcb72151312167d2178b7ea4d09e4))


### Features

* automatically open playground panel when navigating to playground story ([#29](https://github.com/mondaycom/storybook-addon-playground/issues/29)) ([ad81616](https://github.com/mondaycom/storybook-addon-playground/commit/ad816166584c00af8d132501fa82756893c23a4e))

## [1.0.4](https://github.com/mondaycom/storybook-addon-playground/compare/v1.0.3...v1.0.4) (2024-01-15)


### Bug Fixes

* editor should have self code state to not have circular dependency, change to events-based mechanism ([#26](https://github.com/mondaycom/storybook-addon-playground/issues/26)) ([13fffa9](https://github.com/mondaycom/storybook-addon-playground/commit/13fffa9395f042e7448217945feb5fd7d7dbf0bc))

## [1.0.3](https://github.com/mondaycom/storybook-addon-playground/compare/v1.0.2...v1.0.3) (2023-12-20)


### Bug Fixes

* style inject on build ([#12](https://github.com/mondaycom/storybook-addon-playground/issues/12)) ([a9029d9](https://github.com/mondaycom/storybook-addon-playground/commit/a9029d9af617fb4e9a202adf6a9b262fad451e2b))

## [1.0.2](https://github.com/mondaycom/storybook-addon-playground/compare/v1.0.1...v1.0.2) (2023-12-20)


### Bug Fixes

* **build:** include style-inject as dependency, downgrade [@semantic-release](https://github.com/semantic-release) packages as it required node >=18.17 ([#14](https://github.com/mondaycom/storybook-addon-playground/issues/14)) ([7b9e933](https://github.com/mondaycom/storybook-addon-playground/commit/7b9e933ce481cfabdcbfb06e61827e22a7a5ff89))
