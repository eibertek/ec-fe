import React from 'react';
export const NEW_CATEGORY = 'NEW';
export const EDIT_CATEGORY = 'EDIT';
export const DELETE_CATEGORY = 'DELETE';
export const VIEW_CATEGORY = 'VIEW';
export class Categories extends React.Component {

    constructor(props) {
        super(props);

    }

    gotoAction() {
        if(this.props.action===NEW_CATEGORY) {
            return this.newCategory();
        }
        if(this.props.action===EDIT_CATEGORY) {
            return this.editCategory();
        }
        if(this.props.action===DELETE_CATEGORY) {
            return this.deleteCategory()
        }                
        if(this.props.action===VIEW_CATEGORY) {
            return this.viewCategories()
        }        
        return this.viewCategories();
    }

    newCategory() {
        return <form>
            <input name="ctg_name" />
            <input name="ctg_description" />
            <input name="ctg_currency" />
        </form>
    }

    editCategory() {

    }

    deleteCategory() {

    }
    
    render(){
        return <div>{this.gotoAction()}</div>;
    }
}
