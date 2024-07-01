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
                        <td>{row.name}</td>
                        <td>{row.email}</td>
                        <td>{row.password}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
}

export default Table;