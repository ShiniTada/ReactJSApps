import React from "react";
import SingleFact from './fact';

const FactList = (props) => {
    return (
        <div>
            <div className="row">
                {!props.search && props.facts !== null && props.facts.map(thisFact => (
                    <SingleFact fact={thisFact}
                                deleteFact={props.deleteFact}
                                editFact={props.editFact}
                    />
                ))}

                {props.search && props.needFacts !== null && props.needFacts.map(thisFact => (
                    <SingleFact fact={thisFact}
                                deleteFact={props.deleteFact}
                                editFact={props.editFact}
                    />
                ))}
            </div>


        </div>
    );


};

export default FactList;