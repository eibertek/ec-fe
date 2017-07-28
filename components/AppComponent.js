import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import ExpensesComponent from './expenses';
import Categories from './categories';
import UserComponent from './users';
import ModalComponent from './ModalComponent';
import * as expensesActions from '../actions/expenses';
import {getCategories} from '../actions/categories';
import { connect } from 'react-redux';

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
            errors:[],
            modal: {
                render:false,
                component:<div></div>
            }            
        }
        this.tick = this.tick.bind(this);
        this.login = this.login.bind(this);
        this.getErrors = this.getErrors.bind(this);
        this.onClose = this.onClose.bind(this);
        this.renderExpenses = this.renderExpenses.bind(this);
        this.props.loadExpenses();
        this.props.loadCategories();
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

    showModal(e, component, props) {
        const composeComponent = React.createElement(component, props);
        this.setState({modal:{ render:true, component:composeComponent}});
    }

    onClose() {
        this.setState({modal:{ render:false, component:null}});
        this.props.loadExpenses();
        this.forceUpdate();
    }

    renderExpenses() {
        if(this.props.expenses) {
            let expenses = this.props.expenses.map( (expense) =>{
                return <div key={expense.id}>{expense.name} - {expense.value}</div>
            });
            return <div>{expenses}</div>;
        }
        return <div>EXPENSES LOADING</div>;
    }  

    loggedIn(){
        return <div>
            <div> 
                <button onClick={(e) => this.showModal(e, ExpensesComponent, 
                                        {action:'NEW', 
                                         dismiss:this.onClose, 
                                         categories:this.props.categories, 
                                         expenses: this.props.expenses,
                                         loadExpenses: this.props.loadExpenses,
                                         loadCategories: this.props.loadCategories
                                         })
                                } >NEW Expenses</button>
                <button onClick={(e) => this.showModal(e, Categories, 
                                        {action:'NEW', 
                                        dismiss:this.onClose,
                                        categories:this.props.categories,
                                        loadCategories: this.props.loadCategories
                                        })
                                } >New Category</button>
            </div>
            <ModalComponent render={this.state.modal.render} onClose={this.onClose}>{this.state.modal.component}</ModalComponent>
            <div>EXPENSES</div>
            <div>{this.renderExpenses()}</div>
        </div>;
    }
    render(){
        if(this.state.userData.login){
            return this.loggedIn();
        }else{
            return <div>
                <UserComponent login={this.login} userData={this.state.userData} />
                {this.getErrors()}
            </div>;
        }
    }
}

AppComponent.propTypes = {}

const mapStateToProps = state=>{
    return {
        categories: state.categories.categories,
        expenses: state.expenses.expenses,
    }
}

const mapDispatchToProps = dispatch => {
  return {
    loadExpenses: () => dispatch(expensesActions.getExpenses()),
    loadCategories: () => dispatch(getCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);