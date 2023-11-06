import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axiosres from "../Axios/axios";
import { Button } from "@mui/material";
import "../CSS/generate.css";
import AlertSnackBar from "../Components/AlertSnackBar";

const Generate = () => {
  const [queryType, setqueryType] = React.useState("");
  const [columns, setColumns] = React.useState(2);
  const [cols, setCols] = React.useState(["cols1+vals1"]);
  const [submit, showSubmit] = React.useState(false);
  const [tname, setTname] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setqueryType(event.target.value);
  };

  let handleColumns = () => {
    // let columnlists = document.getElementById("collist");
    // for (let i = 1; i <= columns; i++) {
    //   let label1 = document.createElement("label");
    //   label1.innerText = "Column Name";
    //   let col = document.createElement("input");
    //   let label2 = document.createElement("label");
    //   label2.innerText = "value";
    //   let val = document.createElement("input");
    //   col.setAttribute("name", `col${i}`);
    //   val.setAttribute("name", `val${i}`);
    //   columnlists.append(label1, col, label2, val);
    //   let brk = document.createElement("br");
    //   columnlists.append(brk);
    //
    // }

    console.log("dom", columns);
    let temp = [];
    for (let i = columns; i <= columns; i++) {
      temp.push(`cols${i}+vals${i}`);
    }
    setCols([...cols, ...temp]);
    setColumns(columns + 1);
  };

  console.log(cols);

  // document.getElementById("butt")?.addEventListener("click", handleColumns());

  let handleSubmit = async (e) => {
    let allow = true;
    console.log("submit");
    e.preventDefault();

    let obj = {};

    Array.from(e.target.elements).forEach((ele) => {
      if (ele.nodeName === "INPUT") {
        obj[ele.name] = ele.value;
      }
    });
    obj.type = queryType;
    obj.colno = cols.length;
    console.log(cols.length);
    for (let i = 1; i <= cols.length; i++) {
      console.log("for");
      console.log("for", obj[`cols${i}`].split(",").length);
      if (
        obj[`cols${i}`].split(",").length !== obj[`vals${i}`].split(",").length
      ) {
        // alert("columns and values mismatch");
        setMessage("Columns and Values doesn't match");
        handleClick();

        allow = false;
        break;
      }
    }
    console.log(obj);
    console.log(allow);

    if (allow) {
      setTname(obj.tname);
      let { data } = await axiosres.post("/query", obj);
      if (data === "Inserted Successfully") showSubmit(true);
    }
  };

  const handleDownload = async () => {
    try {
      const res = await axiosres.get("/upload", {
        responseType: "blob",
      });
      const blob = new Blob([res.data], { type: res.data.type });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${tname}.txt`;
      link.click();
      console.log(res.data.type);
      handleClick();
      setMessage("Downloaded Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <div className="column-button">
        {" "}
        <Button variant="contained" onClick={() => handleColumns()}>
          Add Columns
        </Button>
      </div>
      <div>
        {" "}
        <AlertSnackBar
          open={open}
          handleClose={handleClose}
          message={message}
        />
      </div>
      <form className="mainform" id="mainform" onSubmit={handleSubmit}>
        <div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              QueryType
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={queryType}
              onChange={handleChange}
              label="queryType"
              name="querytype"
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"insert"}>Insert</MenuItem>
              <MenuItem value={"select"}>Select</MenuItem>
              <MenuItem value={"delete"}>Delete</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="input-div">
          <label htmlFor="tablename">Table Name : </label>&nbsp;&nbsp;
          <input
            id="tablename"
            type="text"
            name="tname"
            placeholder="Enter table name"
            className="input"
            required
          />
          <br />
          {/* <input
          type="number"
          name="colno"
          placeholder="Enter no of Columns"
          onChange={(e) => setColumns(e.target.value)}
        /> */}
        </div>
        <div id="collist">
          {cols.map((va, i) => (
            <div className="collist-div">
              <label htmlFor="">Columns :</label>{" "}
              <input required key={i} name={va.slice(0, va.indexOf("+"))} />
              &nbsp;&nbsp;
              <label htmlFor="">Values :</label>{" "}
              <input
                required
                key={i + 2}
                name={va.slice(va.indexOf("+") + 1)}
              />
              <br />
            </div>
          ))}
        </div>
        <br />
        <div className="button-div">
          <Button variant="contained" type="submit">
            Submit
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {submit && (
            <Button variant="contained" onClick={handleDownload}>
              Download
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Generate;
