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
import useSortColumn from "../hooks/useSortColumn";
import { MultiSelectBox, MultiSelectBoxItem } from "@tremor/react";

const Products = () => {
  const {
    // getBrands,
    // getCategories,
    // getProducts,
    deleteProduct,
    getProCatBrands,
  } = useStockCalls();
  const { products, brands } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const filteredProducts = products
    ?.filter((item) => selectedBrand?.includes(item.brand))
    .map((item) => item.name);

  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  });
  useEffect(() => {
    // getBrands();
    // getCategories();
    // getProducts();
    getProCatBrands();
  }, []);

  const columnObj = {
    brand: 1,
    name: 1,
    stock: 1,
  };

  const { sortedData, handleSort, column } = useSortColumn(products, columnObj);

  const isBrandSelected = (item) =>
    selectedBrand.includes(item.brand) || selectedBrand.length === 0;

  const isProductSelected = (item) =>
    selectedProducts.includes(item.name) || selectedProducts.length === 0;

  return (
    <Box>
      <Typography variant="h4" color="error">
        Products
      </Typography>
      <Button variant="contained" onClick={() => setOpen(true)}>
        New Product
      </Button>
      <Box sx={flexCenter} mt={3}>
        <MultiSelectBox
          handleSelect={(value) => setSelectedBrand(value)}
          placeholder="Select Brand"
          maxWidth="max-w-xs"
        >
          {brands?.map((item) => (
            <MultiSelectBoxItem
              key={item.name}
              value={item.name}
              text={item.name}
            />
          ))}
        </MultiSelectBox>
        <MultiSelectBox
          handleSelect={(item) => setSelectedProducts(item)}
          placeholder="Select Product"
          maxWidth="max-w-xs"
        >
          {filteredProducts?.map((item) => (
            <MultiSelectBoxItem key={item} value={item} text={item} />
          ))}
        </MultiSelectBox>
      </Box>

      {sortedData?.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 3 }} elevation={10}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">
                  <Box sx={arrowStyle} onClick={() => handleSort("brand")}>
                    <div>Brand</div>
                    {column.brand !== 1 && <VerticalAlignBottomIcon />}
                    {column.brand === 1 && <UpgradeIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box sx={arrowStyle} onClick={() => handleSort("name")}>
                    <div>Name</div>
                    {column.name !== 1 && <VerticalAlignBottomIcon />}
                    {column.name === 1 && <UpgradeIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box sx={arrowStyle} onClick={() => handleSort("stock")}>
                    <div>Stock</div>
                    {column.stock !== 1 && <VerticalAlignBottomIcon />}
                    {column.stock === 1 && <UpgradeIcon />}
                  </Box>
                </TableCell>
                <TableCell align="center">Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData
                ?.filter((item) => isBrandSelected(item))
                .filter((item) => isProductSelected(item))
                .map((product, index) => (
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
                      <DeleteIcon
                        sx={btnHoverStyle}
                        onClick={() => deleteProduct(product.id)}
                      />
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
