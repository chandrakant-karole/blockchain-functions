import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import DataTable from '@/utils/DataTable';

export default function List() {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <DataTable />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
