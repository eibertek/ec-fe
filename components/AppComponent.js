import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import ExpensesComponent from './expenses';
import UserComponent from './users';
import "../styles.scss";
class AppComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userData: {
                login: false,
                userName:'',
                password:'',
                name:'',
                lastName:'',
                logTime:0,
                actualTime: new Date().getTime()                
            },
            errors:[]            
        }
        this.tick = this.tick.bind(this);
        this.login = this.login.bind(this);
        this.getErrors = this.getErrors.bind(this);
    }

    componentWillMount(){
        let user = sessionStorage.getItem('login');
        if(user) {
            user = JSON.parse(user);
            this.setState({userData:{
                login:true,
                name: user.name,
                lastName: user.lastName,
                logTime: user.logTime,
                actualTime: new Date().getTime()
            }});        
        }
    }

    login(userName, password){
        let errors = [];
        fetch('http://localhost:3000/users/?username='+userName).then((response)=>{
             return response.json();   
        }).then((user)=>{
            if(user.length>0){
                user = user[0];
                if(user.password !== password) {
                    errors.push('invalid Password');
                }else{
                    this.setState({ userData:{
                        login:true,
                        name: user.name,
                        lastName: user.lastName,
                        logTime: new Date().getTime(),
                        actualTime: new Date().getTime()
                    }});
                    sessionStorage.setItem('login', JSON.stringify({'user':user.id, 
                                                    name: user.name,
                                                    lastName: user.lastName,
                                                    logTime: new Date().getTime()})
                                        );                    
                }
            }else{
                errors.push('invalid Username');
            }
            this.setState({errors});            
        });
        this.setState({errors});        
    }

    tick() {
        let userData = this.state.userData;
        userData.actualTime = new Date().toTimeString()
        this.setState({userData});        
    }

    componentDidMount() {
        if(this.state.userData.login) {
           this.interval = setInterval(this.tick, 1000);
        }
    }
    componentWillUnmount() {
        if(this.state.userData.login) {
            clearInterval(this.interval);
        }
    }

    getErrors() {
        let returnValue= this.state.errors.map((el) => {
            return <div key={el} >{el}</div>
        });
        return returnValue.length > 0 ? <div className="error-message">Errores:{returnValue}</div>: '';
    }
    render(){
        return <div>
            <UserComponent login={this.login} userData={this.state.userData} />
            {this.getErrors()}
            <ExpensesComponent userData={this.state.userData}></ExpensesComponent>
        </div>;
    }
}

AppComponent.propTypes = {}

export default AppComponent;