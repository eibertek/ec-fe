import React from 'react';
import * as expensesActions from '../../actions/expenses';
import {getCategories} from '../../actions/categories';
import { connect } from 'react-redux';
import DatePicker  from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

export const NEW_EXPENSE = 'NEW';
export const EDIT_EXPENSE = 'EDIT';
export const DELETE_EXPENSE = 'DELETE';
export const VIEW_EXPENSE = 'VIEW';

class ExpensesComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            exp_name:'',
            exp_value:'',
            exp_date:'',
            exp_categoryId:''
        }        
        this.newExpense = this.newExpense.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.renderCategoriesDropdown = this.renderCategoriesDropdown.bind(this);
    }

    gotoAction() {
        if(this.props.action===NEW_EXPENSE) {
            return this.newExpenseForm();
        }
        if(this.props.action===VIEW_EXPENSE) {
            return this.viewExpenses()
        }        
        return this.viewExpenses();
    }

    newExpenseForm() {
        return this.renderForm(<input type="submit"  value="Guardar" />, this.newExpense);
    }

    renderCategoriesDropdown() {
        if(!this.props.categories) return null;
        const catDropDown = Object.values(this.props.categories).map((cat)=>{
                return <option key={cat.id} value={cat.id}>{cat.name}</option>
        });
        return <select name="exp_categoryId" onChange={this.handleChange} value={this.state.exp_categoryId}>{catDropDown}</select>;
    }

    newExpense(e) {
        e.preventDefault();
        const {exp_name, exp_categoryId, exp_value, exp_date} = this.state;
        let error = [];
        if(exp_name === '' ) {
            this.setState({'error':'Expense Have to have a name'});
            error.push('CategoryEmpty');
        }
        Object.values(this.props.expenses).forEach( (expense) => {
            if(exp_name === expense.name){
                    this.setState({'error':'Expense already exist'});
                    error.push('ExpenseAlreadyExist');
                    return 'error1';
            } 
        });
        if(error.length>0) {
           return false;
        }
        this.props.saveExpenses(this.state);
        this.props.dismiss();       
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    handleDateChange(date) {
        this.setState({exp_date:date});
    }

    renderForm(action, onSubmit) {
        return <form className="newForm" onSubmit={onSubmit}>
            <h2> Nueva Categoria </h2>  
           <label htmlFor="exp_name">Nombre:</label><input type="text" name="exp_name" onChange={this.handleChange} value={this.state.exp_name} />
            <label htmlFor="exp_categoryId">Categoria:</label>
            {this.renderCategoriesDropdown()}
            <label htmlFor="exp_value">Valor:</label><input type="text" name="exp_value" onChange={this.handleChange} value={this.state.exp_value} />
            <label htmlFor="exp_date">Fecha:</label>
            <DatePicker
                selected={this.state.exp_date}
                onChange={this.handleDateChange}
            />
            {action}
            {this.state.error}
        </form>
    }

    render() {
      return <div>{this.gotoAction()}</div>;
    }
}

const mapStateToProps = state=>{
    return {
        categories: state.categories,
        expenses: state.expenses,        
    }
}

const mapDispatchToProps = dispatch => {
  return {
    saveExpenses: (data) => dispatch(expensesActions.saveExpenses(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesComponent);