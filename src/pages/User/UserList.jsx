import React from 'react'
import { useHistory } from "react-router-dom";
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from 'components/Common/TableContainer'
import { useMemo } from 'react';
import { useLayoutEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_USERS } from 'gqlOprations/Queries';
import { useEffect } from 'react';
import { useState } from 'react';


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

    const [getAllUsers, {loading, data, error}] = useLazyQuery(GET_ALL_USERS,{
        variables:{
            input:{
                token: mvToken
            }
        }
    })

    useLayoutEffect(() => {
        if(mvUserType !== "admin"){
            history.push("/dashboard")
        }
    }, [])

    useEffect(() => {
        if (loading) console.log("loading...")
        if (data) setUsersList(p => (data.getUserList)), console.log(data)
        if (error) console.log(error)
    }, [data])

    useEffect(() => { getAllUsers() }, [])

    const cellFunction = ({ value, column: { getProps } }) => {
        return <>
            <i
                className="mdi mdi-delete label-icon"
                style={{ fontSize: '17px', color: 'white', cursor: 'pointer' }}
                onClick={() => { console.log('clicked') }}
            />
            <i
                className="bx bx-edit label-icon"
                style={{ fontSize: '17px', color: 'white', cursor: 'pointer', marginLeft: "10px" }}
                onClick={() => { console.log('clicked') }}
            />
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
