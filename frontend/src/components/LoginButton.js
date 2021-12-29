import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography } from "@mui/material";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
      <Button variant="outlined" onClick={() => loginWithRedirect()}><Typography variant='h3'>Log In Here</Typography></Button>
  );
};

export default LoginButton;