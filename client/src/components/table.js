function Table({columns, data}) {
    return (
        <table className="table">
            <thead>
            <tr>
                <th scope="row">#</th>
                {
                    columns.map((column, index) => (
                            <th scope="row" key={index}>{column}</th>
                        )
                    )
                }
            </tr>
            </thead>
            <tbody>
            {
                data.map((row, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td style={{textAlign: "left"}}>{row.username}</td>
                        <td style={{textAlign: "left"}}>{row.email}</td>
                        <td style={{textAlign: "left"}}>{row.password}</td>
                        <td style={{textAlign: "left"}}>{row.account_number}</td>
                        <td style={{textAlign: "right"}}>${row.balance.toFixed(2)}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
}

export default Table;