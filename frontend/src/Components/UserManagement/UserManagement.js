import React, { useEffect, useState } from 'react'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { makeRequest } from '../../axios';
import Button from '@mui/material/Button';

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'bname', label: 'Business Name', minWidth: 100 },
    {
        id: 'email',
        label: 'Email',
        minWidth: 170,
    },
    {
        id: 'status',
        label: 'User Status',
        minWidth: 170,
        // align: 'right',
    },
];

const rows = [

];



function UserManagement() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [allusers, setallusers] = useState([]);
    const [blockuser, setblockuser] = useState(false);
    const [unblockuser, setunblockuser] = useState(false);
    

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleblock = (userid) => {

        makeRequest.post('/admin/user-block', { userid }).then((response) => {

            console.log(response, "Block RESSSSSSS");
            if (response.status) {
                console.log(response?.data.value, "Dataaaaa");
                setblockuser(true)

            }
            else {
                alert("Something went wrong")
            }
        }, { withCredentials: true }).catch((err) => {
            console.log(err);
            alert(err.response.data)
            console.log("-----errrrr---", err.response.data);

        })

    }


    const handleunblock = (userid) => {

        makeRequest.post('/admin/user-unblock', { userid }).then((response) => {

            if (response.status) {
                console.log(response?.data.value, "unblockDataaaaa");
                setunblockuser(true)

            }
            else {
                alert("Something went wrong")
            }
        }, { withCredentials: true }).catch((err) => {
            console.log(err);
            alert(err.response.data)
            console.log("-----errrrr---", err.response.data);

        })

    }


    useEffect(() => {



        makeRequest.get('/users/getallusers').then((response) => {

            console.log(response, "Get user names");
            if (response.status) {
                console.log(response?.data, "Get user dataaaaaaa");
                setallusers(response?.data)

                console.log("Hoiiiiiiiiiiii");

            }
            else {
                alert("Something went wrong")
            }
        }).catch((err) => {
            console.log(err);
            alert(err.response.data)
            console.log("-----errrrr---", err.response.data);

        })


    }, [blockuser,unblockuser])



    return (
        <div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allusers && allusers.map((users, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>

                                        <TableCell  >
                                            {users.username}
                                        </TableCell>

                                        <TableCell  >
                                            {users.businessName}
                                        </TableCell>

                                        <TableCell  >
                                            {users.email}
                                        </TableCell>



                                        {users?.block ?
                                        
                                            <TableCell>
                                                <Button variant="contained" color="success" onClick={() => {
                                                    handleunblock(users._id)
                                                }}>Unblock</Button>
                                            </TableCell>
                                            :
                                            <TableCell>
                                                <Button variant="contained" color="error" onClick={() => {
                                                    handleblock(users._id)
                                                }}>Block</Button>
                                            </TableCell>
                                        }

                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </div>
    )
}

export default UserManagement