import React ,{ Component } from "react";
import {connect} from 'react-redux';
import {googleLogin} from '../actions/userActions';
import {Link} from 'react-router-dom'
import Footer from "./Footer";

class Login extends Component {
    componentWillMount(){
        if (this.props.user !== null){
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.user !== null){
            nextProps.history.push('/');
        }
    }

    render(){
        return(
            <div className='container-fluid'>
                <div className='row align-items-center justify-content-center'>
                    <div className='justify-content-sm-center jumbotron mt-3'>
                        <h1>Login Sample | {new Date().getUTCFullYear()}</h1>
                        <h5><i>Powered by: Safem0de</i></h5>
                        <hr/>
                        <form>
                            <div className="form-group">
                                <label>e-mail :</label>
                                <input type="email" className="form-control" required/>
                            </div>
                            <div className="form-group">
                                <label>Password :</label>
                                <input type='password' className="form-control" required/>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
                    <div className='row align-items-center justify-content-center'>
                        <button
                            className = 'btn-sm btn-danger'
                            onClick = {this.props.googleLogin}
                            >
                            Sign In with Google
                        </button>
                    </div>
                <Footer>
                    <div className='col-sm-auto'>
                        <Link to='/chart'>Go to Chart</Link>
                    </div>

                    <div className='col-sm-auto'>
                        <Link to='/table'>Go to Sample Situation</Link>
                    </div>

                    <div className='col-sm-auto'>
                        <Link to='/calendar'>Go to Calendar</Link>
                    </div>
                </Footer>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps,{googleLogin})(Login);