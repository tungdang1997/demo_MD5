import {Link} from "react-router-dom";
import Register from "./Register";

export default function Login() {
    return (
        <div className={'row'}>

            <div className="offset-3 col-6 mt-5">
                <h1 style={{textAlign: 'center'}}>Login</h1>
                <form>
                    <div className="ml-3 form-group">
                        <label htmlFor="exampleInputUsername">User Name: </label>
                        <input type='text' className={'form-control'}/>
                    </div>
                    <div className="ml-3 form-group">
                        <label htmlFor="exampleInputPassword">Password: </label>
                        <input type='text' className={'form-control'}/>
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                    <button type="submit" className="btn btn-primary" style={{marginLeft: 10}}>
                        <Link to={'register'} style={{textDecoration:'none', color:'red'}}>Register</Link>
                    </button>
                </form>
            </div>
        </div>
    )
}