import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useStockCalls from "../hooks/useStockCalls";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { arrowStyle, btnHoverStyle, flexCenter } from "../styles/globalStyle";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";

const Products = () => {
  const { getBrands, getCategories, getProducts } = useStockCalls();
  const { products } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const [sortedProducts, setSortedProducts] = useState(products);
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  });
  useEffect(() => {
    getBrands();
    getCategories();
    getProducts();
  }, []);

  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

  const [toggle, setToggle] = useState({
    brand: 1,
    name: 1,
    stock: 1,
  });

  const handleSort = (arg, type) => {
    setToggle({ ...toggle, [arg]: toggle[arg] * -1 });

    setSortedProducts(
      sortedProducts
        ?.map((item) => item)
        .sort((a, b) => {
          if (type === "date") {
            return toggle[arg] * (new Date(a[arg]) - new Date(b[arg]));
          } else if (type === "number") {
            return toggle[arg] * (a[arg] - b[arg]);
          } else {
            if (toggle[arg] === 1) {
              return b[arg] > a[arg] ? 1 : b[arg] < a[arg] ? -1 : 0;
            } else {
              return a[arg] > b[arg] ? 1 : a[arg] < b[arg] ? -1 : 0;
            }
          }
        })
    );
  };

  return (
    <Box>
      <Typography variant="h4" color="error">
        Products
      </Typography>
      <Button variant="contained" onClick={() => setOpen(true)}>
        New Product
      </Button>

      {sortedProducts?.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 3 }} elevation={10}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">
                  <Box sx={arrowStyle}>
                    <div>Brand</div>
                    {false && <VerticalAlignBottomIcon />}
                    {true && <UpgradeIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box sx={arrowStyle}>
                    <div>Name</div>
                    {false && <VerticalAlignBottomIcon />}
                    {true && <UpgradeIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box sx={arrowStyle} onClick={() => handleSort("stock")}>
                    <div>Stock</div>
                    {toggle.stock !== 1 && <VerticalAlignBottomIcon />}
                    {toggle.stock === 1 && <UpgradeIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center">Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedProducts.map((product, index) => (
                <TableRow
                  key={product.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">{product.category}</TableCell>
                  <TableCell align="center">{product.brand}</TableCell>
                  <TableCell align="center">{product.name}</TableCell>
                  <TableCell align="center">{product.stock}</TableCell>
                  <TableCell align="center">
                    <DeleteIcon sx={btnHoverStyle} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Products;
