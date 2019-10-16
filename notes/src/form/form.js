import React from "react";
import Icon from '@iconify/react';
import trashcanIcon from '@iconify/icons-octicon/trashcan';
import plusIcon from '@iconify/icons-fa-solid/plus';


const Form = (props) => {
    return (
        <div className="row">
            <button type="button"
                    className="btn btn-success big-text big-margin-left col-xs-1"
                    onClick={props.getFact}>
                add <Icon icon={plusIcon}/>
            </button>
            <button type="button"
                    className="btn btn-danger big-text margin-left col-xs-1"
                    onClick={props.deleteFacts}>
                delete all <Icon icon={trashcanIcon}/>
            </button>
            <div className="col-xs-2">
                <input type="text"
                       name="search"
                       className="margin-left form-control "
                       placeholder="Search by text"
                       onChange={props.searchFacts}
                       value={props.text}/>
            </div>

        </div>

    );
};

export default Form;