# Docker Registry UI #

This project provides a single-page [react](https://facebook.github.io/react/) app to view the images in a Docker v2 compatible registry.

## Quick Start ##

Copy **.env.example** file to **.env**. Update the urls to point to your docker registry and documentation path (if any).  Then simply run `npm install && npm start` from the checkout directory.  For production builds, use `npm build` to generate a deployable artifact.

## Documentation Links ##

When providing a documentation base url, the registry UI will build links to documentation by appending the full image name (without tags) to the user as a link.  The documentation endpoint should support URIs in the format of <baseURL>/namespace/image-name.

## Docker Container ##

### Building ###

Ensure your .env file contents look correct.  Then run `docker build -t docker-registry-ui:latest .`

### Running ###

`docker run -p 8080:80 docker-registry-ui`
