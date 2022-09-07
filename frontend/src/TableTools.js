import React from "react";
import Moment from 'moment';
import Badge from 'react-bootstrap/Badge';

export const DataPriority = ({ value }) => {
    let colour = {
        "HIGH": "danger",
        "MEDIUM": "secondary",
        "LOW": "dark",
    }[value] || "info";
    return (
      <Badge bg={colour} key={`priority-${value}`} className="priority-badge">{value}</Badge>
    );
};

export const DataTag = ({ valueList }) => {
    return (
        <>
        {valueList.map((tag, idx) => (
            <Badge style={{ maxWidth: 100 }} bg="warning" text="dark" key={idx} className="tag-badge text-wrap">
            {tag}
            </Badge>
        ))}
    </>
    );
};

export const DataBoolean = ({ value }) => {
    return (value)
        ? (<><Badge bg="success" key="trueBooleanTag" className="boolean-badge">TRUE</Badge></>)
        : (<><Badge bg="danger" key="falseBooleanTag" className="boolean-badge">FALSE</Badge></>);
};

export const DataDate = ({ value }) => {
    return (<><span key="dateTag" className="date-badge">
        {Moment(new Date(value)).format('DD-MM-YYYY, HH:mm:ss')}
    </span></>)
};
