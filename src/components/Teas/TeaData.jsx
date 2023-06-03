import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  styled,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useCallback, useEffect, useState } from "react";
import useHttp from "../../hooks/http";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TeaData(props) {
  const [teas, SetTeas] = useState([]);

  const applyData = (data) => {
    const dataTeasGetModel = [];

    for (const key in data) {
      dataTeasGetModel.push({
        key: key,
        teaName: data[key].teaName,
        quantity: data[key].quantity,
        price: data[key].price,
      });
    }
    SetTeas(dataTeasGetModel);
  };

  const { httpRequest: getTeaDatas } = useHttp(
    {
      url: "https://teapotify-6a7aa-default-rtdb.firebaseio.com/teas.json",
    },
    applyData
  );

  useEffect(() => {
    getTeaDatas();
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{ width: { lg: "1000px", xs: "500px" } }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Tea Name</StyledTableCell>
            <StyledTableCell>Quantity</StyledTableCell>
            <StyledTableCell>Price</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teas.map((tea) => (
            <TableRow key={tea.key}>
              <TableCell>{tea.teaName}</TableCell>
              <TableCell>{tea.quantity}</TableCell>
              <TableCell>{tea.price}$</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
