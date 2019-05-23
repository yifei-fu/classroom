import React, {useEffect, useState} from 'react';
import {Card} from 'react-bootstrap';
import './CardContainer.css';

export interface Props {
    title: string;
    children: React.ReactNode;
}

const CardContainer: React.FC<Props> = (props: Props) => {
    const {title, children} = props;
    return (
        <Card className='card-container shadow p-3 mb-5 bg-white'>
            <h2 className='card-title'>{title}</h2>
            {children}
        </Card>
    );
};

export default CardContainer;
