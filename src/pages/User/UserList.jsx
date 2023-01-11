import React from 'react'
import { useHistory } from "react-router-dom";
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from 'components/Common/TableContainer'
import { useMemo } from 'react';
import { useLayoutEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_ALL_USERS } from 'gqlOprations/Queries';
import { useEffect } from 'react';
import { useState } from 'react';
import { DELETE_USER } from 'gqlOprations/Mutations';
import { Link } from 'react-router-dom';

const UserList = () => {

    const history = useHistory();
    const [usersList, setUsersList] = useState([])

    const getCookies = (cname) => {
        const cArray = document.cookie.split("; ")
        let result = null
        cArray.forEach(element => {
            if (element.indexOf(cname) == 0) {
                result = element.substring(cname.length + 1)
            }
        })
        return result;
    }

    const mvUserType = getCookies("MvUserType");
    const mvToken = getCookies("MvUserToken");

    const [getAllUsers, { loading, data, error }] = useLazyQuery(GET_ALL_USERS, {
        variables: {
            input: {
                token: mvToken
            }
        },
        onCompleted: data => {
            // console.log(data);
            setUsersList(data.getUserList);
        },
        fetchPolicy: "cache-and-network"
    })

    const [deleteUser, { loading: loadingA, data: dataA, error: errorA }] = useMutation(DELETE_USER);

    useLayoutEffect(() => {
        if (mvUserType !== "admin") {
            history.push("/dashboard")
        }
    }, [])


    useEffect(() => { getAllUsers() }, [])

    const cellFunction = (row) => {
        const { value, column: { getProps } } = row;

        return <>
            <i
                className="mdi mdi-delete label-icon"
                style={{ fontSize: '17px', color: 'white', cursor: 'pointer' }}
                onClick={() => {
                    console.log('clicked', row.cell.row.original.id);
                    deleteUser({
                        variables: {
                            input: {
                                id: row.cell.row.original.id,
                                token: mvToken,
                            }
                        },
                        onCompleted: getAllUsers()
                    })
                }}
            />

            <Link to={`/updateprofile/${row.cell.row.original.id}`}>
                <i
                    className="bx bx-edit label-icon"
                    style={{ fontSize: '17px', color: 'white', cursor: 'pointer', marginLeft: "10px" }}
                    onClick={() => { console.log('clicked') }}
                />
            </Link>
        </>
    }

    const columns = useMemo(
        () => [
            {
                Header: 'User Name',
                accessor: "First_Name",
            },
            {
                Header: 'Email',
                // id: 'filetype',
                // accessor: d => d.filetype,
                accessor: 'Email'
            },
            {
                Header: 'Actions',
                accessor: 'Actions',
                Cell: cellFunction,
                // getProps: () => ({ name: 'table' })
            },
        ],
        []
    );


    document.title = "Iso File List";

    return (
        <div className="page-content">
            <div className="container-fluid">

                <Breadcrumbs title="ISO File" breadcrumbItem="File List" />

                <div className='mb-2 overflow-auto' >
                    <button
                        className="btn btn-primary w-md float-end"
                        onClick={() => history.push('/create-user')}
                    >
                        Create User
                    </button>
                </div>

                <TableContainer
                    columns={columns}
                    data={usersList}
                    isGlobalFilter={true}
                    // isAddOptions={true}
                    customPageSize={10}
                    className="custom-header-css"
                />
            </div>
        </div>
    )
}

export default UserList
