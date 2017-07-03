import React from 'react';
// Users Component
/**
 * Behavior: if user had logged, then show User Name, LastName, log time and logout.
 * If not, show the login screen
 */
class UsersComponent extends React.Component {

    constructor(props){
        super(props);

        this.userScreen = this.userScreen.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loginScreen = this.loginScreen.bind(this);
        this.state = {
            userName:'',
            password:''
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    userInfo() {
        return <div>
            <div>{this.props.userData.name}</div>
            <div>{this.props.userData.lastName}</div>
            <div>{ Math.ceil((new Date().getTime() - this.props.userData.logTime) / (1000))}</div>
        </div>;
    }

    loginScreen() {
        return <div className="users-container"> 
           <div> <input name="userName" value={this.state.userName} onChange={this.handleChange} /> </div>
           <div> <input type="password" name="password" value={this.state.password}  onChange={this.handleChange}/> </div>
           <div> <button onClick={() => { this.props.login(this.state.userName, this.state.password) }} >Log In</button> </div>
        </div>;
    }

    userScreen() {
        if(this.props.userData.login) {
            return this.userInfo();
        }else{ 
            return this.loginScreen();
        }
    }
    render() {
        return this.userScreen();
    }
}
export default UsersComponent;
