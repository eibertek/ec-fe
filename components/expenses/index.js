import React from 'react';
import {NEW_CATEGORY, EDIT_CATEGORY, DELETE_CATEGORY, Categories}  from '../categories';
import { BrowserRouter as Router, Route } from 'react-router'

class ExpensesComponent extends React.Component {
    constructor(props){
        super(props);
        this.renderCategory = this.renderCategory.bind(this);
        this.renderModal = this.renderModal.bind(this);
        this.state = {
            MODAL: ''
        }
    }

    getExpenses() {

    }

    renderModal() {
        if(this.state.MODAL === 'Categories') {
            return <Categories action={this.state.action} />
        }
        return null;
    }
    newExpense() {}

    renderCategory(e, action) {
        this.setState({MODAL: 'Categories', action});
    }

    render() {
        const actions =  (this.props.userData.login) ? 
                    <div> 
                         <button>NEW Expenses</button>
                         <button onClick={(e) => this.renderCategory(e, NEW_CATEGORY)} >New Category</button>
                    </div> :
                    <div>You have to log in to interact</div>;
        return <div  className='expenses'>
            <div> Expenses </div>
            {actions}
            {this.renderModal()}
        </div>
    }
}
export default ExpensesComponent;
