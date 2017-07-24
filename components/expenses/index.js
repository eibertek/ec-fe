import React from 'react';
import {NEW_CATEGORY, EDIT_CATEGORY, DELETE_CATEGORY}  from '../categories';
import Categories  from '../categories';
import { BrowserRouter as Router, Route } from 'react-router'
import * as expensesActions from '../../actions/expenses';
import {getCategories} from '../../actions/categories';
import { connect } from 'react-redux';

class ExpensesComponent extends React.Component {
    constructor(props){
        super(props);
        this.renderCategory = this.renderCategory.bind(this);
        this.renderModal = this.renderModal.bind(this);
        this.renderExpenses = this.renderExpenses.bind(this);
        this.dismiss = this.dismiss.bind(this);
        this.state = {
            MODAL: ''
        }
        this.props.loadCategories();
        this.props.loadExpenses();
    }

    getExpenses() {

    }

    dismiss() {
        this.setState({MODAL:''});
    }
renderModal() {
    if(this.state.MODAL === 'Categories') {
        return <Categories action={this.state.action} dismiss={this.dismiss}/>
    }
    if(this.state.MODAL === 'Expenses') {
        return <Categories action={this.state.action} dismiss={this.dismiss}/>
    }
    
    return null;
    }

    newExpense() {}

    renderCategory(e, action) {
        this.setState({MODAL: 'Categories', action});
    }

    renderExpensesAction(e, action) {
        this.setState({MODAL: 'Expenses', action});
    }

    renderExpenses() {
        console.log(this.props.categories);
        if(this.props.expenses) {
            let expenses = this.props.expenses.map( (expense) =>{
                return <div key={expense.id}>{expense.name} - {expense.value}</div>
            });
            return <div>{expenses}</div>;
        }
        return <div>EXPENSES LOADING</div>;
    }    
    render() {
        const actions =  (this.props.userData.login) ? 
                    <div> 
                         <button onClick={(e) => this.renderExpenses(e, NEW_EXPENSES)} >NEW Expenses</button>
                         <button onClick={(e) => this.renderCategory(e, NEW_CATEGORY)} >New Category</button>
                         <div>{this.renderExpenses()}</div>
                    </div> :
                    <div>You have to log in to interact</div>;
        return <div  className='expenses'>
            <div> Expenses </div>
            {actions}
            {this.renderModal()}
        </div>
    }
}

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
    saveExpenses: (data) => dispatch(expensesActions.saveExpenses(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesComponent);