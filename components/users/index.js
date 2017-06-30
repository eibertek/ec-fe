import React from 'react';
// Users Component
/**
 * Behavior: if user had logged, then show User Name, LastName, log time and logout.
 * If not, show the login screen
 */
class UsersComponent extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            login: false,
            userName:'',
            password:'',
            name:'',
            lastName:'',
            logTime:0,
            errors:[],
            actualTime: new Date().getTime()
        }
        this.userScreen = this.userScreen.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.tick = this.tick.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    userInfo() {
        return <div>
            <div>{this.state.name}</div>
            <div>{this.state.lastName}</div>
            <div>{ Math.ceil((new Date().getTime() - this.state.logTime) / (1000))}</div>
        </div>;
    }
    tick() {
        this.setState({actualTime: new Date().toTimeString()});        
    }
    componentDidMount() {
        this.interval = setInterval(this.tick, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    login(ev){
        this.setState({errors:[]});
        fetch('http://localhost:3000/users/?username='+this.state.userName).then((response)=>{
             return response.json();   
        }).then((user)=>{
            if(user.length>0){
                user = user[0];
                if(user.password !== this.state.password) {
                    this.state.errors.push('invalid Password');
                }else{
                    this.setState({
                        login:true,
                        name: user.name,
                        lastName: user.lastName,
                        logTime: new Date().getTime(),
                        actualTime: new Date().getTime()
                        });                    
                }
            }else{
                this.state.errors.push('invalid Username');
            }
        });
        //this.setState({login:true});
    }

    getErrors() {
        let returnValue = [<div>Errores:</div>];
        returnValue = this.state.errors.map((el) => {
            return <div key={el} >{el}</div>
        });
        return returnValue;
    }

    loginScreen() {
        return <div> 
            <input name="userName" value={this.state.userName} onChange={this.handleChange} />
            <input type="password" name="password" value={this.state.password}  onChange={this.handleChange}/>
            <button onClick={this.login} >Log In</button>
            {this.getErrors()}
        </div>;
    }

    userScreen() {
        if(this.state.login) {
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
