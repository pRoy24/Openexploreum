// Copyright 2018 Tokenplex LLC. proy24

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
// or implied. See the License for the specific language governing
// permissions and limitations under the License.

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