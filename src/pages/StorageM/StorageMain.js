import React from 'react'
import { Col, Container, Row, } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb";
import PoolCard from './PoolCard';
import DiskCard from './DiskCard';



const StorageMain = () => {
    document.title = "Dashboard";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Dashboard" breadcrumbItem="Storage" />
                    <PoolCard />
                </Container>
            </div>
        </React.Fragment>
    )
}

export default StorageMain