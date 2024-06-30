
function Card({title, body, footer, formik, cardStyle}) {
    return (
        <div className="d-flex justify-content-center mt-5">
            <form onSubmit={formik.handleSubmit}>
                <div className="card" style={cardStyle}>
                    <div className="card-header">
                        <h3>{title}</h3>
                    </div>
                    <div className="card-body">
                        {body}
                    </div>
                    <div className="card-footer">
                        {footer}
                    </div>
                </div>
            </form>
        </div>
    );

}

export default Card;