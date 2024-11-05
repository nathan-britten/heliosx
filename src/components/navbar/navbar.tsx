import { Box, AppBar, Toolbar } from "@mui/material";
import logo from "../../assets/me_logo.webp";

export function NavBar() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ maxWidth: 200, display: "flex" }}>
            <Box
              component="img"
              src={logo}
              alt="medexpress logo"
              sx={{ maxWidth: "100%" }}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
