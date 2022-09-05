import React from "react";
import Moment from 'moment';

export const DataPriority = ({ value }) => {
    return (
      <span key={`priority-${value}`} className="priority-badge">{value}</span>
    );
};

export const DataTag = ({ valueList }) => {
    return (
        <>
        {valueList.map((tag, idx) => (
            <span key={idx} className="tag-badge">
            {tag}
            </span>
        ))}
    </>
    );
};

export const DataBoolean = ({ value }) => {
    return (value)
        ? (<><span key="trueBooleanTag" className="boolean-badge">TRUE</span></>)
        : (<><span key="falseBooleanTag" className="boolean-badge">FALSE</span></>);
};

export const DataDate = ({ value }) => {
    return (<><span key="dateTag" className="date-badge">
        {Moment(new Date(value)).format('DD-MM-YYYY, HH:mm:ss')}
    </span></>)
};
