import Table from 'react-bootstrap/Table';

export default function DataTable() {
    return (
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Stake Amount</th>
                    <th>Stake Month</th>
                    <th>Rewards</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
            </tbody>
        </Table>
    );
}