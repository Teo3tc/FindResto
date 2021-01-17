import { Loader } from "@googlemaps/js-api-loader"
export const loader = new Loader({
    apiKey: "KEY_API",
    version: "weekly",
    libraries: ["places"]
})
