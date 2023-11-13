import React from 'react'
import { web3 } from '@/utils'
import { stakingABI, stakingAddress } from '@/utils/Stake'
import { Col, Container, Row } from 'react-bootstrap';
import DataTable from '@/utils/DataTable';

export default function List() {

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <DataTable/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
