import { useMediaQuery, Box, Typography, useTheme } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";

export function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1976d2",
        padding: "20px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row", // Stack columns on mobile
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        color: "common.white",
        marginTop: "auto",
      }}
    >
      <Box sx={{ flex: 1, alignItems: "center", display: "flex", gap: 1 }}>
        <CopyrightIcon />
        <Typography variant="body2">MedExpress 2024</Typography>
      </Box>

      <Box sx={{ flex: 3 }}>
        <Typography variant="body1">
          Company Number: 08805262 | 87a Worship Street, London, United Kingdom,
          EC2A 2BE | VAT Number: GB186080986 | DUNS Number: 21-978-4663{" "}
        </Typography>
      </Box>
    </Box>
  );
}
