import React, {Component} from 'react';
import {FormControl, ControlLabel, FormGroup} from 'react-bootstrap';
import './style.css'

export default class TextInput extends Component {
    render() {
        const {input, label, inline, type, placeHolder, className} = this.props;

        let containerClass = "";
        let labelElement = <span/>;
        if (inline) {
            containerClass = "text-input-container";
            labelElement =  <ControlLabel>{label}</ControlLabel>
        }


        return (
            <div>
                <FormGroup className="seach-txn-input-container" controlId="formBasicText">
                    {labelElement}
                    <FormControl type="text" {...input} placeHolder={placeHolder}/>
                </FormGroup>
            </div>
            )
    }
}