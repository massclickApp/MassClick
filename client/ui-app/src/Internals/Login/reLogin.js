import React, { useState, useEffect } from "react";
import { Popover, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { relogin } from "../../redux/actions/authAction";

export default function Relogin() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setAnchorEl(document.body); 
        setOpen(true);
      }
    };

    checkTokenExpiration();

    const interval = setInterval(checkTokenExpiration, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleRelogin = () => {
    dispatch(relogin())
      .then(() => {
        setOpen(false);
        window.location.reload(); 
      })
      .catch((err) => console.error("Relogin failed:", err));
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={() => setOpen(false)}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <div style={{ padding: 20, textAlign: "center", minWidth: 250 }}>
        <Typography variant="h6" gutterBottom>
          Session Expired
        </Typography>
        <Typography variant="body2" gutterBottom>
          Your session has expired. Please relogin to continue.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleRelogin}>
          Relogin
        </Button>
      </div>
    </Popover>
  );
}
