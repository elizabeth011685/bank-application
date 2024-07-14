
function Footer() {

   return (

       <footer className="d-flex flex-wrap justify-content-between align-items-center py-2 px-5 my-4 border-top">
           <div className="col-md-8 d-flex align-items-center">

                <span className="mb-3 mb-md-0 text-body-secondary" style={{
                    fontSize: "13px",
                    textAlign: "right"
                }}>
                    © 2024 - Bank Application
                </span>

               <div></div>
           </div>
           <div className="col-md-4 justify-content-end">

                <span className="mb-3 mb-md-0 text-body-secondary">
                    <span style={{
                        fontSize: "12px",
                    }}> Elizabeth Martinez Solano </span>
                    <br />
                    <span style={{fontSize: "10px"}}><strong>Certificación Desarrollo Full-Stack con MERN de MITxPRO&#174;</strong> </span>
                </span>

               <div></div>
           </div>
       </footer>
   );
}

export default Footer;