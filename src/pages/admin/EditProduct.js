import React, { useEffect, useState, useReducer } from "react";
import useStyles  from "../../styles/ProductUpload";
import {
  Button,
  Grid,
  Typography,
  Paper,
  Divider,
  IconButton,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Currency } from "../../utils/Currency";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { KeyboardDatePicker } from "@material-ui/pickers";
import Dayjs from "dayjs";
import { CameraAltOutlined, Close } from "@material-ui/icons";
import CircularProgress from "../../components/CircularProgress";
import { useContext } from "react";
import { UseContext } from "../../utils/UseContext";
import axios from '../../axiosConfig';
import CleanUpLoader from "../../utils/CleanUpLoader"
import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom'

const initialError = {};
const reducer = (state, action) => {
  switch (action.type) {
    case "functionsError":
      return { ...state, ...action.errorObject };
    case "requiredError":
      return { ...state, [action.fieldValue]: "Must not be empty" };
    case "onActivationError":
      return { ...state, [action.fieldValue]: action.fieldText };
    case "productNameLengthError":
      return { ...state, [action.fieldValue]: "Maximum word-length is 250" };
    case "descriptionLengthError":
      return { ...state, [action.fieldValue]: "Maximum word-length is 2500" };
    case "brandLengthError":
      return { ...state, [action.fieldValue]: "Maximum word-length is 30" };
    case "priceOnPreOrderError":
      return {
        ...state,
        [action.fieldValue]: "Please fill the price field before continuing",
      };
    case "numberError":
      return { ...state, [action.fieldValue]: "Must be a number" };
    case "generalError":
      return {
        ...state,
        [action.fieldValue]: "Error occured, kindly preview your entries",
      };
    case "removeError":
      const recentErrors = { ...state };
      action.fieldValue && delete recentErrors[action.fieldValue];
      return recentErrors;
    default:
      return state;
  }
};
const initialInput = {
  category: "televisions",
  stock: "available",
  productName: "",
  productImages: "",
  brand: "",
  price: "",
  description: "",
  discount: "",
  preOrderPrice: "",
  bulkPurchaseQuan: "",
};
const formReducer = (state, action) => {
  switch (action.type) {
    case "fetchInput":
        return { ...state, ...action.dataObject };
  case "rerender": 
  return {...state};
    case "setInput":
      return { ...state, [action.field]: action.fieldValue };
    case "setNumber":
      return { ...state, [action.field]: action.fieldValue };
      case "removeAllValues": 
      return initialInput;
    default:
      return state;
  }
};

function ProductUpload() {
  CleanUpLoader()
  const classes = useStyles()
  const consumeModalContext = useContext(UseContext);
  const consumeContext = useContext(UseContext);
  const [selectedDate, handleDateChange] = useState();
  const [secondSelectedDate, secondHandleDateChange] = useState();
  const [input, setInput] = useReducer(formReducer, initialInput);
  const [errors, dispatch] = useReducer(reducer, initialError);
  const [checked, setChecked] = useState(false);
  const [bulkChecked, setBulkChecked] = useState(false);
  const [preOrderDisabled, setOrderDisabled] = useState(true);
  const [bulkPurchaseDisabled, setBulkDisabled] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [disableImages, setDisableImages] = useState(false);
  const {category, productId} = useParams()

  const handlePreOrderChange = () => {
    dispatch({ type: "removeError", fieldValue: "general" });
    setChecked((prevState) => !prevState);
    setOrderDisabled((prevState) => !prevState);
    handleDateChange(new Date());
    secondHandleDateChange(new Date());
  };
  const handleBulkPurchaseChange = () => {
    dispatch({ type: "removeError", fieldValue: "general" });
    setBulkChecked((prevState) => !prevState);
    setBulkDisabled((prevState) => !prevState);
  };

  useEffect(() => {
      let cancel = false;
      axios.get(`/singleQuery/${category}/${productId}`)
      .then(res => {
          if (cancel) return;
          let getData = res.data;
          let newDataObject = {
              category: category,
              description: decodeURIComponent(getData.description),
              brand: decodeURIComponent(getData.brand),
              productName: decodeURIComponent(getData.productName)
          }
        setInput({type: "fetchInput", dataObject: getData})
        res.data.preOrderPrice && handlePreOrderChange()
        res.data.bulkPurchaseQuan && handleBulkPurchaseChange()
        return setInput({type: "fetchInput", dataObject: newDataObject})
      })
      .catch(err => {
          return dispatch({
            type: "functionsError",
            errorObject: err.response.data
          });
      })
      return () => { cancel = true }
  }, [category, productId])

//upload images on the fly: using onchange event
  const localStorage = window.localStorage;
  const imageHandler = (e) => {
    setDisableImages(true)
    dispatch({ type: "removeError", fieldValue: "general" });
    dispatch({ type: "removeError", fieldValue: e.target.name });
    dispatch({ type: "removeError", fieldValue: "fileType" });
    dispatch({ type: "removeError", fieldValue: "fileSize" });
    dispatch({ type: "removeError", fieldValue: "uploadError" });
    let form = new FormData();
  for(const file of e.target.files){
    let image = file;
    form.append('file', image, image.name);
  }
  axios.post("/uploadImages", form)
  .then(res => {
    setTimeout(function(){ setDisableImages(false) }, 5000)
    if (localStorage.getItem("imagesForUpload")) {
      let storedImages = JSON.parse(localStorage.getItem("imagesForUpload"));
      storedImages.push(...res.data);
      setTimeout(function(){
        setInput({ type: "setInput", field: e.target.name, fieldValue: storedImages });
        }, 5000);
      localStorage.setItem("imagesForUpload", JSON.stringify(storedImages));
    }
    else{
      let setImages = input.productImages ? input.productImages : []
          setImages.push(...res.data)
      setTimeout(function(){ 
        setInput({ 
          type: "setInput", 
          field: e.target.name, 
          fieldValue: setImages 
        });
        localStorage.setItem("imagesForUpload", JSON.stringify(setImages));
        }, 5000);
        
    }
  })
  .catch(err => {
    dispatch({
      type: "functionsError",
      errorObject: err.response.data
    });
    setDisableImages(false)
  });
  };

  const handleDisplayImage = (e) => {
    setDisableImages(true);
    const currentImages = [...input.productImages];
    const elementIndex = currentImages.indexOf(e.target.src);
    currentImages.splice(elementIndex, 1);
    currentImages.unshift(e.target.src);
    setInput({
      type: "setInput",
      field: "productImages",
      fieldValue: currentImages,
    });
    setDisableImages(false);
  };

  const handleImageRemoval = (e) => {
    dispatch({ type: "removeError", fieldValue: "general" });
    dispatch({ type: "removeError", fieldValue: "error" });
    setDisableImages(true);
      const currentImages = [...input.productImages];
    const elementIndex = currentImages.indexOf(e.currentTarget.value);
    currentImages.splice(elementIndex, 1);
    setInput({
      type: "setInput",
      field: "productImages",
      fieldValue: currentImages,
    });

    let retrievedImages = localStorage.getItem("imagesForUpload")
      ? JSON.parse(localStorage.getItem("imagesForUpload"))
      : [];
    retrievedImages.length < 2
      ? localStorage.removeItem("imagesForUpload")
      : localStorage.setItem("imagesForUpload", JSON.stringify(currentImages));
    axios.post("/deleteImage", {imageUrl: e.currentTarget.value})
    .then(() => {
      setDisableImages(false);
    })
    .catch(err => { 
      dispatch({
        type: "functionsError",
        errorObject: err.response.data
      })
      setDisableImages(false);
    }
    )
  };

  useEffect(() => {
    //let certainImage = document.getElementsByClassName("certainImage");
    if (localStorage.getItem("imagesForUpload") && !input.productImages) {
      let retrievedImages = JSON.parse(localStorage.getItem("imagesForUpload"));
      setInput({
        type: "setInput",
        field: "productImages",
        fieldValue: retrievedImages,
      });
    } 
    // else if (input.productImages && input.productImages.length > 1) {
    //   certainImage[0].style.border = "3px solid #e67700";
    //   certainImage[1].style.border = "1px solid #d3d3d3";
    // }
  }, [input.productImages, localStorage]);

  const formHandler = (e) => {
    dispatch({ type: "removeError", fieldValue: "general" });
    setInput({
      type: "setInput",
      field: e.target.name,
      fieldValue: e.target.value,
    });
    dispatch({ type: "removeError", fieldValue: e.target.name });
  };
  const preOrderPriceHandler = (e) => {
    if (isNaN(e.target.value)) {
      dispatch({ type: "numberError", fieldValue: e.target.name });
    } else if (input.price) {
      const priceDiff = input.price - e.target.value;
      const finalDiscount = (priceDiff / input.price) * 100;
      setInput({
        type: "setNumber",
        field: e.target.name,
        fieldValue: e.target.value,
      });
      dispatch({ type: "removeError", fieldValue: "general" });
      dispatch({ type: "removeError", fieldValue: e.target.name });
      setInput({
        type: "setNumber",
        field: "discount",
        fieldValue: finalDiscount,
      });
    } else {
      dispatch({ type: "priceOnPreOrderError", fieldValue: e.target.name });
    }
  };
  const numberHandler = (e) => {
    if (isNaN(e.target.value)) {
      dispatch({ type: "numberError", fieldValue: e.target.name });
    } else {
      dispatch({ type: "removeError", fieldValue: "general" });
      setInput({
        type: "setNumber",
        field: e.target.name,
        fieldValue: e.target.value,
      });
      dispatch({ type: "removeError", fieldValue: e.target.name });
    }
  };

  const submitHandler = (e) => {
    setButtonLoading(true);
    dispatch({ type: "removeError", fieldValue: "general" });
    dispatch({ type: "removeError", fieldValue: "generalError" });
    e.preventDefault();
    const inputNames = [
      "productName",
      "brand",
      "price",
      "description",
    ];
    const form = document.forms["uploadForm"];
    let checkStatus = [];
    const promises = new Promise((resolve, reject) => {
      inputNames.forEach((inputName, index, inputNames) => {
        if (!form[inputName].value) {
          checkStatus.push(index);
          dispatch({ type: "requiredError", fieldValue: inputName });
        }
        if (inputName === "productName" && form[inputName].value.length > 250) {
          checkStatus.push(index);
          dispatch({ type: "productNameLengthError", fieldValue: inputName });
        }
        if (inputName === "brand" && form[inputName].value.length > 30) {
          checkStatus.push(index);
          dispatch({ type: "brandLengthError", fieldValue: inputName });
        }
        if (
          inputName === "description" &&
          form[inputName].value.length > 2500
        ) {
          checkStatus.push(index);
          dispatch({ type: "descriptionLengthError", fieldValue: inputName });
        }
        index === inputNames.length - 1 && resolve();
      });
    });
    promises
      .then(() => {
        dispatch({ type: "removeError", fieldValue: "general" });
        if (!input.productImages) {
          checkStatus.push(100);
          dispatch({ type: "requiredError", fieldValue: "productImages" });
        } else {
          dispatch({ type: "removeError", fieldValue: "productImages" });
        }

        if (bulkChecked && !form["bulkPurchaseQuan"].value) {
          checkStatus.push(100);
          dispatch({
            type: "onActivationError",
            fieldValue: "bulkPurchaseQuan",
            fieldText:
              "Since bulk purchase is allowed, this field cannot be empty",
          });
        } else {
          dispatch({ type: "removeError", fieldValue: "bulkPurchaseQuan" });
        }
        if (checked && !form["preOrderPrice"].value) {
          checkStatus.push(100);
          dispatch({
            type: "onActivationError",
            fieldValue: "preOrderPrice",
            fieldText: "Since pre-order is allowed, this field cannot be empty",
          });
        } else {
          dispatch({ type: "removeError", fieldValue: "preOrderPrice" });
        }
        if (checked && !form["discount"].value) {
          checkStatus.push(100);
          dispatch({
            type: "onActivationError",
            fieldValue: "discount",
            fieldText: "Since pre-order is allowed, this field cannot be empty",
          });
        } else {
          dispatch({ type: "removeError", fieldValue: "discount" });
          dispatch({ type: "removeError", fieldValue: "preOrderPrice" });
        }
        if (bulkChecked && !form["discount"].value) {
          checkStatus.push(100);
          dispatch({
            type: "onActivationError",
            fieldValue: "discount",
            fieldText:
              "Since bulk purchase is allowed, this field cannot be empty",
          });
        } else {
          dispatch({ type: "removeError", fieldValue: "discount" });
          dispatch({ type: "removeError", fieldValue: "bulkPurchaseQuan" });
        }
      })
      .then(() => {
        if (
          checkStatus.length === 0
        ) {
          let preOrderDuration = selectedDate 
          && Dayjs(selectedDate).format("MM/DD/YYYY");
          let preOrderArrivalTime = secondSelectedDate 
            && Dayjs(secondSelectedDate).format("MM/DD/YYYY");
          const sendValues = {
            ...input,
            preOrderDuration,
            preOrderArrivalTime,
          };
          //send post request
          axios.post(`/manageProduct/${productId}`, sendValues)
          .then(res => {
            let modalContent = {
              open: true,
              message: res.data.generalMessage,
              successLink: `admin/products`,
              successLinkText: 'Back to products',
              cancelText: 'Continue upload'
            };
            localStorage.removeItem("imagesForUpload")
            setInput({
              type: "removeAllValues",
            });
            setButtonLoading(false);
            return consumeModalContext.setModal({ type: "open", modalContent: modalContent })
            })
            .catch(err => { 
              setButtonLoading(false);
              return dispatch({
                type: "functionsError",
                errorObject: err.response.data
              });
            })
        } else {
          dispatch({ type: "generalError", fieldValue: "general" });
          setButtonLoading(false);
        }
      });
  };
  const categories = [
    {
      value: "televisions",
      label: "Televisions",
    },
    {
      value: "musical_system",
      label: "Musical system",
    },
    {
      value: "refrigerators",
      label: "Refrigerators",
    },
    {
      value: "home_theatre",
      label: "Home theatre",
    },
    {
      value: "public_address_system",
      label: "Public address system",
    },
    {
      value: "solar_system",
      label: "Solar System",
    },
    {
      value: "commercial_oven",
      label: "Commercial oven",
    },
    {
      value: "commercial_cookers",
      label: "Commercial cookers",
    },
    {
      value: "microwave_oven",
      label: "Microwave oven",
    },
    {
      value: "blenders",
      label: "Blenders",
    },
    {
      value: "deep_fryers",
      label: "Deep Fryers",
    },
    {
      value: "mixers",
      label: "Mixers",
    },
    {
      value: "work_tables",
      label: "Work Tables",
    },
    {
      value: "kitchen_rack",
      label: "Kitchen rack",
    },
  ];
  return (
    <div className="container pageComponents">
      {consumeContext.authState.state ? (
        <React.Fragment>
          {!consumeContext.authState.disabled ? (
            <React.Fragment>
              {consumeContext.authState.role === "administrator" ||
              consumeContext.authState.role === "staff" ? (
      <div className={classes.mainContainer}>
        <Paper className={classes.paperWrapper}>
          <Typography variant="h6" className={classes.heading}>
            UPLOAD PRODUCT
          </Typography>
          <form
            autoComplete="off"
            method="POST"
            name="uploadForm"
            noValidate
            encType="multipart/form-data"
          >
            <div className={classes.formInnerWrapper}>
            <Grid container>
              <Grid item xs={12}>
              <TextField
                select
                label="Select category"
                name="category"
                value={input.category}
                onChange={formHandler}
                margin="normal"
                variant="outlined"
                size="small"
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              </Grid>
              </Grid>
              <Button
                className={classes.uploadButton}
                variant="outlined"
                component="label"
                endIcon={<CameraAltOutlined />}
              >
                <Typography variant="subtitle1">Upload Images</Typography>
                <input
                  name="productImages"
                  onChange={imageHandler}
                  type="file"
                  multiple
                  accept="image/*"
                  hidden
                />
              </Button>
              <Grid item xs={12}>
                <Typography variant="caption" color="primary">
                  {(input.productImages && input.productImages.length !== 0) &&
                    ` The first image will be used as display image, click on any other one to change it.`}
                </Typography>
              </Grid>
              <Button
                component="div"
                className={classes.containerButton}
                disabled={disableImages}
              >
                <Grid
                  container
                  spacing={1}
                  wrap="nowrap"
                  className={`${classes.mainImageContainer} customScrollBar`}
                >
                  {input.productImages &&
                    input.productImages.map((image) => (
                      <Grid key={image} item>
                        <div className={classes.imageContainer}>
                          <img
                            onClick={handleDisplayImage}
                            alt="Product images"
                            className={`${classes.eachImage} certainImage`}
                            src={image}
                          />
                          <IconButton
                            value={image}
                            color="inherit"
                            className={classes.closeIconButton}
                            size="small"
                            onClick={handleImageRemoval}
                          >
                            <Close className={classes.closeIcon} />
                          </IconButton>
                        </div>
                      </Grid>
                    ))}
                </Grid>
                {disableImages && <CircularProgress />}
              </Button>
              <Grid item xs={12}>
                <Typography color="error" variant="caption">
                  {errors.productImages && errors.productImages}
                  {errors.error && errors.error}
                  {errors.fileType && errors.fileType}
                  {errors.fileSize && errors.fileSize}
                  {errors.uploadError && errors.uploadError}
                </Typography>
              </Grid>
              
              <TextField
                error={errors.productName && true}
                helperText={errors.productName && errors.productName}
                label="Product name"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
                name="productName"
                value={input.productName}
                onChange={formHandler}
                className={classes.selectField}
              />
              <TextField
                error={errors.brand && true}
                helperText={errors.brand && errors.brand}
                label="Brand"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
                name="brand"
                value={input.brand}
                onChange={formHandler}
              />
              <TextField
                error={errors.price && true}
                helperText={errors.price && errors.price}
                label="Price"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
                name="price"
                value={input.price}
                onChange={numberHandler}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {Currency.naira}
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <Divider className={classes.divider} />
            <div className={classes.formGroup}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    color="primary"
                    onChange={handlePreOrderChange}
                  />
                }
                label="Upload as a Pre-order product"
              />
            </div>
            <div className={classes.formGroup}>
              <TextField
                error={errors.preOrderPrice && true}
                helperText={errors.preOrderPrice ? errors.preOrderPrice :
                  `When pre-order item will be available`
                }
                label="Pre-order price"
                variant="outlined"
                size="small"
                disabled={preOrderDisabled}
                margin="normal"
                name="preOrderPrice"
                value={input.preOrderPrice}
                onChange={preOrderPriceHandler}
              />
            </div>
            <div className={classes.formGroup}>
              <KeyboardDatePicker
                autoOk
                onError={errors.preOrderDuration && true}
                helperText={errors.preOrderDuration ? errors.preOrderDuration :
                   `When pre-order will end`}
                label="Pre-order duration"
                inputVariant="outlined"
                id="preOrderDuration"
                value={selectedDate}
                onChange={handleDateChange}
                format="MM/DD/YYYY"
                disabled={preOrderDisabled}
                size="small"
                disablePast
                className={classes.datePickerField}
              />
            </div>
            <div className={classes.formGroup}>
              <KeyboardDatePicker
                autoOk
                onError={errors.preOrderArrivalTime && true}
                helperText={
                  errors.preOrderArrivalTime && errors.preOrderArrivalTime
                }
                label="Pre-order arrival time"
                inputVariant="outlined"
                id="preOrderArrivalTime"
                value={secondSelectedDate}
                onChange={secondHandleDateChange}
                format="MM/DD/YYYY"
                disabled={preOrderDisabled}
                size="small"
                disablePast
                className={classes.datePickerField}
              />
            </div>
            <Divider className={classes.divider} />
            <div className={classes.formGroup}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={bulkChecked}
                    color="primary"
                    onChange={handleBulkPurchaseChange}
                  />
                }
                label="Give discount only on Bulk purchase"
              />
            </div>
            <div className={classes.formGroup}>
              <TextField
                error={errors.bulkPurchaseQuan && true}
                helperText={errors.bulkPurchaseQuan && errors.bulkPurchaseQuan}
                label="Bulk purchase quantity"
                variant="outlined"
                size="small"
                disabled={bulkPurchaseDisabled}
                // fullWidth
                margin="normal"
                name="bulkPurchaseQuan"
                value={input.bulkPurchaseQuan}
                onChange={numberHandler}
              />
            </div>
            <Divider className={classes.divider} />
            <div>
              <TextField
                error={errors.discount && true}
                helperText={errors.discount && errors.discount}
                label="Discount"
                variant="outlined"
                fullWidth
                margin="normal"
                name="discount"
                size="small"
                value={input.discount}
                onChange={numberHandler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />

              <TextField
                error={errors.description && true}
                helperText={errors.description && errors.description}
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                name="description"
                value={input.description}
                onChange={formHandler}
              />
              <TextField
                className={classes.selectField}
                select
                label="Select stock"
                name="stock"
                margin="normal"
                value={input.stock}
                onChange={formHandler}
                variant="outlined"
                size="small"
              >
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="sold_out">Sold Out</MenuItem>
              </TextField>
            </div>
            <div className={classes.submitButton}>
              <Typography variant="caption" color="error">
                {errors.general && errors.general}
                {errors.generalError && errors.generalError}
              </Typography>
              <Button
                onClick={submitHandler}
                variant="contained"
                size="large"
                color="primary"
                fullWidth
                disabled={buttonLoading}
                type="submit"
              >
                {buttonLoading && (
                  <CircularProgress />
                )}
                <Typography variant="subtitle1" className={classes.submitText}>
                  Submit
                </Typography>
              </Button>
            </div>
          </form>
        </Paper>
      </div>
      ) : (
        <Typography style={{ padding: 40 }} />
      )}
      </React.Fragment>
      ) : (
      <Typography style={{ padding: 40 }} variant="body2" color="error">
      {!consumeContext.authState.initializing &&
        "Your account has been disabled, contact support team"}
      </Typography>
      )}
      </React.Fragment>
      ) : (
      <Typography style={{ padding: 40 }} variant="body2" color="error">
      {!consumeContext.authState.initializing && "session timed out "}
      {!consumeContext.authState.initializing && (
      <Link to="/resume">login again</Link>
      )}
      </Typography>
      )}
      {consumeContext.authState.initializing &&
        <Typography style={{padding: 40}} variant="body1" color="textSecondary">
          ...checking credentials
        </Typography>
      }
    </div>
  );
}

export default ProductUpload;
