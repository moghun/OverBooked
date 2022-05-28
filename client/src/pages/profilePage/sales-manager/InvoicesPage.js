import React,{useState} from 'react'
import './invoce.css';
import Button from '@material-ui/core/Button';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import TextField from "@material-ui/core/TextField";
import { Container } from "@mui/material";
import { DataGrid ,GridActionsCellItem} from '@mui/x-data-grid';

function InvoicesPage(){

    const [starting, setStarting] = useState(null);
    const [ending, setEnding] = useState(null);

    const rows = [
        {
          id: 1,
          fullName: "Jenny Chan",
          date:"2000-06-23"
        },
        {
          id: 2,
          fullName: "Jessica warren",
          date:"1990-06-08"
        },
        {
          id: 3,
          fullName: "Raymond Edwards",
          date:"1967-02-21"
        },
        {
            id: 5,
            fullName: "Raymond Edwards",
            date:"1967-02-21"
          },
          {
            id: 6,
            fullName: "Raymond Edwards",
            date:"1967-02-21"
          },
          {
            id: 11,
            fullName: "Raymond Edwards",
            date:"1967-02-21"
          }
      ]

      const [filtered, setFiltered] = useState(rows);
      

      function clearFilter(){
        setStarting(null);
        setEnding(null);
        setFiltered(rows);
      }

      function checkDate(date) {
        return ((starting <= date) && (date <= ending));
      }
  
      function filterDate() {
        if((starting > ending) || starting === null || ending === null){
          alert("Invalid")
        }
        else{
          
          setFiltered(
            rows.filter((item) => checkDate(item.date))
          )
          console.log(filtered)
          //alert(ending + starting)
        }
      }

      /*
      function alertInfo(item){
        alert("Date: " + item.date + "\nID: " + item.id + "\nFullName: " + item.fullName);
      }
      */


      const columns = [
        { field: 'id', headerName: 'Invoice ID', width: 150, sortable:false, disableColumnMenu:true},
        { field: 'fullName', headerName: 'Receiver Name', width: 200, sortable:false ,disableColumnMenu:true},
        { field: 'date', headerName: 'Date', width: 200},
        {
            field: 'print',
            headerName: 'Print',
            sortable: false,
            disableColumnMenu:true,
            renderCell: (params) => {

            return(<> <Button style = {{outline:'none',width: '100px',fontFamily: "OpenSans"}} variant="outlined" startIcon={<PrintIcon />}>
            Print
            </Button></>);
            },
        },
        {
          field: 'save',
          headerName: 'Save',
          sortable: false,
          disableColumnMenu:true,
          renderCell: (params) => {

            return(<> <Button onClick={(params)=> {window.print()}} style = {{outline:'none',width: '100px',fontFamily: "OpenSans"}} variant="outlined" startIcon={<DownloadIcon />}>
            Save
            </Button></>);
          },
        },
      ];

    return (
        <div style={{width: '60%', marginLeft:'20%'}}>
          <form>
          <TextField
              id="startdate"
              InputProps={{ inputProps: { min: 0, max: 100 } }}
              label="Starting Date"
              margin="normal"
              style={{width:'30%', marginLeft:'5%', marginRight:'5%'}}
              onChange = {(e) => {setStarting(e.target.value)}}
            />
            <TextField
              
              id="enddate"
              InputProps={{ inputProps: { min: 0, max: 100 } }}
              onChange = {(e) => {setEnding(e.target.value)}}
              label="Ending Date"
              margin="normal"
              style={{width:'30%'}}
            />
            
            <Button onClick = {filterDate} style={{outline:'none',marginTop:'24px', marginLeft:'15px'}} color="primary" variant="contained">
              Filter
            </Button>
            <Button  type= 'reset' onClick={clearFilter} style={{outline:'none',marginTop:'24px', marginLeft:'15px'}} color="primary" variant="contained">
              Clear
            </Button>
          </form>
          <Container sx={{height: 460}}>
              <DataGrid
              rows={filtered}
              columns={columns}
              pageSize={5}
              headerHeight={75}
              rowHeight={65}
              disableSelectionOnClick
              />
          </Container>
    </div>
    );
}

export default InvoicesPage
