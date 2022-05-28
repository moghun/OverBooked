import React,{useState} from 'react'
import './invoce.css';
import Button from '@material-ui/core/Button';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import TextField from "@material-ui/core/TextField";
import { Container } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

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

            return(<> <Button onClick={()=> {alert("Print")}} style = {{width: '100px',fontFamily: "OpenSans"}} variant="outlined" startIcon={<PrintIcon />}>
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

            return(<> <Button onClick={()=> {alert("Save")}} style = {{width: '100px',fontFamily: "OpenSans"}} variant="outlined" startIcon={<DownloadIcon />}>
            Save
            </Button></>);
          },
        },
      ];


    return (
        <div style={{width: '60%', marginLeft:'20%'}}>

          <TextField
              
              id="startdate"
              InputProps={{ inputProps: { min: 0, max: 100 } }}
              label="Starting Date"
              margin="normal"
              style={{width:'40%', marginLeft:'10%', marginRight:'5%'}}
              onChange = {(e) => {setStarting(e.target.value)}}
            />
            <TextField
              
              id="enddate"
              InputProps={{ inputProps: { min: 0, max: 100 } }}
              onChange = {(e) => {setEnding(e.target.value)}}
              label="Ending Date"
              margin="normal"
              style={{width:'40%'}}
            />
          <Container sx={{height: 460}}>
              <DataGrid
              rows={rows}
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


/*

            <input type='date'></input>
            <input type='date'></input>
            <input type='submit' value="Sort"></input>
            <table>
                <thead>
                    <tr>
                    <th style={{fontFamily: "OpenSans"}}>Receiver</th>
                    <th style={{fontFamily: "OpenSans"}}>Invoice ID</th>
                    <th style={{fontFamily: "OpenSans"}}>Date</th>
                    <th style={{fontFamily: "OpenSans"}}>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {mock.map((data) => {
                        return(                        
                        <tr>
                            <td style={{fontFamily: "OpenSans"}}>{data.fullName}</td>
                            <td style={{fontFamily: "OpenSans"}}>{data.id}</td>
                            <td style={{fontFamily: "OpenSans"}}>{data.date}</td>
                            <td>
                                <div>
                                    <Button style = {{width: '100px',fontFamily: "OpenSans"}} variant="outlined" startIcon={<PrintIcon />}>
                                    Print
                                    </Button>
                                </div>
                                <div>
                                    <Button style = {{width: '100px',fontFamily: "OpenSans"}} variant="outlined" startIcon={<DownloadIcon />}>
                                    Save
                                    </Button>
                                </div>
                            </td>
                            
                        </tr>);

                    })}

                </tbody>
            </table>
*/