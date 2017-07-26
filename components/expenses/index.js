import React from 'react';
import * as expensesActions from '../../actions/expenses';
import {getCategories} from '../../actions/categories';
import { connect } from 'react-redux';
import { DateField, Calendar } from 'react-date-picker'
import 'react-date-picker/index.css'

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
        this.props.loadCategories();
        this.props.loadExpenses();        
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
        return this.renderForm(<input type="submit"  value="Guardar" />, this.newCategory);
    }

    newExpense(e) {
        e.preventDefault();
        const {ctg_name, ctg_description, ctg_currency} = this.state;
        let error = [];
        if(ctg_name === '' ) {
            this.setState({'error':'Category Have to have a name'});
            error.push('CategoryEmpty');
        }
        Object.values(this.props.categories).forEach( (category) => {
            if(ctg_name === category.name){
                    this.setState({'error':'Category already exist'});
                    error.push('CategoryAlreadyExist');
                    return 'error1';
            } 
        });
        if(error.length>0) {
           return false;
        }
        this.props.saveCategory(this.state);
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
            <label htmlFor="exp_categoryId">Descripcion:</label><input type="text" name="exp_categoryId" onChange={this.handleChange} value={this.state.exp_categoryId} />
            <label htmlFor="exp_value">Valor:</label><input type="text" name="exp_value" onChange={this.handleChange} value={this.state.exp_value} />
            <label htmlFor="exp_date">Fecha:</label>
            <Calendar
                    dateFormat="YYYY-MM-DD"
                    date={this.state.exp_date}
                    onChange={this.handleDateChange}
                    />
            {action}
            {this.state.error}
        </form>
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

    render() {
      return <div>{this.gotoAction()}</div>;
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