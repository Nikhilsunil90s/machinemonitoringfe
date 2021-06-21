import React from 'react';
import './index.css';

export default function({value}) {
    return (
        {...value < 10 ? (
                <div className="greenDot">
                    <ul>
                        <li>
                            {"Trend  +"}{value}{"%"}
                        </li>
                    </ul>
                </div>
            ) : (
                <div className="redDot">
                    <ul>
                        <li>
                            {"Trend  +"}{value}{"%"}
                        </li>
                    </ul>
                </div>
            )
        }
    );
}