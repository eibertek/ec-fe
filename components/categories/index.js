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
            return this.newCategoryForm();
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

    newCategoryForm() {
        return this.renderForm(<input type="submit" onSubmit={this.newCategory} value="Guardar" />);
    }

    newCategory(e) {
        console.log('aaaa', e);
        e.preventDefault();
    }
    renderForm(action) {
        return <form className="newCategory">
           <div className="background"> 
            <h2> Nueva Categoria </h2>  
           <label htmlFor="ctg_name">Nombre:</label><input type="text" name="ctg_name" />
            <label htmlFor="ctg_description">Descripcion:</label><input type="text" name="ctg_description" />
            <label htmlFor="ctg_currency">Moneda:</label><input type="text" name="ctg_currency" />
            {action}
            </div>
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
