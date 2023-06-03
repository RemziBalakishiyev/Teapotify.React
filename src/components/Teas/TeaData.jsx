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
  const getTeaDatas = useCallback(async () => {
    try {
      const response = await fetch(
        "https://teapotify-6a7aa-default-rtdb.firebaseio.com/teas.json"
      );

      if (!response.ok) {
        throw new Error("There is error!");
      }
      const teaDatas = await response.json();
      const dataTeasGetModel = [];

      for (const key in teaDatas) {
        dataTeasGetModel.push({
          key: key,
          teaName: teaDatas[key].teaName,
          quantity: teaDatas[key].quantity,
          price: teaDatas[key].price,
        });
      }
      SetTeas(dataTeasGetModel);
    } catch (error) {
      alert(error.message);
    }
  }, []);

  useEffect(() => {
    getTeaDatas();
  }, [getTeaDatas]);

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
