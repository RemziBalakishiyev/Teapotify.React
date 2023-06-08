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
import { useCallback, useEffect, useState } from "react";
import useHttp from "../../hook/use-http";
import DotLoader from "react-spinners/DotLoader";
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
  const [pg, setpg] = useState(0);
  const [rpg, setrpg] = useState(5);

  const transformData = (data) => {
    const dataTeasGetModel = Object.entries(data).map(([key, value]) => ({
      key: key,
      ...value,
    }));
    SetTeas(dataTeasGetModel);
  };

  const { loading, httpRequest: getTeaDatas } = useHttp();

  useEffect(() => {
    getTeaDatas(
      {
        url: "https://teapotify-6a7aa-default-rtdb.firebaseio.com/teas.json",
      },
      transformData
    );
  }, [getTeaDatas, props.loadNewTea]);

  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }

  let loader = <DotLoader color='#cc09f2' />;

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
        <TableBody
          sx={
            loading
              ? {
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }
              : {}
          }
        >
          {loading
            ? loader
            : teas.slice(pg * rpg, pg * rpg + rpg).map((tea) => (
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
          rowsPerPage={rpg}
          page={pg}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Table>
    </TableContainer>
  );
}
