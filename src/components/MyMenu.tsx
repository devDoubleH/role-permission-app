import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
interface Props {
  name: string;
  can: string;
}

function MyMenu(props: Props) {
  const [type, setType] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const api = axios.create({
    baseURL: "https://role-permission-app.herokuapp.com/",
  });

  const { can, name } = props;

  const postCan = async (can: number) => {
    try {
      api
        .put("/api/users", {
          name,
          can,
        })
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        variant="text"
        color="inherit"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {type ? type : can}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            postCan(10);
            handleClose();
            setType("Read");
          }}
        >
          Read
        </MenuItem>
        <MenuItem
          onClick={() => {
            postCan(20);
            handleClose();
            setType("Write");
          }}
        >
          Write
        </MenuItem>
        <MenuItem
          onClick={() => {
            postCan(30);
            handleClose();
            setType("Delete");
          }}
        >
          Delete
        </MenuItem>
        <MenuItem
          onClick={() => {
            postCan(40);
            handleClose();
            setType("Update");
          }}
        >
          Update
        </MenuItem>
        <MenuItem
          onClick={() => {
            postCan(50);
            handleClose();
            setType("Admin");
          }}
        >
          Admin
        </MenuItem>
      </Menu>
    </>
  );
}

export default MyMenu;
