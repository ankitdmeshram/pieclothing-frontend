import Navbar from "~/component/navbar";
import Footer from "~/component/footer"
import styles from "../styles/login.css"
import { Link } from "@remix-run/react";

const register = () => {
    return (
        <>
            <Navbar />

            <div className="login-form">
                <div className="form-group">
                    <p>Email*: </p>
                    <input type="email" />
                </div>
                <div className="form-group">
                    <p>Password*: </p>
                    <input type="password" />
                </div>
                <div className="form-group">
                    <button>Login</button>
                </div>

                <p style={{ textAlign: 'center', marginTop: '20px' }}> <Link to={"../reset-password"}>Forget Password ?</Link></p>

                <hr style={{ margin: '20px 0px 15px 0px' }} />

                <p style={{ textAlign: 'center' }}>Not Registered Yet ? <br /> <br /> <Link to={"../register"}>Register Here</Link></p>

            </div>



            <Footer />
        </>
    )
}

export default register

export const links = () => [
    {
        rel: 'stylesheet',
        href: styles
    }
]