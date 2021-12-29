import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import env from 'react-dotenv'

ReactDOM.render(
  <Auth0Provider
    domain={env.AUTH0_DOMAIN}
    clientId={env.AUTH0_CLIENT_ID}
    redirectUri={window.location.origin}
    audience={env.AUTH0_AUDIENCE}
    scope="read:todolists create:todolists update:todolists delete:todolists"
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>,
  document.getElementById("root")
);

// style and maybe add postgres to backend
// otherwise, deploy