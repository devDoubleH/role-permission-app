import React from "react";
import { FC, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import {
  Fab,
  Dialog,
  DialogTitle,
  TextField,
  Box,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// @ts-ignore
import MyMenu from "./components/MyMenu.tsx";

const api = axios.create({
  baseURL: "https://role-permission-app.herokuapp.com/",
});

const App: FC = () => {
  const [data, setData] = useState([]);
  const [state, setState] = useState({});
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };

  const getData = async () => {
    try {
      api
        .get("/api/users")
        .then((res) => {
          setData(res.data);
        })
        .finally(() => {
          console.log("request finished");
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let newState = {};
    data.forEach((item: any) => {
      newState[item.name] = item.verified;
    });
    setState(newState);
  }, [data]);

  const addUser = () => {
    try {
      api
        .post("/api/users", {
          name,
          company,
          role,
          status,
        })
        .then((res) => {
          getData();
          setName("");
          setCompany("");
          setRole("");
          setStatus("");
        })
        .finally(() => {
          console.log("request finished");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center p-10">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Company</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Can</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.company}</TableCell>
                <TableCell align="center">{row.role}</TableCell>
                <TableCell align="center">
                  <MyMenu can={row.can} name={row.name} />
                </TableCell>
                <TableCell align="center">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={handleClose}
        fullWidth
      >
        <DialogTitle
          id="simple-dialog-title"
          className="flex justify-center items-center text-4xl"
        >
          Dialog Title
        </DialogTitle>
        <Box className="flex flex-col h-96 justify-around items-center">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            className="mb-5 w-96 h-14"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <TextField
            id="outlined-basic"
            label="Company"
            variant="outlined"
            className="mb-5 w-96 h-14"
            onChange={(e) => setCompany(e.target.value)}
            value={company}
          />
          <TextField
            id="outlined-basic"
            label="Role"
            variant="outlined"
            className="mb-5 w-96 h-14"
            onChange={(e) => setRole(e.target.value)}
            value={role}
          />
          <TextField
            id="outlined-basic"
            label="Status"
            variant="outlined"
            className="mb-5 w-96 h-14"
            onChange={(e) => setStatus(e.target.value)}
            value={status}
          />
          <Box className="flex justify-around items-center w-40 self-end mr-20">
            <Button variant="text" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="text"
              onClick={() => {
                addUser();
                handleClose();
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "absolute", bottom: 40, right: 40 }}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default App;
