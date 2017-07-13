import React from 'react';
export const NEW_CATEGORY = 'NEW';
export const EDIT_CATEGORY = 'EDIT';
export const DELETE_CATEGORY = 'DELETE';
export const VIEW_CATEGORY = 'VIEW';
export class Categories extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ctg_name:'',
            ctg_description:'',
            ctg_currency:''
        }
        this.newCategory = this.newCategory.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    componentWillUpdate() {
//        this.setState({showModal:true});   
    }

    newCategoryForm() {
        return this.renderForm(<input type="submit"  value="Guardar" />, this.newCategory);
    }

    newCategory(e) {
        e.preventDefault();
        this.props.dismiss();
        console.log('Data', this.state);
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    renderForm(action, onSubmit) {
        return <form className="newCategory" onSubmit={onSubmit}>
           <div className="background"> 
            <h2> Nueva Categoria </h2>  
           <label htmlFor="ctg_name">Nombre:</label><input type="text" name="ctg_name" onChange={this.handleChange} value={this.state.ctg_name} />
            <label htmlFor="ctg_description">Descripcion:</label><input type="text" name="ctg_description" onChange={this.handleChange} value={this.state.ctg_description} />
            <label htmlFor="ctg_currency">Moneda:</label><input type="text" name="ctg_currency" onChange={this.handleChange} value={this.state.ctg_currency} />
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
