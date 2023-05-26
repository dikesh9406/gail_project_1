import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Button, CircularProgress } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from 'axios';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2cb1bc",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const MotorDetails = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllData, setShowAllData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/motor/proxy');
        setData(response.data); // Store all the fetched data
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const interval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const showAllDataHandler = () => {
    setShowAllData(!showAllData);
  };

  const displayedData = showAllData ? data : data.slice(0, 5);

  return (
    <React.Fragment>
      <Paper sx={{ m: 2 }}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          sx={{
            color: "#ffffff",
            backgroundColor: "#2cb1bc",
            display: "block",
            padding: "5px 10px",
            borderRadius: "5px",
            marginBottom: "10px",
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
        >
          Recent data of Motor ID: {data.length > 0 ? data[0].motor_id : ""}
        </Typography>

        <Button
          variant="contained"
          onClick={showAllDataHandler}
          sx={{
            mt: 2,
            mx: "auto",
            display: "block",
            backgroundColor: "#000000",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#6b6b6b",
            },
            minWidth: 80,
            fontSize: "10px",
            padding: "4px 8px",
            marginBottom: "12px",
            position: "relative",
          }}
        >
          {showAllData ? "Hide data" : "Show data"}
        </Button>

        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Serial No.</StyledTableCell>
                <StyledTableCell align="right">Time</StyledTableCell>
                <StyledTableCell align="right">Current</StyledTableCell>
                <StyledTableCell align="right">Frequency</StyledTableCell>
                <StyledTableCell align="right">Reading ID</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <CircularProgress
                      color="primary"
                      sx={{ color: "#2cb1bc" }}
                    />
                  </TableCell>
                </TableRow>
              ) : (
                displayedData.map((item, index) => (
                  <StyledTableRow key={item.Reading_id}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="right">{item.Time}</StyledTableCell>
                    <StyledTableCell align="right">
                      {item.current}
                    </StyledTableCell>
                    <StyledTableCell align="right">{item.freq}</StyledTableCell>
                    <StyledTableCell align="right">
                      {item.Reading_id}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="new table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Fault Type</StyledTableCell>
                <StyledTableCell>Faults in last 1 week</StyledTableCell>
                <StyledTableCell>Faults in last 1 month</StyledTableCell>
                <StyledTableCell>Faults in last 1 year</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                "Broken Rotor Bar",
                "Broken End Ring",
                "Eccentricity",
                "Bearing Fault",
                "Inter-turn Short Circuit",
              ].map((item) => (
                <StyledTableRow key={item}>
                  <StyledTableCell>{item}</StyledTableCell>
                  <StyledTableCell>-</StyledTableCell>
                  <StyledTableCell>-</StyledTableCell>
                  <StyledTableCell>-</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </React.Fragment>
  );
};

export default MotorDetails;
