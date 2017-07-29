import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

export class ExpensesList extends React.Component { 
    constructor(props) {
        super(props);
        this.renderExpenses = this.renderExpenses.bind(this);
    }

componentWillReceiveProps(){
  //  console.log('UPDATEEEEEEEEEEEEEE', this.props);
}

    renderExpenses() {
        if(this.props.expenses) {
            let expenses =  Object.values(this.props.expenses).map( (expense) =>{
                return <div key={expense.id} className="row">
                            <div className="cell">{expense.name}</div>
                            <div className="cell"> {expense.value}</div>
                            <div className="cell"> {expense.date}</div>
                            </div>
            });
            return <div>{expenses}</div>;
        }
        return <div>EXPENSES LOADING</div>;
    } 

    render() {
        return <div className="ExpensesList">{this.renderExpenses()}</div>
    }

}

export default ExpensesList;