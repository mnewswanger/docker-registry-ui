# Docker Registry UI #

This project provides a single-page [react](https://facebook.github.io/react/) app to view the images in a Docker v2 compatible registry.

## Quick Start ##

Update the default registry and documentation path (if any) to your registry defaults (or blank if no default should be specified).  Then simply run `npm install && npm start` from the checkout directory.  For production builds, use `npm build` to generate a deployable artifact.

## Documentation Links ##

When providing a documentation base url, the registry UI will build links to documentation by appending the full image name (without tags) to the user as a link.  The documentation endpoint should support URIs in the format of <baseURL>/namespace/image-name.
