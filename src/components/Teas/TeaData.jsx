import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  styled,
  TablePagination,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { DotLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import useHttp from "../../hook/use-http";

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
  const [rowPerPages, setRowPerPages] = useState(5);
  const [rowPages, setRowPages] = useState(0);

  const handlePage = (e, newpage) => {
    console.log("new page", newpage);
    console.log("per page", rowPerPages);
    setRowPages(newpage);
  };

  const handlePerPage = (e) => {
    setRowPerPages(e.target.value);
    setRowPages(0);
  };
  const transformData = (data) => {
    const dataTeasGetModel = Object.entries(data).map(([key, value]) => ({
      key: key,
      ...value,
    }));
    SetTeas(dataTeasGetModel);
  };

  const { isLoading, httpRequest: getTeaDatas } = useHttp();

  useEffect(() => {
    getTeaDatas(
      {
        url: "https://teapotify-6a7aa-default-rtdb.firebaseio.com/teas.json",
      },
      transformData
    );
  }, [props.loadNewTea]);

  if (isLoading) {
    return <DotLoader color='#d714c3' size={200} />;
  }
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
          {teas
            .slice(rowPages * rowPerPages, rowPages * rowPerPages + rowPerPages)
            .map((tea) => (
              <TableRow key={tea.key}>
                <TableCell>{tea.teaName}</TableCell>
                <TableCell>{tea.quantity}</TableCell>
                <TableCell>{tea.price}$</TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={teas.length}
          rowsPerPage={rowPerPages}
          page={rowPages}
          onPageChange={handlePage}
          onRowsPerPageChange={handlePerPage}
        />
      </Table>
    </TableContainer>
  );
}
