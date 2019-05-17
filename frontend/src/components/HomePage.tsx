import React from 'react';
import { Button } from 'react-bootstrap';
import {RouteComponentProps, withRouter} from 'react-router';
import './HomePage.css';

interface Props extends RouteComponentProps {
}

const HomePage: React.FC<Props> = (props: Props) => {
    const {history} = props;
    return (
        <div className='banner'>
            <div>
                <h1 className='display-1'>
                    💬📚💯 InQuizitive
                </h1>
                <br/>
                <h2 className='lead'>
                    Free online quiz platform and discussion forum for school courses.
                </h2>
            </div>
            <Button
                className='button'
                variant='outline-light'
                size='lg'
                onClick={() => history.push('/dashboard')}
            >
                Launch
            </Button>
        </div>
    );
};

export default withRouter(HomePage);
