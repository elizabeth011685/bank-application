
function Table({columns, data}) {

    return (
        <table class="table">
            <thead>
            <tr>
                <th scope="row">#</th>
                {
                    columns.map((column, index) => (
                            <th scope="row">{column}</th>
                        )
                    )
                }

            </tr>
            </thead>
            <tbody>
            {
                data.map((row, index) => (
                    <tr>
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