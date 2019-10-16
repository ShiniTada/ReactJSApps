import React from "react";
import Icon from "@iconify/react";
import editFill from '@iconify/icons-ant-design/edit-fill'
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever';

const SingleFact = (props) => {
    return (
        <div className="col-xs-2 elem" id="fact" style={{backgroundColor: props.fact.color}}>
            <div className="elem-text">
                <span className="text" key={props.fact.id}>{props.fact.text}</span>
            </div>
            <div className="settings">
                <button type="button"
                        className="btn btn-warning inside-button-margin btn-sm  "
                        onClick={() => props.editFact(props.fact)}
                >
                    edit <Icon icon={editFill}/>
                </button>

                <button type="button" id="deleteButton"
                        className="btn btn-danger small-margin-left inside-button-margin btn-sm"
                        onClick={() => props.deleteFact(props.fact)}
                >

                    delete <Icon icon={baselineDeleteForever}/>
                </button>
            </div>
        </div>
    );
};


export default SingleFact;