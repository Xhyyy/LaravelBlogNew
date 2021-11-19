import React from 'react';
import ReactDOM from 'react-dom';

function Author() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>

                        <div className="card-body">Im an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Author;

if (document.getElementById('author')) {
    ReactDOM.render(<Author />, document.getElementById('author'));
}
