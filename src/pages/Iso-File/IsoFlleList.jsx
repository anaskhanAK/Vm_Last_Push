import React, { useState, useMemo } from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import { GET_IOS_BY_ID } from 'gqlOprations/Queries';
import { useQuery, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
// import { Type } from 'pages/Crypto/CryptoWallet/CryptoWalCol';
// import { map } from 'lodash';

const IsoFileList = () => {

    const [isoData, setIsoData] = useState([])

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

    const mvToken = getCookies("MvUserToken");
    const mvid = getCookies("MvUserID");
    // console.log(mvToken)

    const [getIos, { loading, data, error }] = useLazyQuery(GET_IOS_BY_ID, {
        variables: {
            input: {
                token: mvToken
            }
        }
    });

    const cellFunction = ({ value, column: { getProps } }) => {
        return <i
            className="mdi mdi-cloud-download label-icon"
            style={{ fontSize: '17px', color: 'white', cursor: 'pointer' }}
            onClick={() => { console.log('clicked') }}
        />
    }

    const columns = useMemo(
        () => [
            {
                Header: 'File Name',
                accessor: 'Name',
            },
            {
                Header: 'File Type',
                // id: 'Type',
                accessor: 'Type',
            },
            {
                Header: 'File Size',
                accessor: 'Size',
            },
            {
                Header: 'Download',
                accessor: 'age',
                Cell: cellFunction,
                getProps: () => ({ name: 'table' })
            },
        ],
        []
    );


    const datab = [

        {
            "filename": "",
            "filetype": "selection-gsykp",
            "age": 22,
            "visits": 20,
            "progress": 39,
            "status": "single"
        },
        //     // {
        //     //     "filename": "heart-nff6w",
        //     //     "filetype": "information-nyp92",
        //     //     "age": 16,
        //     //     "visits": 98,
        //     //     "progress": 40,
        //     //     "status": "complicated"
        //     // },
        //     // {
        //     //     "filename": "minute-yri12",
        //     //     "filetype": "fairies-iutct",
        //     //     "age": 7,
        //     //     "visits": 77,
        //     //     "progress": 39,
        //     //     "status": "single"
        //     // },
        //     // {
        //     //     "filename": "degree-jx4h0",
        //     //     "filetype": "man-u2y40",
        //     //     "age": 27,
        //     //     "visits": 54,
        //     //     "progress": 92,
        //     //     "status": "relationship"
        //     // },
        //     // {
        //     //     "filename": "horn-od926",
        //     //     "filetype": "selection-gsykp",
        //     //     "age": 22,
        //     //     "visits": 20,
        //     //     "progress": 39,
        //     //     "status": "single"
        //     // },
        //     // {
        //     //     "filename": "heart-nff6w",
        //     //     "filetype": "information-nyp92",
        //     //     "age": 16,
        //     //     "visits": 98,
        //     //     "progress": 40,
        //     //     "status": "complicated"
        //     // },
        //     // {
        //     //     "filename": "minute-yri12",
        //     //     "filetype": "fairies-iutct",
        //     //     "age": 7,
        //     //     "visits": 77,
        //     //     "progress": 39,
        //     //     "status": "single"
        //     // },
        //     // {
        //     //     "filename": "degree-jx4h0",
        //     //     "filetype": "man-u2y40",
        //     //     "age": 27,
        //     //     "visits": 54,
        //     //     "progress": 92,
        //     //     "status": "relationship"
        //     // },
        //     // {
        //     //     "filename": "horn-od926",
        //     //     "filetype": "selection-gsykp",
        //     //     "age": 22,
        //     //     "visits": 20,
        //     //     "progress": 39,
        //     //     "status": "single"
        //     // },
        //     // {
        //     //     "filename": "heart-nff6w",
        //     //     "filetype": "information-nyp92",
        //     //     "age": 16,
        //     //     "visits": 98,
        //     //     "progress": 40,
        //     //     "status": "complicated"
        //     // },
        //     // {
        //     //     "filename": "minute-yri12",
        //     //     "filetype": "fairies-iutct",
        //     //     "age": 7,
        //     //     "visits": 77,
        //     //     "progress": 39,
        //     //     "status": "single"
        //     // },
        //     // {
        //     //     "filename": "degree-jx4h0",
        //     //     "filetype": "man-u2y40",
        //     //     "age": 27,
        //     //     "visits": 54,
        //     //     "progress": 92,
        //     //     "status": "relationship"
        //     // }
    ];



    document.title = "Iso File List";

    useEffect(() => {
        if (loading) console.log("loading...")
        if (data) setIsoData(p => (data.getIOSById))
        if (error) console.log(error)
    }, [data])

    useEffect(() => { getIos() }, [])

    return (
        <div className="page-content">
            <div className="container-fluid">

                <Breadcrumbs title="ISO File" breadcrumbItem="File List" />

                <TableContainer
                    columns={columns}
                    data={isoData}
                    isGlobalFilter={true}
                    // isAddOptions={true}
                    customPageSize={10}
                    className="custom-header-css"
                />
            </div>
        </div>
    )
}

export default IsoFileList

/* REACT TABLE CELL PRAMS SEND-BOX */
/* https://codesandbox.io/s/r5n96yvwnm?file=/index.js:917-930 */