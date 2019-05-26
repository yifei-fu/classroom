import React, {useEffect, useState} from 'react';
import {Card} from 'react-bootstrap';
import './CardContainer.css';

export interface Props {
    title?: string;
    children: React.ReactNode;
}

const CardContainer: React.FC<Props> = (props: Props) => {
    return (
        <Card className='card-container shadow p-3 mb-4 bg-white'>
            {props.title && <h2 className='card-title'>{props.title}</h2>}
            {props.children}
        </Card>
    );
};

export default CardContainer;
