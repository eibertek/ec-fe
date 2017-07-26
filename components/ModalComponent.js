import React from 'react';

export default class ModalComponent extends React.Component {

    constructor(props){
        super(props);
        this.state={ 
            open: props.render
        }
        this.dismiss = this.dismiss.bind(this);
    }

    dismiss(e){
        this.setState({open:false});
        this.props.onClose();
    }

    componentWillReceiveProps(){
        this.setState({open:this.props.render});
    }
    render(){
        if(this.state.open) {
            return <div className="modalWindow_bkg">
                    <div className="modalWindow">
                    <div className="statusBar">
                        <button className="closeButton" onClick={this.dismiss}>[X]</button>
                    </div>
                    {this.props.children}                                        
                    </div>
                </div>;
        }
        return null;
    }
}